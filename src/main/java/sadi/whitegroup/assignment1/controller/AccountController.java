package sadi.whitegroup.assignment1.controller;


import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.errors.EmailAlreadyUsedException;
import sadi.whitegroup.assignment1.controller.errors.InternalServerErrorException;
import sadi.whitegroup.assignment1.controller.errors.InvalidPasswordException;
import sadi.whitegroup.assignment1.controller.errors.LoginAlreadyUsedException;
import sadi.whitegroup.assignment1.controller.vm.ManagedUserVM;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.service.TestingService;
import sadi.whitegroup.assignment1.service.UserService;
import sadi.whitegroup.assignment1.service.dto.ResultDTO;
import sadi.whitegroup.assignment1.service.dto.UserDTO;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class AccountController {

    private final Logger log = LoggerFactory.getLogger(AccountController.class);

    private final UserRepository userRepository;
    private final UserService userService;
    private final TestingService testingService;

    public AccountController(UserRepository userRepository, UserService userService, TestingService testingService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.testingService = testingService;
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

        userService.registerUser(managedUserVM);

    }

    @GetMapping("/account")
    public UserDTO getAccount() {
        return Optional.ofNullable(userService.getUserWithAuthorities())
            .map(UserDTO::new)
            .orElseThrow(() -> new InternalServerErrorException("User could not be found"));
    }

    @GetMapping("/account/result")
    public List<ResultDTO> getResult(){ // get the result list of user in the db
        return testingService.getResultForCurrentAccount()
                .stream()
                .map(ResultDTO::new)
                .collect(Collectors.toList());
    }

    @PutMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) {
        userService.updateUser(userDTO);
    }

}
