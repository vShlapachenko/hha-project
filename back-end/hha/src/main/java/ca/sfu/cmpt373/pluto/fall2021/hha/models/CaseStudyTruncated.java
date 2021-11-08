package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import java.util.Date;

public class CaseStudyTruncated {

    private String id;
    private String caseName;
    private Date submittedDate;
    private UserPublicInfo user;

    public CaseStudyTruncated() {
    }

    public CaseStudyTruncated(String id, String caseName, Date submittedDate, UserPublicInfo user) {
        this.id = id;
        this.caseName = caseName;
        this.submittedDate = submittedDate;
        this.user = user;
    }

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

    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }

    public UserPublicInfo getUser() {
        return user;
    }

    public void setUser(UserPublicInfo user) {
        this.user = user;
    }
}
