package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "supportWomenHospital")
@NoArgsConstructor
@AllArgsConstructor
public class SupportForWomenHospital {
    @Id
    private int month;

    // for pregnant women:
    private int pregnanciesAtRisk;
    private int caseOfAnemia;
    private int receivingIronFolate;
    private int beingTreatedForIronDeficiencyAnemia;
    private int withBirthPlan;
    private int confirmedMalariaTreatedWithChloroquine;
    private int receivedImpregnatedMosquitoNet;
    private int MUACLargerThan210mm;
    private int MAMorMASSupported;

}
