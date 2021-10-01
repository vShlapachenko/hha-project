package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.data.BasicInfo;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BasicInfoRepository extends MongoRepository<BasicInfo, String> {
    BasicInfo findByMonth (int month);
}
