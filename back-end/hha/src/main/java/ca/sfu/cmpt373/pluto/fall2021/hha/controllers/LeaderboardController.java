package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentPoints;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.DepartmentRank;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/leaderboard")
public class LeaderboardController {
    private final LeaderboardService leaderboardService;

    @GetMapping("monthDepartments")
    public List<DepartmentRank> getMonthDepartments() {
        return leaderboardService.getMonthDesc();
    }

    @GetMapping("yearDepartments")
    public List<DepartmentRank> getYearDepartments() {
        return leaderboardService.getYearDesc();
    }
