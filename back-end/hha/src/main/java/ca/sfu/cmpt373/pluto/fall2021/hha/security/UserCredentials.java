package ca.sfu.cmpt373.pluto.fall2021.hha.security;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class UserCredentials {
    private String email;
    private String password;
}
