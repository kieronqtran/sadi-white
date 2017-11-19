package sadi.whitegroup.assignment1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.RegisterDTO;
import sadi.whitegroup.assignment1.controller.dto.UserDTO;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.service.UserService;

import javax.validation.Valid;
import java.util.Optional;

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
    public UserDTO getUser(@PathVariable String email){
        return userService.findByEmail(email)
                .map(UserDTO::new)
                .orElseThrow(() -> new RuntimeException("User Not Found."));
    }

    @RequestMapping(path = "/signup", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@RequestBody RegisterDTO userDTO) {
        userService.registerUser(userDTO);
    }
}
