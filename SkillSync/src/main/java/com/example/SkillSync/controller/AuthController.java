package com.example.SkillSync.controller;

import com.example.SkillSync.dto.JwtAuthResponseDto;
import com.example.SkillSync.dto.LoginDto;
import com.example.SkillSync.dto.RegisterDto;
import com.example.SkillSync.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){

        String response = authService.registerUser(registerDto); // Call the service
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
   @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDto> login(@RequestBody LoginDto loginDto){
       String token = authService.loginUser(loginDto); // Call the service

       JwtAuthResponseDto jwtAuthResponseDto = new JwtAuthResponseDto(); // Create the response DTO
       jwtAuthResponseDto.setAccessToken(token); // Put the token inside

       return ResponseEntity.ok(jwtAuthResponseDto); // Return 200 OK with the token DTO
   }


}
