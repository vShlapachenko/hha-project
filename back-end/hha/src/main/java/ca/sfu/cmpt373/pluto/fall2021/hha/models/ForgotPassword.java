package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPassword {

    @Id
    private String id;
    private Integer otp;
    @DBRef
    private HhaUser user;

    public ForgotPassword (Integer otp, HhaUser user){
        this.otp = otp;
        this.user = user;
    }
}
