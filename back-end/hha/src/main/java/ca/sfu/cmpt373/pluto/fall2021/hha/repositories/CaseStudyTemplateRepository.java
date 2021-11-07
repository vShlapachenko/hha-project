package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CaseStudyTemplateRepository extends MongoRepository<CaseStudyTemplate, String> {
    CaseStudyTemplate findByName(String name);
}
