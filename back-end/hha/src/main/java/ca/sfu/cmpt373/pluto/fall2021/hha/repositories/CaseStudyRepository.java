package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Department;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CaseStudyRepository extends MongoRepository<CaseStudy, String> {

    CaseStudy findFirstBySubmittedBy_DepartmentOrderBySubmittedDateDesc(Department department);
}
