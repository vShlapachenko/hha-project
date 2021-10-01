package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "ageOfMotherM")
@NoArgsConstructor
@AllArgsConstructor
public class AgeOfMotherMaternity {
    @Id
    private int month;

    private BirthMethod ageLessThan15y;
    private BirthMethod age15To19;
    private BirthMethod age20To24;
    private BirthMethod age25To29;
    private BirthMethod age30Plus;
    private BirthMethod ageUnknown;
}
