package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentRank;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentPointsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {
    private final DepartmentPointsRepository departmentPointsRepository;

    public List<DepartmentRank> getMonthDesc() {
        return toMonthDepartmentRank(departmentPointsRepository.findByOrderByMonthPointsDesc());
    }

    public List<DepartmentRank> getYearDesc() {
        return toYearDepartmentRank(departmentPointsRepository.findByOrderByYearPointsDesc());
    }

    private List<DepartmentRank> toMonthDepartmentRank(List<DepartmentPoints> departmentPoints) {
        return departmentPoints.stream().map(
                departmentPoint -> new DepartmentRank(departmentPoint.getDepartment().getName(), departmentPoint.getMonthPoints())
        ).collect(Collectors.toList());
    }

    private List<DepartmentRank> toYearDepartmentRank(List<DepartmentPoints> departmentPoints) {
        return departmentPoints.stream().map(
                departmentPoint -> new DepartmentRank(departmentPoint.getDepartment().getName(), departmentPoint.getYearPoints())
        ).collect(Collectors.toList());
    }

    private void saveDepartmentPoints(DepartmentPoints departmentPoints) {
        departmentPointsRepository.save(departmentPoints);
    }

    @Scheduled(cron = "0 0 0 1 1/1 *")
    public void resetMonthPoints() {
        for (DepartmentPoints points : departmentPointsRepository.findAll()) {
            points.setMonthPoints(0);
            saveDepartmentPoints(points);
        }
    }

    @Scheduled(cron = "0 0 0 1 1 *")
    public void resetYearPoints() {
        for (DepartmentPoints points : departmentPointsRepository.findAll()) {
            points.setYearPoints(0);
            saveDepartmentPoints(points);
        }
    }
}
