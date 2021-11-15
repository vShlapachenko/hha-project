package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Form;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FormService {
    private final FormRepository formRepository;

    public Form getForm(String id) {
        return formRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form with ID ==== " + id + " Does not exist"));
    }

    public void saveForm(Form form) {
        formRepository.insert(form);
    }
}
