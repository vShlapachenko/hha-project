package ca.sfu.cmpt373.pluto.fall2021.hha.listener;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Department;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Form;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentPointsRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterSaveEvent;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class FormMongoListener extends AbstractMongoEventListener<Form> {
    private final DepartmentRepository departmentRepository;
    private final DepartmentPointsRepository departmentPointsRepository;

    @Override
    public void onAfterSave(AfterSaveEvent<Form> event){
        Date submit = event.getSource().getSubmittedDate();
        System.out.println(submit);

        Department department = departmentRepository.findByName(event.getSource().getLabel());
        DepartmentPoints points = departmentPointsRepository.findByDepartment(department);

        String formDate = event.getSource().getDate();
        Calendar ddl = getDeadLine(formDate);
        System.out.println(ddl.getTime());
    }

    private Calendar getDeadLine(String formDate) {
        Calendar calendar = new GregorianCalendar();

        DateFormat formatter = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
        try {
            Date date = formatter.parse(formDate);

            calendar.setTime(date);

            calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return calendar;
    }
}
