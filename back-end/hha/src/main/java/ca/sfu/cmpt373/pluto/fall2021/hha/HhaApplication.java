package ca.sfu.cmpt373.pluto.fall2021.hha;

import ca.sfu.cmpt373.pluto.fall2021.hha.services.HhaUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@RequiredArgsConstructor
@EnableScheduling
public class HhaApplication {
    private final HhaUserService userService;

    public static void main(String[] args) {
        SpringApplication.run(HhaApplication.class, args);
    }
}
