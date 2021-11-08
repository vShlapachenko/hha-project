package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTemplate;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTruncated;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.PhotoRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/case-study")
public class CaseStudyController {
    private final CaseStudyService caseStudyService;

    @GetMapping
    public List<CaseStudyTruncated> getCaseStudies() {
        return caseStudyService.getCaseStudies();
    }

    @GetMapping("{id}")
    public CaseStudy getCaseStudy(@PathVariable String id) {
        return caseStudyService.getCaseStudy(id);
    }

    @PostMapping("create")
    public void createCaseStudy() {
        caseStudyService.createCaseStudy();
    }

    @PostMapping("questions")
    public CaseStudyTemplate getQuestions(@RequestParam String caseName) {
        return caseStudyService.getQuestions(caseName);
    }

    @PostMapping("photo/add")
    public void savePhoto(@RequestBody MultipartFile photo)
            throws IOException {
        caseStudyService.savePhoto(photo);
    }

    @PostMapping("submit")
    public void saveCaseStudy(HttpServletRequest request,
                              @RequestBody CaseStudy caseStudy) {
        caseStudyService.saveCaseStudy(request, caseStudy);
    }
}
