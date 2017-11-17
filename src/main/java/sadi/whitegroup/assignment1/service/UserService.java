package sadi.whitegroup.assignment1.service;

import liquibase.util.StreamUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sadi.whitegroup.assignment1.controller.dto.ManagedUserDTO;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.Role;

import java.util.HashSet;
import java.util.List;

@Service
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User registerUser(ManagedUserDTO userDTO) {
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(userDTO.getPassword());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setEmail(userDTO.getEmail());
        newUser.setRole(Role.ROLE_USER);
        userRepository.save(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }
}
