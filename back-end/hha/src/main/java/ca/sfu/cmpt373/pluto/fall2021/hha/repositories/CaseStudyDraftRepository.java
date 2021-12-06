package ca.sfu.cmpt373.pluto.fall2021.hha.repositories;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyDraft;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CaseStudyDraftRepository extends MongoRepository<CaseStudyDraft, String> {
    List<CaseStudyDraft> findAllBySubmittedBy(HhaUser hhaUser);
}
