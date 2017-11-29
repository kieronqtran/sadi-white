package sadi.whitegroup.assignment1.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.config.Constants;
import sadi.whitegroup.assignment1.controller.errors.BadRequestAlertException;
import sadi.whitegroup.assignment1.controller.errors.EmailAlreadyUsedException;
import sadi.whitegroup.assignment1.controller.util.HeaderUtil;
import sadi.whitegroup.assignment1.controller.util.PaginationUtil;
import sadi.whitegroup.assignment1.controller.vm.ManagedUserVM;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.AuthoritiesConstants;
import sadi.whitegroup.assignment1.service.UserService;
import sadi.whitegroup.assignment1.service.dto.UserDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    private static final String ENTITY_NAME = "userManagement";
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }


    @PostMapping("/users")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<User> createUser(@Valid @RequestBody ManagedUserVM managedUserVM) throws URISyntaxException {
        log.debug("REST request to save User : {}", managedUserVM);

        if (managedUserVM.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", ENTITY_NAME, "idexists");
        } else if (userRepository.findOneByEmailIgnoreCase(managedUserVM.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else {
            User newUser = userService.createUser(managedUserVM);
            return ResponseEntity.created(new URI("/api/users/"))
                .headers(HeaderUtil.createAlert("A user is created "+ newUser.getEmail(), newUser.getEmail()))
                .body(newUser);
        }
    }

    @PutMapping("/users")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody ManagedUserVM managedUserVM) {
        log.debug("REST request to update User : {}", managedUserVM);
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(managedUserVM.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(managedUserVM.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<UserDTO> updatedUser = userService.updateUser(managedUserVM);
        HttpHeaders headers = HeaderUtil.createAlert("A user is updated " + managedUserVM.getEmail(), managedUserVM.getEmail());
        return updatedUser.map(
            userDTO -> ResponseEntity.ok().headers(headers).body(userDTO)
        ).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
        final Page<UserDTO> page = userService.getAllManagedUsers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/users/authorities")
    @Secured(AuthoritiesConstants.ADMIN)
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }


    @GetMapping("/users/{email:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email) {
        log.debug("REST request to get User : {}", email);
        return userService
            .getUserWithAuthorities(email)
            .map(UserDTO::new)
            .map(response -> ResponseEntity.ok().body(response))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping("/users/{email:" + Constants.LOGIN_REGEX + "}")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        log.debug("REST request to delete User: {}", email);
        userService.deleteUser(email);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert("A user is deleted with identifier " + email, email)).build();
    }
}
