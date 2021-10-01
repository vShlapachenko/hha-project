package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "otherServices")
@NoArgsConstructor
@AllArgsConstructor
public class OtherServices {
    @Id
    private int month;

    private int otherWomenReceivingIronFolate;
    private int womenReceivingAceticAcidInspection;
    private int positiveWomenAfterSmearTest;
    private int womenPositiveSmearTakenCare;
    private int womenReceivingPostAbortionCare;

}
