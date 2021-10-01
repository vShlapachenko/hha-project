package ca.sfu.cmpt373.pluto.fall2021.hha.data.maternity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Auto generate getter, setter and toString.
@Document(collection = "labor")
@NoArgsConstructor
@AllArgsConstructor
public class LaborManagement {
    @Id
    private int month;

    private int useOfPartograph;
    private int ActiveManagement3rdPhaseOfLabor;
}
