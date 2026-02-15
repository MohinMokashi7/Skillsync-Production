package com.example.SkillSync.controller;

import com.example.SkillSync.dto.UserProfileDto;
import com.example.SkillSync.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/about")
public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateprofile(@RequestBody UserProfileDto profiledto, Principal principal){
        String userEmail=principal.getName();
        UserProfileDto updatedProfile = userProfileService.updateProfile(userEmail, profiledto);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(Principal principal){
//  Get the secure email from the JWT (principal.getName())
        String userEmail = principal.getName();

        // 2. Call the service to get the DTO
        UserProfileDto profileDto = userProfileService.getProfile(userEmail);

        // 3. Return the ResponseEntity.ok(...) with the DTO
        return ResponseEntity.ok(profileDto);

    }
}
