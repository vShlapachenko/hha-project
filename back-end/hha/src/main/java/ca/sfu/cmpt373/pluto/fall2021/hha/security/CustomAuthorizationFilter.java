package ca.sfu.cmpt373.pluto.fall2021.hha.security;

import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.HhaUserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    private final HhaUserRepository hhaUserRepository;

    @Value("${secret.key.jwt}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        if (httpServletRequest.getServletPath().equals("/api/login")) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } else {
            var authHeader = httpServletRequest.getHeader(AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                try {
                    var token = authHeader.substring("Bearer ".length());
                    var algorithm = Algorithm.HMAC256(jwtSecret);
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    var email = decodedJWT.getSubject();
                    List<String> roles = decodedJWT.getClaim("roles").asList(String.class);
                    Collection<SimpleGrantedAuthority> authorities = roles.stream()
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
                    var user = hhaUserRepository.findByEmail(email);
                    var authenticationToken = new UsernamePasswordAuthenticationToken(email, user.getPassword(), authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(httpServletRequest, httpServletResponse);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    httpServletResponse.sendError(SC_FORBIDDEN);
                }
            } else {
                filterChain.doFilter(httpServletRequest, httpServletResponse);
            }
        }
    }
}
