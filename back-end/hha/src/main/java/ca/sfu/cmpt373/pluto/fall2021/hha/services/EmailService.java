package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.UserInvitation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public void invite(UserInvitation userInvitation) throws MessagingException {

        var thymeleafContext = new Context();
//        thymeleafContext.setVariables();
        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(userInvitation.email());
        helper.setFrom(emailFrom);
        helper.setSubject("Invitation To Join Hha");
        helper.setText(htmlBody, true);
        mailSender.send(message);
//        var message = new SimpleMailMessage();
//        message.setFrom(emailFrom);
//        message.setTo(userInvitation.email());
//        message.setSubject("Invitation To Join Hha");
//        message.setText();
    }
}
