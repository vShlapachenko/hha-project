package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.ForgotPassword;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ForgotPasswordRepository extends MongoRepository<ForgotPassword, String> {
}
