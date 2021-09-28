package ca.sfu.cmpt373.pluto.fall2021.hha;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.ActivationStatus;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Role;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.HhaUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class HhaApplication {
    private final HhaUserService userService;

    public static void main(String[] args) {
        SpringApplication.run(HhaApplication.class, args);
    }

//    @Bean
//    CommandLineRunner runner(){
//        return args -> {
//            userService.saveRole(new Role(null, "ROLE_STAFF"));
//
//            userService.saveUser(new HhaUser(null, "email@email.com", "firstName", "lastName",
//                    "1234", List.of(userService.getRole("ROLE_STAFF")), null, ActivationStatus.ACTIVATED));
//        };
//    }
}
