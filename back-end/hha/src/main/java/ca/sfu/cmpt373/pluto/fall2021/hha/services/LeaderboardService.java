package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.DepartmentPointsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService {
    private final DepartmentPointsRepository departmentPointsRepository;

    public List<DepartmentPoints> getMonthDesc() {
        return departmentPointsRepository.findByOrderByMonthPointsDesc();
    }

    public List<DepartmentPoints> getYearDesc() {
        return departmentPointsRepository.findByOrderByYearPointsDesc();
    }
}
