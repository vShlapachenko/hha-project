package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.UserInvitation;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.HhaUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/hha-user")
public class HhaUserController {
    private final HhaUserService userService;

    @GetMapping("getUsers")
    public List<HhaUser> getUser() {
        return userService.getUsers();
    }

    @PostMapping("invite")
    public void invite(@RequestBody UserInvitation userInvitation) {
        userService.invite(userInvitation);
    }

    @PostMapping("saveUser")
    public void saveUser(@RequestBody HhaUser user) {
        userService.saveUser(user);
    }
}
