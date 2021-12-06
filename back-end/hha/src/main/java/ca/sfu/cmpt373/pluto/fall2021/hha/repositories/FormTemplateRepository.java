package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.FormTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormTemplateRepository extends MongoRepository<FormTemplate, String> {
    FormTemplate findByLabel(String label);
}
