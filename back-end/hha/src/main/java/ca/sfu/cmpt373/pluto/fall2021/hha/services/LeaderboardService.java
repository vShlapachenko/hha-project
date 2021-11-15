package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.CaseStudy;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentPointsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterSaveEvent;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService extends AbstractMongoEventListener<CaseStudy> {
    private final DepartmentPointsRepository departmentPointsRepository;

    public List<DepartmentPoints> getMonthDesc() {
        return departmentPointsRepository.findByOrderByMonthPointsDesc();
    }

    public List<DepartmentPoints> getYearDesc() {
        return departmentPointsRepository.findByOrderByYearPointsDesc();
    }

    @Scheduled(cron = "0 0 0 1 1/1 *")
    public void resetMonthPoints() {
        for (DepartmentPoints points : departmentPointsRepository.findAll()) {
            points.setYearPoints(points.getMonthPoints() + points.getMonthPoints());
            points.setMonthPoints(0);
        }
    }

    @Scheduled(cron = "0 0 0 1 1 *")
    public void resetYearPoints() {
        for (DepartmentPoints points : departmentPointsRepository.findAll()) {
            points.setYearPoints(0);
        }
    }

    @Override
    public void onAfterSave(AfterSaveEvent<CaseStudy> event){
        DepartmentPoints points = departmentPointsRepository.findByDepartment(
                event.getSource().getSubmittedBy().getDepartment());
        points.setMonthPoints(points.getMonthPoints() + 200);
    }
}
