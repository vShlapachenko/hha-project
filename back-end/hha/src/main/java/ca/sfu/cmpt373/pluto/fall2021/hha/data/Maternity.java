package ca.sfu.cmpt373.pluto.fall2021.hha.data;

import ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Maternity {
    @Id
    private int month;

    // Section 6
    @DBRef
    private SupportForWifeAndMother supportForWifeAndMother;
    @DBRef
    private SupportForWomenHospital supportForWomenHospital;
    @DBRef
    private OtherServices otherServices;

    // Section 7
    @DBRef
    private AgeOfMotherMaternity ageOfMotherMaternity;
    @DBRef
    private LaborManagement laborManagement;
    @DBRef
    private BirthWeightMaternity birthWeightMaternity;
    @DBRef
    private PostNatalMaternity postNatalMaternity;

    @DBRef
    private Complication complication;
    @DBRef
    private Stillborns stillborns;
    @DBRef
    private MaternalDeath maternalDeath;

}
