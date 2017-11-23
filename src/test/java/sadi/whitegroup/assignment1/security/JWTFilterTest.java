package sadi.whitegroup.assignment1.security;

import io.jsonwebtoken.Jwts;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.assertj.core.api.Assertions.*;

import java.util.Date;

public class JWTFilterTest {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Before
    public void setUp() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }

    @Test
    public void testJWTFilter() throws Exception {
        String jwt = Jwts.builder()
                .setSubject("test-user")
                .setExpiration(new Date(System.currentTimeMillis() + 864_000_000))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, "SecretCode")
                .compact();
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + jwt);
        request.setRequestURI("/api/test");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain filterChain = new MockFilterChain();
//        jwtFilter.doFilter(request, response, filterChain);
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(SecurityContextHolder.getContext().getAuthentication().getName()).isEqualTo("test-user");
        assertThat(SecurityContextHolder.getContext().getAuthentication().getCredentials().toString()).isEqualTo(jwt);
    }
}
