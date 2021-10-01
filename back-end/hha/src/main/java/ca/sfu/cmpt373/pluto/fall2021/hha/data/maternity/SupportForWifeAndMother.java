package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "supportWifeMother")
@NoArgsConstructor
@AllArgsConstructor
public class SupportForWifeAndMother {
    @Id
    private int month;

    private NoOfVisit from0To3Months;
    private NoOfVisit from4To6Months;
    private NoOfVisit from7To9Months;
    private NoOfVisit totalVisit; // Verification
}
