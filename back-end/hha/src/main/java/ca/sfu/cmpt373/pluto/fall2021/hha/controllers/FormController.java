package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Form;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.FormService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/form")
public class FormController {
    private final FormService formService;

    @GetMapping("{id}")
    public Form getForm(@PathVariable String id) {
        return formService.getForm(id);
    }

    @PostMapping("submit")
    public void createForm(@RequestBody Form form) {
        formService.saveForm(form);
    }
}
