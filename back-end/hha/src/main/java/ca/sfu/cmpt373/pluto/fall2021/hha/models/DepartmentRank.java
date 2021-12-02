package ca.sfu.cmpt373.pluto.fall2021.hha.models;

public class DepartmentRank {
    private String depName;
    private int DepPoint;

    public DepartmentRank(String depName, int depPoint) {
        this.depName = depName;
        DepPoint = depPoint;
    }

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }

    public int getDepPoint() {
        return DepPoint;
    }

    public void setDepPoint(int depPoint) {
        DepPoint = depPoint;
    }
}
