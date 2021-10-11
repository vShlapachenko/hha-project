package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HhaUserRepository extends MongoRepository<HhaUser, String> {
    HhaUser findByEmail(String email);

    HhaUser findByActivationLink(String activationLink);
}
