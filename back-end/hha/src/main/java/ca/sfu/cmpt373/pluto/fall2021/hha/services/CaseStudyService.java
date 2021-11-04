package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTruncated;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.UserPublicInfo;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;

    public List<CaseStudyTruncated> getCaseStudies() {
        return toTruncatedCaseStudy(caseStudyRepository.findAll());
    }

    private List<CaseStudyTruncated> toTruncatedCaseStudy(List<CaseStudy> caseStudies) {
        return caseStudies.stream()
                .map(caseStudy ->  {
                    var user = caseStudy.getSubmittedBy();
                    return new CaseStudyTruncated(caseStudy.getId(), caseStudy.getCaseName(), caseStudy.getSubmittedDate(), new UserPublicInfo(user.getFirstName(), user.getLastName()));
                })
                .collect(Collectors.toList());
    }


    public CaseStudy getCaseStudy(String id) {
        return caseStudyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("CaseStudy with ID ==== " + id + " Does not exist"));
    }
}
