package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Date;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Form;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.FormsDraft;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.FormService;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/form")
public class FormController {
    private final FormService formService;

    @GetMapping("{id}")
    public Form getForm(@PathVariable String id) {
        return formService.getForm(id);
    }

    @GetMapping("draft/{id}")
    public FormsDraft getFormsDraft(@PathVariable String id) {
        return formService.getFormsDraft(id);
    }

    @PostMapping("submit")
    public void saveForms(@RequestBody Form form) {
        formService.saveForm(form);
    }

    @PostMapping("submitAsDraft")
    public void saveFormsDraft(@RequestBody FormsDraft formsDraft) {
        formService.saveFormAsDraft(formsDraft);
    }

    @GetMapping("export")
    public void exportToCsv(@RequestBody Form form, HttpServletResponse response) {
        try {
            formService.exportFormToCsv(form, response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    @PostMapping("getForm")
    public Date getFormByDate(@RequestBody Date date){
        System.out.println("hi" + date);
        return date;
    }
}
