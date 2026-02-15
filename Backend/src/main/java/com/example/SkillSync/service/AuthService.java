package com.example.SkillSync.service;

import com.example.SkillSync.dto.LoginDto;
import com.example.SkillSync.dto.RegisterDto;
import com.example.SkillSync.model.User;
import com.example.SkillSync.repository.UserRepository;
import com.example.SkillSync.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
@Service
public class AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String registerUser(RegisterDto registerDto){

        Optional<User>existinguser= userRepository.findByEmailOrPhone(registerDto.getEmail(),registerDto.getPhone());

        if(existinguser.isPresent()){
            throw new RuntimeException("User already Registered with this email or phone no.");
        }

        String hashedpass=passwordEncoder.encode(registerDto.getPassword());

        User newuser=new User();

        newuser.setName(registerDto.getName());
        newuser.setPhone(registerDto.getPhone());
        newuser.setEmail(registerDto.getEmail());
        newuser.setPassword(hashedpass);
        newuser.setRoles(Set.of("ROLE_USER"));

        userRepository.save(newuser);
        return "User Registered Successfully";



    }


    public String loginUser(LoginDto loginDto){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), // The email or phone
                        loginDto.getPassword()
                )
        );

        String token = jwtTokenProvider.generateToken(authentication);

      return token;

    }
}
