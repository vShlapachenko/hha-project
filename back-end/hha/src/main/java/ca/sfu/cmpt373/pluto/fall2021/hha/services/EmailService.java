package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.UserInvitation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.WebEngineContext;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine thymeleafTemplateEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public void invite(UserInvitation userInvitation) throws MessagingException {

        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo("valentyn.shlapachenko@gmail.com");
        helper.setFrom(emailFrom);
        helper.setSubject("Invitation To Join Hha");

        var thymeleafContext = new Context();
        thymeleafContext.setVariables(Map.of("recipientName", userInvitation.email()));
        var htmlBody = thymeleafTemplateEngine.process("invite.html", thymeleafContext);

        helper.setText(htmlBody, true);
        mailSender.send(message);
//        var message = new SimpleMailMessage();
//        message.setFrom(emailFrom);
//        message.setTo(userInvitation.email());
//        message.setSubject("Invitation To Join Hha");
//        message.setText();
    }
}
