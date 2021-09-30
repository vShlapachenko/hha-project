package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import lombok.Value;


public record UserInvitation(String email, Role role, String password) {
}
