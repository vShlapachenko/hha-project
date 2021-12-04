package ca.sfu.cmpt373.pluto.fall2021.hha.listener;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentPointsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterSaveEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CaseStudyMongoListener extends AbstractMongoEventListener<CaseStudy> {
    private final DepartmentPointsRepository departmentPointsRepository;

    @Override
    public void onAfterSave(AfterSaveEvent<CaseStudy> event){
        HhaUser hhaUser = event.getSource().getSubmittedBy();
        DepartmentPoints points = departmentPointsRepository.findByDepartment(hhaUser.getDepartment());
        points.setMonthPoints(points.getMonthPoints() + 200);
        points.setYearPoints(points.getYearPoints() + 200);
        departmentPointsRepository.save(points);
    }
}
