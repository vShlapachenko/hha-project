package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Document(collection = "caseStudyDraft")
public class CaseStudyDraft {
    @Id
    private String id;

    private String caseName;
    private List<String> answers;

    @DBRef
    private HhaUser submittedBy;

    @DBRef(lazy = true)
    private Collection<Photo> photos = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaseName() {
        return caseName;
    }

    public void setCaseName(String caseName) {
        this.caseName = caseName;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public HhaUser getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(HhaUser submittedBy) {
        this.submittedBy = submittedBy;
    }

    public Collection<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Collection<Photo> photos) {
        this.photos = photos;
    }
}
