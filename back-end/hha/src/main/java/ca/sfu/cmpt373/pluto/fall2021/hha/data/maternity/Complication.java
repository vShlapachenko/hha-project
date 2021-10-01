package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "complication")
@NoArgsConstructor
@AllArgsConstructor
public class Complication {
    @Id
    private int month;

    private int complicationRecord;
    private int complicationReferred;
}
