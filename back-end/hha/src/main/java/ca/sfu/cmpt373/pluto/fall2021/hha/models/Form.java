package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document
public class Form {

    @Id
    private String id;
    @DBRef
    private HhaUser submittedBy;

    private String label; 
    private List<Table> tables;

    @CreatedDate
    private Date submittedDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public HhaUser getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(HhaUser submittedBy) {
        this.submittedBy = submittedBy;
    }
    
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Table> getTables() {
        return tables;
    }

    public void setTables(List<Table> tables) {
        this.tables = tables;
    }

    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }
}