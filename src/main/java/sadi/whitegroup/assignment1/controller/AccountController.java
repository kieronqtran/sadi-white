package sadi.whitegroup.assignment1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.RegisterDTO;
import sadi.whitegroup.assignment1.controller.dto.UserDTO;
import sadi.whitegroup.assignment1.controller.dto.UserVM;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.security.Role;
import sadi.whitegroup.assignment1.service.UserService;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AccountController {

    private UserService userService;

    public AccountController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/user", method = RequestMethod.PUT)
    public User updateUser(@Valid @RequestBody User user) {
        return userService.updateUser(user);
    }

    @RequestMapping(path = "/user/{email}", method = RequestMethod.GET)
    public RegisterDTO getUser(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(RegisterDTO::new)
                .orElseThrow(() -> new RuntimeException("User Not Found."));
    }

    /**
     * GET  /account : get the current user.
     *
     * @return the current user
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    public UserDTO getAccount() {
        return Optional.ofNullable(userService.getCurrentUser())
                .map(UserDTO::new)
                .orElseThrow(() -> new RuntimeException("User could not be found"));
    }

    @RequestMapping(path = "/signup", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@RequestBody RegisterDTO userDTO) {
        userService.registerUser(userDTO);
    }

    @RequestMapping(value = "/account/{id}", method = RequestMethod.DELETE)
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }



    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
                password.length() >= UserVM.PASSWORD_MIN_LENGTH &&
                password.length() <= UserVM.PASSWORD_MAX_LENGTH;
    }
}
