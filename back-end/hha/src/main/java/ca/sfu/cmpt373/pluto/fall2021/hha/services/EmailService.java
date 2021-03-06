package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.UserInvitation;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.EmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine thymeleafTemplateEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public void invite(UserInvitation userInvitation, String activationLink) throws MessagingException {
        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(userInvitation.email());
        helper.setFrom(emailFrom);
        helper.setSubject("Invitation To Join Hha");

        var thymeleafContext = new Context();
        thymeleafContext.setVariable("active", activationLink);
        var htmlBody = thymeleafTemplateEngine.process("invite.html", thymeleafContext);

        helper.setText(htmlBody, true);
        mailSender.send(message);
    }

    public void confirm(String email, String confirmationLink) throws MessagingException{
        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(email);
        helper.setFrom(emailFrom);
        helper.setSubject("Please Verify Your Registration");

        var thymeleafContext = new Context();
        thymeleafContext.setVariable("confirm", confirmationLink);
        var htmlBody = thymeleafTemplateEngine.process("invite.html", thymeleafContext);

        helper.setText(htmlBody, true);
        mailSender.send(message);
    }

    public void sendOtp(EmailDto email, int otp) throws MessagingException{
        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(email.getEmail());
        helper.setFrom(emailFrom);
        helper.setSubject("One Time password for HHA");

        var thymeleafContext = new Context();
        thymeleafContext.setVariable("otp", otp);
        var htmlBody = thymeleafTemplateEngine.process("otp.html", thymeleafContext);

        helper.setText(htmlBody, true);
        mailSender.send(message);
    }
}
