package sadi.whitegroup.assignment1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api")
public class HelloWorldController {


    private final UserRepository userRepository;

    public HelloWorldController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/hello-world")
    public List<User> getHelloWorld() {
        return StreamSupport
                .stream(this.userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
//
//    @GetMapping("/user/${firstName}")
//    public User getUserByEmail(@PathVariable() String firstName) {
//        return userRepository.findUserByFirstName(firstName);
//    }
}
