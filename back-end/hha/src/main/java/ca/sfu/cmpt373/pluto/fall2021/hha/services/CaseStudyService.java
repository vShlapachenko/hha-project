package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTemplate;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Photo;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyTemplateRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CaseStudyService {
    private final CaseStudyRepository caseStudyRepository;
    private final CaseStudyTemplateRepository caseStudyTemplateRepository;
    private final PhotoRepository photoRepository;

    private CaseStudy caseStudy;

    public void createCaseStudy() {
        caseStudy = new CaseStudy();
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

        caseStudy.getPhotos().add(photo);
    }

    private void getHhaUser() {

    }

    public void saveCaseStudy(CaseStudy caseReceived)
    {
        caseStudyRepository.insert(caseStudy);
    }
}
