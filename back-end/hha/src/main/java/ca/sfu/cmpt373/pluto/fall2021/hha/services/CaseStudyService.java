package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTemplate;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Photo;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.PhotoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CaseStudyService {
    private CaseStudyRepository caseStudyRepository;
    private PhotoRepository photoRepository;

    private CaseStudy caseStudy;

    public void createCaseStudy(HhaUser user, CaseStudyTemplate caseStudyTemplate) {
        caseStudy = new CaseStudy();

        caseStudy.setCaseName(caseStudyTemplate.getName());
        caseStudy.setSubmittedBy(user);
    }

    public void savePhoto(MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes())
        );
        photoRepository.insert(photo);

        caseStudy.getPhotos().add(photo);
    }

    public void saveCaseStudy()
    {
        caseStudyRepository.insert(caseStudy);
    }
}
