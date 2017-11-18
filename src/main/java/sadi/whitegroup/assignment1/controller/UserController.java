package sadi.whitegroup.assignment1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.UserDTO;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/user", method = RequestMethod.PUT)
    public User updateUser(@Valid @RequestBody User user){
        return userService.updateUser(user);
    }

    @RequestMapping(path = "/user/{email}", method = RequestMethod.GET)
    public User getUser(@PathVariable String email){
        return userService.findByEmail(email);
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody UserDTO userDTO) {
        userService.registerUser(userDTO);
    }
}
