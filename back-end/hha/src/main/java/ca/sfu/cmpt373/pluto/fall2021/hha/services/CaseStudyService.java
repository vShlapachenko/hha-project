package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyDraftRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyTemplateRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaseStudyService {
    private final CaseStudyRepository caseStudyRepository;
    private final CaseStudyTemplateRepository caseStudyTemplateRepository;
    private final PhotoRepository photoRepository;
    private final CaseStudyDraftRepository caseStudyDraftRepository;

    private final HhaUserService hhaUserService;

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

    public List<CaseStudyDraft> createCaseStudy(HttpServletRequest request) {
        HhaUser hhaUser = hhaUserService.getUser(request.getUserPrincipal().getName());
        return getDraft(hhaUser);
    }

    public List<CaseStudyDraft> getDraft(HhaUser hhaUser) {
        return caseStudyDraftRepository.findAllBySubmittedBy(hhaUser);
    }

    public CaseStudyTemplate getQuestions(String caseName) {
        return caseStudyTemplateRepository.findByName(caseName);
    }

    public Photo savePhoto(MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes())
        );
        photoRepository.insert(photo);

        return photo;
    }

    public void deletePhoto(String id) {
        photoRepository.deleteById(id);
    }

    public void saveCaseStudy(HttpServletRequest request, CaseStudy caseStudy)
    {
        caseStudy.setSubmittedBy(hhaUserService.getUser(request.getUserPrincipal().getName()));
        caseStudyRepository.insert(caseStudy);
    }

    public void saveCaseStudyDraft(HttpServletRequest request, CaseStudyDraft caseStudyDraft) {
        caseStudyDraft.setSubmittedBy(hhaUserService.getUser(request.getUserPrincipal().getName()));
        caseStudyDraftRepository.insert(caseStudyDraft);
    }
}
