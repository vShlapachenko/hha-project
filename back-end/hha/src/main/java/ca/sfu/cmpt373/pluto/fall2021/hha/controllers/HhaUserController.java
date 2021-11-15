package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.HhaUserRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.services.HhaUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.aggregation.ComparisonOperators;
import org.springframework.security.access.method.P;
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

    @PostMapping("accept-invite/{activationLink}")
    public void acceptInvite(@PathVariable String activationLink,
                             @RequestBody UserRegistrationCredentials userRegistrationCredentials) {
        userService.acceptInvite(activationLink, userRegistrationCredentials);
    }

    @PostMapping("saveUser")
    public void saveUser(@RequestBody HhaUser user) {
        userService.saveUser(user);
    }

    @PostMapping("confirm/{confirmationLink}")
    @ResponseBody
    public String confirmRegistration(@PathVariable String confirmationLink) {
        userService.confirm(confirmationLink);
        return "confirmSuccess";
    }

    @PostMapping("forgotPassword")
    public int sendOtp(@RequestBody EmailDto email){
        return userService.sendOtp(email);
    }

    @PostMapping("forgotPassword/enterNewPassword")
    public void saveNewPassword(@RequestBody NewPassword newPasswordData){
        userService.setNewPassword(newPasswordData);
    }

    @PostMapping("changePassword")
    public void changePassword(@RequestBody ChangePassword changePasswordData) {
        userService.changePassword(changePasswordData);
    }

    @PostMapping("userProfile")
    public HhaUser userProfile(@RequestBody String email){
        System.out.println(email);
        System.out.println(userService.getUser(email));
        return userService.getUser(email);
    }
}
