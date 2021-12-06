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
public class CaseStudy {

    @Id
    private String id;
    @DBRef
    private HhaUser submittedBy;
    private String caseName;
    @CreatedDate
    private Date submittedDate;
    private List<CaseStudyEntry> entryList;

    private Collection<Photo> photos = new ArrayList<>();

    private String photoId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhotoId() {
        return photoId;
    }

    public void setPhotoId(String photoId) {
        this.photoId = photoId;
    }

    public HhaUser getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(HhaUser submittedBy) {
        this.submittedBy = submittedBy;
    }

    public String getCaseName() {
        return caseName;
    }

    public void setCaseName(String caseName) {
        this.caseName = caseName;
    }

    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }

    public List<CaseStudyEntry> getEntryList() {
        return entryList;
    }

    public void setEntryList(List<CaseStudyEntry> entryList) {
        this.entryList = entryList;
    }

    public Collection<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Collection<Photo> photos) {
        this.photos = photos;
    }
}
