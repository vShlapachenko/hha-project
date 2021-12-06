package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.FormService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/form")
public class FormController {
    private final FormService formService;

    @GetMapping()
    public List<Form> getForms() {
        return formService.getForms();
    }

    @GetMapping("{id}")
    public Form getForm(@PathVariable String id) {
        return formService.getForm(id);
    }

    @GetMapping("templates")
    public List<FormTemplate> getTemplates() {
        return formService.getFromTemplates();
    }

    @GetMapping("template")
    public FormTemplate getTemplateByLabel(@RequestParam String label) {
        return formService.getFormTemplate(label);
    }

    @GetMapping("draft")
    public List<FormsDraft> getFormsDrafts() {
        return formService.getFormsDrafts();
    }

    @GetMapping("draft/{id}")
    public FormsDraft getFormsDraft(@PathVariable String id) {
        return formService.getFormsDraft(id);
    }

    @DeleteMapping("draft/delete/{id}")
    public void deleteDraft(@PathVariable String id) {
        formService.deleteFormDraft(id);
    }

    @PostMapping("submit")
    public void saveForms(@RequestBody Form form) {
        formService.saveForm(form);
    }

    @PostMapping("submitAsDraft")
    public void saveFormsDraft(@RequestBody FormsDraft formsDraft) {
        formService.saveFormAsDraft(formsDraft);
    }
}
