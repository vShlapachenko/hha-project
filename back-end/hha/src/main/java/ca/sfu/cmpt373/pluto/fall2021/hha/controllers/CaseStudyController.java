package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.PhotoRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
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

    @GetMapping("getAllCaseStudies")
    public List<CaseStudy> getAllCaseStudies() {
        return caseStudyService.getAllCaseStudies();
    }

    @GetMapping("create")
    public List<CaseStudyDraft> createCaseStudy(Principal principal) {
        return caseStudyService.createCaseStudy(principal);
    }

    @GetMapping("photo/getAllPhotos")
    public List<Photo> getAllPhotos() {
        return caseStudyService.getAllPhotos();
    }

    @GetMapping("photo/getPhotosByCurrentUser")
    public List<Photo> getPhotosByCurrentUser(Principal principal) {
        return caseStudyService.getPhotosByCurrentUser(principal);
    }


    @PostMapping("questions")
    public CaseStudyTemplate getQuestions(@RequestParam String caseName) {
        return caseStudyService.getQuestions(caseName);
    }

    @PostMapping("photo/add")
    public Photo savePhoto(Principal principal, @RequestPart("file")  MultipartFile photo)
            throws IOException {
        return caseStudyService.savePhoto(principal,photo);
    }

    @DeleteMapping("photo/delete/{id}")
    public void deletePhoto(@PathVariable("id") String id) {
        caseStudyService.deletePhoto(id);
    }

    @PostMapping("submit")
    public void saveCaseStudy(Principal principal,
                              @RequestBody CaseStudy caseStudy) {
        caseStudyService.saveCaseStudy(principal, caseStudy);
    }

    @PostMapping("submitAsDraft")
    public void saveCaseStudyDraft(Principal principal,
                                   @RequestBody CaseStudyDraft caseStudyDraft) {
        caseStudyService.saveCaseStudyDraft(principal, caseStudyDraft);
    }


    @DeleteMapping("delete/{id}")
    public void deleteCasetStudyDraftById(@PathVariable("id") String id) {
       caseStudyService.deleteCasetStudyDraftById(id);
    }

}
