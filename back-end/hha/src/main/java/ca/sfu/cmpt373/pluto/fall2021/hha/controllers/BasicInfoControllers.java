package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.data.BasicInfo;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.BasicInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/basic-info")
public class BasicInfoControllers {
    private BasicInfoRepository basicInfoRepository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public BasicInfo createBasicInfo(@RequestBody BasicInfo basicInfo) {
        return basicInfoRepository.save(basicInfo);
    }

}
