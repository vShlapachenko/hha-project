package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.ForgotPasswordRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.HhaUserRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Collection;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HhaUserService implements UserDetailsService {
    private final HhaUserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new User(user.getEmail(), user.getPassword(), authorities);
    }

    public void saveUser(HhaUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public void addRoleToUser(String email, String roleName) {
        var user = userRepository.findByEmail(email);
        var role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        userRepository.save(user);
    }

    public Role getRole(String name) {
        return roleRepository.findByName(name);
    }

    public HhaUser getUser(String email) {
        return userRepository.findByEmail(email);
    }

    public List<HhaUser> getUsers() {
        return userRepository.findAll();
    }

    public void invite(UserInvitation userInvitation) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var password = (String) authentication.getCredentials();
        if (!passwordEncoder.matches(userInvitation.password(), password)) {
            throw new IllegalArgumentException("Supplied password is incorrect");
        }
        if (userRepository.findByEmail(userInvitation.email()) != null) {
            throw new IllegalArgumentException("User already exists");
        }
        var activationLink = UUID.randomUUID().toString();
        try {
            emailService.invite(userInvitation, activationLink);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Something is wrong");
        }
        userRepository.save(new HhaUser(null, userInvitation.email(), null, null, null,
                activationLink, null, null, ActivationStatus.CREATED_BY_ADMIN, null));
    }

    public void acceptInvite(String activationLink, UserRegistrationCredentials userRegistrationCredentials) {
        var user = userRepository.findByActivationLink(activationLink);
        if (user == null) {
            throw new IllegalArgumentException("User with activation link " + activationLink + " was not found");
        }
        user.setPassword(userRegistrationCredentials.getPassword());
        user.setFirstName(userRegistrationCredentials.getFirstName());
        user.setLastName(userRegistrationCredentials.getLastName());
        user.setActivationStatus(ActivationStatus.FILLED_INFO);

        var confirmationLink = UUID.randomUUID().toString();
        user.setConfirmationLink(confirmationLink);

        saveUser(user);

        try {
            emailService.confirm(user.getEmail(), confirmationLink);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Something is wrong");
        }
    }

    public void confirm(String confirmationLink) {
        var user = userRepository.findByConfirmationLink(confirmationLink);

        if (user == null || user.getActivationStatus() == ActivationStatus.ACTIVATED) {
            throw new IllegalArgumentException("User with confirmation link " + confirmationLink + " was not found");
        }
        user.setConfirmationLink(null);
        user.setActivationStatus(ActivationStatus.ACTIVATED);

        saveUser(user);
    }

    public int sendOtp(EmailDto email) {
        if (!userRepository.existsByEmail(email.getEmail())){
            throw new IllegalArgumentException("This email does not exist in DB = " + email.getEmail());
        }

        //reference from https://stackoverflow.com/questions/51322750/generate-6-digit-random-number
        Random random = new Random();
        int otp = random.nextInt(900000) + 100000;

        try {
            emailService.sendOtp(email, otp);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Something went wrong in sending the email");
        }
        forgotPasswordRepository.save(new ForgotPassword(otp, userRepository.findByEmail(email.getEmail())));
        return otp;
    }

    public void setNewPassword(NewPassword newPasswordData){
        var user = getUser(newPasswordData.getEmail());
        user.setPassword(newPasswordData.getPassword());
        saveUser(user);
    }

    public void changePassword(ChangePassword changePasswordData) {
        var user = getUser(changePasswordData.getEmail());
        if (passwordEncoder.matches(changePasswordData.getOldPassword(), user.getPassword())){
            user.setPassword(changePasswordData.getNewPassword());
            saveUser(user);
        } else{
            throw new IllegalArgumentException("Old Password do not match for " + changePasswordData.getEmail());
        }
    }

    public HhaUser userProfile(String email){
        var user = getUser(email);
        System.out.println(user.getEmail());
        System.out.println(user.getFirstName());
        System.out.println(user.getLastName());
        return user;
    }
}
