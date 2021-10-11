package ca.sfu.cmpt373.pluto.fall2021.hha.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class UserCredentials {
    private String email;
    private String password;
}
