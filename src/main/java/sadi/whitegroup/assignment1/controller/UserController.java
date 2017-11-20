package sadi.whitegroup.assignment1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.RegisterDTO;
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
    public RegisterDTO getUser(@PathVariable String email){
        return userService.findByEmail(email)
                .map(RegisterDTO::new)
                .orElseThrow(() -> new RuntimeException("User Not Found."));
    }

    @RequestMapping(path = "/signup", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public User registerAccount(@RequestBody RegisterDTO userDTO) {
        return userService.registerUser(userDTO);
    }
}
