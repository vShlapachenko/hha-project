package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
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

    private final HhaUserService hhaUserService;

    private Collection<Photo> photos;

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

    public void createCaseStudy() {
        photos = new ArrayList<>();
    }

    public CaseStudyTemplate getQuestions(String caseName) {
        return caseStudyTemplateRepository.findByName(caseName);
    }

    public void savePhoto(MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes())
        );
        photoRepository.insert(photo);

        photos.add(photo);
    }

    public void saveCaseStudy(HttpServletRequest request, CaseStudy caseStudy)
    {
        caseStudy.setSubmittedBy(hhaUserService.getUser(request.getUserPrincipal().getName()));
        caseStudy.setPhotos(photos);

        caseStudyRepository.insert(caseStudy);
    }
}
