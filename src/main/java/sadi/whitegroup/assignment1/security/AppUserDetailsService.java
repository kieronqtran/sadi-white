package sadi.whitegroup.assignment1.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sadi.whitegroup.assignment1.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Component("userDetailsService")
public class AppUserDetailsService implements UserDetailsService {

    private Logger log = LoggerFactory.getLogger(AppUserDetailsService.class);

    private UserRepository userRepository;

    public AppUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        log.debug("Authenticating {}", username);
        return this.userRepository.findByEmail(username)
                .map(user -> {
                    List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                    grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
                    return new org.springframework.security.core.userdetails.User(
                            user.getEmail(),
                            user.getPassword(),
                            grantedAuthorities
                    );
                }).orElseThrow(() -> new UsernameNotFoundException("User " + username  + " not found."));
    }
}
