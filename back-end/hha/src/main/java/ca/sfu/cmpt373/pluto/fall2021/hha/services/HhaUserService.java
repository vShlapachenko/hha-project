package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.ActivationStatus;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.HhaUser;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.Role;
import ca.sfu.cmpt373.pluto.fall2021.hha.models.UserInvitation;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.HhaUserRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HhaUserService implements UserDetailsService {
    private final HhaUserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = userRepository.findByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new User(user.getEmail(), user.getPassword(), authorities);
    }

    public void saveUser(HhaUser user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Role saveRole (Role role){
        return roleRepository.save(role);
    }

    public void addRoleToUser(String email, String roleName){
        var user = userRepository.findByEmail(email);
        var role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        userRepository.save(user);
    }

    public Role getRole(String name) {
        return roleRepository.findByName(name);
    }

    public HhaUser getUser(String email){
        return userRepository.findByEmail(email);
    }

    public List<HhaUser> getUsers(){
        return userRepository.findAll();
    }

    public void invite(UserInvitation userInvitation) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var password = (String) authentication.getCredentials();
        if (!passwordEncoder.matches(userInvitation.password(), password)){
            throw new IllegalArgumentException("Supplied password is incorrect");
        }
        if (userRepository.findByEmail(userInvitation.email()) != null){
            throw new IllegalArgumentException("User already exists");
        }
        try {
            emailService.invite(userInvitation);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Something is wrong");
        }
        userRepository.save(new HhaUser(null, userInvitation.email(), null, null, null,
                UUID.randomUUID().toString(), null, null, ActivationStatus.CREATED_BY_ADMIN));
    }
}
