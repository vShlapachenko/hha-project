package ca.sfu.cmpt373.pluto.fall2021.hha.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "basicInfo")
@NoArgsConstructor
@AllArgsConstructor
public class BasicInfo {
    @Id
    private int month; // we can track this table by month, since it’s monthly updated.

    private int bedAvailable;
    private int bedDays; // bedAvailable * period given(maybe)
    private int patientDays;
    private int hospitalized;
    private int dischargedAlive;
    private int diedBefore48;
    private int diedAfter48;
    private int daysHospitalised;
    private int referrals;
    private int transfers;
    private int selfDischarged;
    private int stayedInWard;
    private int admissions;

}
