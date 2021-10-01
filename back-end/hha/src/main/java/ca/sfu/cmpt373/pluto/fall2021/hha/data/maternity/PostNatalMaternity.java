package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "postNatalM")
@NoArgsConstructor
@AllArgsConstructor
public class PostNatalMaternity {
    //breastfeeding women receiving vitamins
    @Id
    private int month;

    private int receiving_Vitamin_A;
    private int withMUAC_lessThan_210mm;
    private int withMalnutritionSupport;
    private int domestic_visits_between_3_days;
    private TimePeriod consultations;
}
