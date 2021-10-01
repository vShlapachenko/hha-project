package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity.BirthMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "birthM")
@NoArgsConstructor
@AllArgsConstructor
public class BirthWeightMaternity {
    @Id
    private int month;

    private BirthMethod weight_lessThan1_5;  //here 1_5 is referred to as 1.5
    private BirthMethod weight_between1_5_and_2_5; //here this includes 1.5 and excludes 2.5
    private BirthMethod weight_greaterThanEqual_2_5;
    private BirthMethod weight_unknown;
    private BirthMethod weight_of_immediately_breastfed_child;
    private BirthMethod weight_of_skinToSkinTherapy_child;

}
