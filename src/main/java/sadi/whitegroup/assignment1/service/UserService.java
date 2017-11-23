package sadi.whitegroup.assignment1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sadi.whitegroup.assignment1.controller.dto.RegisterDTO;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.Role;
import sadi.whitegroup.assignment1.security.SecurityUtils;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByEmailWithResults(String email) {
        return this.userRepository.findOneWithResultByEmail(email);
    }

    public User registerUser(RegisterDTO userDTO) {
        User newUser = new User();
        // new user gets initially a generated password
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setPhone(userDTO.getPhone());
        newUser.setRole(Role.ROLE_USER.toString());

        userRepository.save(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    public User updateUser(User user) {
        User found_user = userRepository.findOne(user.getId());
        found_user.setEmail(user.getEmail());
        found_user.setPassword(user.getPassword());
        found_user.setFirstName(user.getFirstName());
        found_user.setLastName(user.getLastName());
        found_user.setPhone(user.getPhone());
        return found_user;
    }

    public User getCurrentUser() {
        return userRepository
                .findByEmail(SecurityUtils.getCurrentUserLogin())
                .orElse(null);
    }

    public void deleteUser(Long id) {
        this.userRepository.delete(id);
    }
}
