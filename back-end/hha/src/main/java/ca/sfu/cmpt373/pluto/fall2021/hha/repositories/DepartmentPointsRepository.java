package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Department;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DepartmentPointsRepository extends MongoRepository<DepartmentPoints, Department> {
    DepartmentPoints findByDepartment(Department department);

    List<DepartmentPoints> findByOrderByMonthPointsDesc();
    List<DepartmentPoints> findByOrderByYearPointsDesc();
}
