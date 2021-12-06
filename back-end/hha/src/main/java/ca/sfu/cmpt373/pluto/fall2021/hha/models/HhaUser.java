package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;

@Data
@Document(collection = "hhaUser")
@NoArgsConstructor
@AllArgsConstructor
public class HhaUser {
    @Id
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String activationLink;
    // @DBRef(lazy = true)
    private Collection<Role> roles = new ArrayList<>();
    @DBRef
    private Department department;
    private ActivationStatus activationStatus;

    private String confirmationLink;
}
