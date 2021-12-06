package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormTemplateRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormsDraftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FormService {
    private final FormRepository formRepository;
    private final FormsDraftRepository formsDraftRepository;
    private final FormTemplateRepository formTemplateRepository;

    public FormTemplate getFormTemplate(String label) {
        return formTemplateRepository.findByLabel(label);
    }

    public List<FormTemplate> getFromTemplates() {
        return formTemplateRepository.findAll();
    }

    public List<Form> getForms() {
        return formRepository.findAll();
    }

    public Form getForm(String id) {
        return formRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form with ID ==== " + id + " Does not exist"));
    }

    public List<FormsDraft> getFormsDrafts() {
        return formsDraftRepository.findAll();
    }

    public FormsDraft getFormsDraft(String id) {
        return formsDraftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form Draft with ID ==== " + id + " Does not exist"));
    }

    public void deleteFormDraft(String id) {
        formsDraftRepository.deleteById(id);
    }

    public void saveForm(Form form) {
        formRepository.save(form);
    }

    public void saveFormAsDraft(FormsDraft formsDraft) {
        formsDraftRepository.save(formsDraft);
    }
}
