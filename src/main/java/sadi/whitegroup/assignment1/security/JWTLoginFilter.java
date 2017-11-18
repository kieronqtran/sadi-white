package sadi.whitegroup.assignment1.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import sadi.whitegroup.assignment1.controller.dto.UserVM;
import sadi.whitegroup.assignment1.service.TokenAuthenticationService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {
   public JWTLoginFilter(String url, AuthenticationManager authManager) {
      super(new AntPathRequestMatcher(url));
      setAuthenticationManager(authManager);
   }

   @Override
   public Authentication attemptAuthentication(HttpServletRequest req,
                                               HttpServletResponse res)
           throws AuthenticationException, IOException, ServletException {
      UserVM userVM = new UserVM(req.getParameter("email"), req.getParameter("password"));

      return getAuthenticationManager().authenticate(
              new UsernamePasswordAuthenticationToken(
                      userVM.getEmail(),
                      userVM.getPassword(),
                      Collections.emptyList()
              )
      );
   }

   @Override
   protected void successfulAuthentication(HttpServletRequest req,
                                           HttpServletResponse res,
                                           FilterChain fchain,
                                           Authentication authen)
           throws IOException, ServletException {
      TokenAuthenticationService.addAuthentication(res, authen.getName());
   }
}
