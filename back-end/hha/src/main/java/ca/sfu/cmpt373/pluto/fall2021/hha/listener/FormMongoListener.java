package ca.sfu.cmpt373.pluto.fall2021.hha.listener;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Department;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Form;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentPointsRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterSaveEvent;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class FormMongoListener extends AbstractMongoEventListener<Form> {
    private final FormRepository formRepository;
    private final DepartmentRepository departmentRepository;
    private final DepartmentPointsRepository departmentPointsRepository;

    @Override
    public void onAfterSave(AfterSaveEvent<Form> event){
        Date submit = event.getSource().getSubmittedDate();
        Department department = departmentRepository.findByName(event.getSource().getLabel());
        DepartmentPoints points = departmentPointsRepository.findByDepartment(department);
    }
}
