package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudyTruncated;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/case-study")
public class CaseStudiesController {

    private final CaseStudyService caseStudyService;

    @GetMapping
    public List<CaseStudyTruncated> getCaseStudies() {
        return caseStudyService.getCaseStudies();
    }

    @GetMapping("{id}")
    public CaseStudy getCaseStudy(@PathVariable String id) {
        return caseStudyService.getCaseStudy(id);
    }
}
