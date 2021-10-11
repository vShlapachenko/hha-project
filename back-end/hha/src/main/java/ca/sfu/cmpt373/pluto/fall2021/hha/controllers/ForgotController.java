package ca.sfu.cmpt373.pluto.fall2021.hha.controllers;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.EmailDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Random;

@Controller
public class ForgotController {

    //open forgot password to enter email
    @RequestMapping("/forgotPassword")
    public String openEmailForm(){
        return "ForgotPassword";
    }

    @PostMapping("/forgotPassword")
    public String sendOTP(@RequestBody EmailDto email){
//        System.out.println("EMAIL "+email);

        Random random = new Random(1000);
        int otp = random.nextInt(999999);

        System.out.println("OTP "+otp);


        return "EnterOTP";
    }




}
