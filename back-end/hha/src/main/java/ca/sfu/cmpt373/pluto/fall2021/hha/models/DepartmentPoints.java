package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "departmentPoints")
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentPoints {
    @Id
    private String id;
    @DBRef
    private Department department;

    private int monthPoints;
    private int yearPoints;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public int getMonthPoints() {
        return monthPoints;
    }

    public void setMonthPoints(int monthPoints) {
        this.monthPoints = monthPoints;
    }

    public int getYearPoints() {
        return yearPoints;
    }

    public void setYearPoints(int yearPoints) {
        this.yearPoints = yearPoints;
    }
}
