package ca.sfu.cmpt373.pluto.fall2021.hha.models;

public class UserPublicInfo {

    private String firstName;
    private String lastName;

    public UserPublicInfo() {
    }

    public UserPublicInfo(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
