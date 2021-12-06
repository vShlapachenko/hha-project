package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormsDraftRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormService {
    private final FormRepository formRepository;
    private final FormsDraftRepository formsDraftRepository; 

    public Form getForm(String id) {
        return formRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form with ID ==== " + id + " Does not exist"));
    }

    public FormsDraft getFormsDraft(String id) {
        return formsDraftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form Draft with ID ==== " + id + " Does not exist"));
    }

    public void saveForm(Form form) {
        formRepository.save(form);
    }

    public void saveFormAsDraft(FormsDraft formsDraft) {
        formsDraftRepository.save(formsDraft);
    }

    public Form getFormByDate(String date){
        return formRepository.findByDate(date);
    }

}
