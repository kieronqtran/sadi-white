package sadi.whitegroup.assignment1.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import sadi.whitegroup.assignment1.service.TokenAuthenticationService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JWTAuthenticationFilter extends GenericFilterBean {
   @Override
   public void doFilter(ServletRequest req,
                        ServletResponse res,
                        FilterChain fchain)
           throws IOException, ServletException {
      Authentication authentication = TokenAuthenticationService.
              getAuthentication((HttpServletRequest) req);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      fchain.doFilter(req, res);
   }
}
