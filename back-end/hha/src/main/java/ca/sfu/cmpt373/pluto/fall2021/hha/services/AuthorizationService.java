package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Role;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    private final HhaUserService userService;

    @Value("${secret.key.jwt}")
    private String jwtSecret;

    public void refresh(HttpServletRequest request, HttpServletResponse response, String refreshToken) throws IOException {
        try {
            var algorithm = Algorithm.HMAC256(jwtSecret);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refreshToken);
            var email = decodedJWT.getSubject();
            var user = userService.getUser(email);
                     var accessToken = JWT.create()
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(Instant.now().plus(10, ChronoUnit.MINUTES).toEpochMilli()))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim("roles",
                            user.getRoles().stream()
                                    .map(Role::getName).collect(Collectors.toList()))
                    .sign(algorithm);
            Map<String, String> tokens = Map.ofEntries(Map.entry("accessToken", accessToken));

            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), tokens);
        } catch (JWTDecodeException e) {
            response.sendError(SC_UNAUTHORIZED);
        }

    }

    public HhaUser getUser() {
        DecodedJWT decodedJWT = JWT.decode(jwtSecret);
        var email = decodedJWT.getSubject();
        return userService.getUser(email);
    }
}
