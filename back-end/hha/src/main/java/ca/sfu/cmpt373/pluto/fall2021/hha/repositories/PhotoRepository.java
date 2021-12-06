package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
public interface PhotoRepository extends MongoRepository<Photo, String> {
    List<Photo> findAllBySubmittedBy(HhaUser hhaUser);
}
