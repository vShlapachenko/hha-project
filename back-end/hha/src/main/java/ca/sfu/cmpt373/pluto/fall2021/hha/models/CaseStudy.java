package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class CaseStudy {

    @Id
    private String id;
    @DBRef
    private HhaUser submittedBy;
    private String caseName;
    @CreatedDate
    private Date submittedDate;
    private List<CaseStudyEntry> entryList;
}
