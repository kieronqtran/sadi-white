package sadi.whitegroup.assignment1.controller;


import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.errors.EmailAlreadyUsedException;
import sadi.whitegroup.assignment1.controller.errors.InternalServerErrorException;
import sadi.whitegroup.assignment1.controller.errors.InvalidPasswordException;
import sadi.whitegroup.assignment1.controller.errors.LoginAlreadyUsedException;
import sadi.whitegroup.assignment1.controller.vm.ManagedUserVM;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.AuthoritiesConstants;
import sadi.whitegroup.assignment1.service.MailService;
import sadi.whitegroup.assignment1.service.TestingService;
import sadi.whitegroup.assignment1.service.UserService;
import sadi.whitegroup.assignment1.service.dto.ResultDTO;
import sadi.whitegroup.assignment1.service.dto.Result_ResultDTO;
import sadi.whitegroup.assignment1.service.dto.UserDTO;
import sadi.whitegroup.assignment1.service.dto.User_UserDTO;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.thymeleaf.context.IWebContext;


@RestController
@RequestMapping("/api")
public class AccountController {

    private final Logger log = LoggerFactory.getLogger(AccountController.class);

    private final UserRepository userRepository;
    private final UserService userService;
    private final TestingService testingService;
    private final MailService mailService;

    public AccountController(UserRepository userRepository, UserService userService,
                             TestingService testingService, MailService mailService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.testingService = testingService;
        this.mailService = mailService;
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
            password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }

    @PostMapping("/signUp")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@RequestBody ManagedUserVM managedUserVM) {
        if (!checkPasswordLength(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        userRepository.findOneByEmailIgnoreCase(managedUserVM.getEmail().toLowerCase()).ifPresent(u -> {
            throw new LoginAlreadyUsedException();
        });
        userRepository.findOneByEmailIgnoreCase(managedUserVM.getEmail()).ifPresent(u -> {
            throw new EmailAlreadyUsedException();
        });

        User user = userService.registerUser(managedUserVM);
        mailService.sendCreationEmail(user);
    }

    @GetMapping("/account")
    public UserDTO getAccount() {
        return Optional.ofNullable(userService.getUserWithAuthorities())
            .map(UserDTO::new)
            .orElseThrow(() -> new InternalServerErrorException("User could not be found"));
    }

    // Get test results of the current account
    @GetMapping("/account/result")
    public List<ResultDTO> getResult(){
        return testingService.getResultForCurrentAccount()
                .stream().map(ResultDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) {
        userService.updateUser(userDTO);
    }

    @GetMapping("/allAccounts")
    @Secured(AuthoritiesConstants.ADMIN)
    public List<User_UserDTO> getAllAccounts(){
        return userService.findAll()
            .stream().map(User_UserDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/results")
    public Page<Result_ResultDTO> getAllResults(@PageableDefault(page = 0, size = 10, direction = Direction.DESC)Pageable pageable){
        return testingService.getAllResult(pageable)
                .map(Result_ResultDTO::new);
    }

    @DeleteMapping("/account/{id}")
    @Secured(AuthoritiesConstants.ADMIN)
    public void deleteAccount(@PathVariable Long id) {
        userService.delete(id);
    }
}
