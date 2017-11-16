package sadi.whitegroup.assignment1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.ManagedUserDTO;
import sadi.whitegroup.assignment1.controller.dto.UserDTO;
import sadi.whitegroup.assignment1.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//
//    @RequestMapping(path = "/user", method = RequestMethod.GET)
//    public List<UserDTO> getAllUser() {
//        return userService.getAllUsers();
//    }

    //Create a new User
//    @RequestMapping(path = "/", method = RequestMethod.POST)
//    public User createNewUser(@Valid @RequestBody User user) {
//        return userService.createUser(user);
//    }

    /**
     * POST  /register : register the user.
     *
     * @param managedUserVM the managed user View Model
     * @throws InvalidPasswordException  400 (Bad Request) if the password is incorrect
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already used
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserDTO managedUserDTO) {
        userService.registerUser(managedUserDTO);
    }
}
