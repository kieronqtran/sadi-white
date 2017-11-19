package sadi.whitegroup.assignment1.security;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;
import sadi.whitegroup.assignment1.Assignment1Application;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.AppUserDetailsService;
import sadi.whitegroup.assignment1.security.Role;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Assignment1Application.class)
public class UserDetailServiceTests {

    @MockBean(name = "userRepository")
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService appUserDetailsService;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    User user;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        user = new User(
                "test-admin@localhost",
                "$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC",
                "Administrator",
                "Administrator",
                "6538941938",
                Role.ROLE_ADMIN.toString());
    }

	@Test
	public void contextLoads() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        UserDetails user = appUserDetailsService.loadUserByUsername("test-admin@localhost");
	    assertEquals(user.getUsername(), "test-admin@localhost");
	    assertTrue(user.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(Role.ROLE_ADMIN.toString())));
	    verify(userRepository).findByEmail("test-admin@localhost");
    }

    @Test
    public void shouldThrowException() {
        User emptyUser = null;
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(emptyUser));
        thrown.expect(UsernameNotFoundException.class);
        thrown.expectMessage("User notexistemail@localhost not found.");
        appUserDetailsService.loadUserByUsername("notexistemail@localhost");
    }

}
