package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTemplate;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.PhotoRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/case-study")
public class CaseStudyController {
    private CaseStudyService caseStudyService;

    @PostMapping("create")
    public void createCaseStudy(@RequestParam("user") HhaUser user,
                                @RequestParam("template")CaseStudyTemplate template) {
        caseStudyService = new CaseStudyService();
        caseStudyService.createCaseStudy(user, template);
    }

    @PostMapping("photo/add")
    public void savePhoto(@RequestParam("photo") MultipartFile photo)
            throws IOException {
        caseStudyService.savePhoto(photo);
    }

    @PostMapping("submit")
    public void saveCaseStudy() {
        caseStudyService.saveCaseStudy();
    }
}
