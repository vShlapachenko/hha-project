package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.Role;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.TodoInfo;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.CaseStudyRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.HhaUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final HhaUserRepository userRepository;
    private final CaseStudyRepository caseStudyRepository;


    // TODO: after forms get merged add todo for the forms
    public TodoInfo getTodo(String email) {
        var user = userRepository.findByEmail(email);

        var shouldBeSeen = user.getRoles().stream()
                .map(Role::getName)
                .anyMatch(roleName -> roleName.equals("ROLE_HEAD_OF_DEP"));

        if (!shouldBeSeen) {
            return new TodoInfo(false, null, null);
        }

        var caseStudy = caseStudyRepository.findFirstBySubmittedBy_DepartmentOrderBySubmittedDateDesc(user.getDepartment());

        var today = LocalDate.now();
        var seventhDayOfCurrentMonth = today.withDayOfMonth(7);
        Date convertedSeventhDay = Date.from(seventhDayOfCurrentMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());

        var caseStudySubmittedDate = caseStudy.getSubmittedDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        if (seventhDayOfCurrentMonth.isAfter(caseStudySubmittedDate)) {
            return new TodoInfo(false, null, null);
        }

        long diff = convertedSeventhDay.getTime() - caseStudy.getSubmittedDate().getTime();
        var dayDiff = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);

        return new TodoInfo(true, dayDiff, null);
    }

}
