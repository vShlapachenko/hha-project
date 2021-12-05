package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.FormsDraft;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormsDraftRepository extends MongoRepository<FormsDraft, String> {
    FormsDraft findByLabel(String label);
}