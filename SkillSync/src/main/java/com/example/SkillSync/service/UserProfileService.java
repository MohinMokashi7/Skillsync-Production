package com.example.SkillSync.service;

import com.example.SkillSync.dto.UserProfileDto;
import com.example.SkillSync.model.User;
import com.example.SkillSync.model.UserProfile;
import com.example.SkillSync.repository.UserProfileRepository;
import com.example.SkillSync.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;


    public UserProfileDto getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile userProfile = user.getUserProfile();

        UserProfileDto dto = new UserProfileDto();

        // Identity (always exists)
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        if (userProfile != null) {
            dto.setBio(userProfile.getBio());
            dto.setLocation(userProfile.getLocation());
            dto.setCollege(userProfile.getCollege());

            dto.setSkills(
                    userProfile.getSkills() != null
                            ? userProfile.getSkills()
                            : new HashSet<>()
            );

            dto.setInterestedCategories(
                    userProfile.getInterestedCategories() != null
                            ? userProfile.getInterestedCategories()
                            : new HashSet<>()
            );
        } else {
            dto.setSkills(new HashSet<>());
            dto.setInterestedCategories(new HashSet<>());
        }

        return dto;
    }

    //update user profile
@Transactional
public UserProfileDto updateProfile(String email, UserProfileDto userProfileDto) {
    // 1. Fetch User
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found."));

    // 2. Step One: Ensure the Profile record exists physically in the DB
    UserProfile userProfile = user.getUserProfile();
    if (userProfile == null) {
        userProfile = new UserProfile();
        userProfile.setUser(user);
        user.setUserProfile(userProfile);

        userProfile.setSkills(new HashSet<>());
        userProfile.setInterestedCategories(new HashSet<>());

        userProfile = userProfileRepository.saveAndFlush(userProfile);
    }


    // 3. Step Two: Now that the row exists (ID is valid), update the data
    userProfile.setBio(userProfileDto.getBio());
    userProfile.setLocation(userProfileDto.getLocation());
    userProfile.setCollege(userProfileDto.getCollege());

    userProfile.setSkills(
            userProfileDto.getSkills() != null ? userProfileDto.getSkills() : new HashSet<>()
    );
    userProfile.setInterestedCategories(
            userProfileDto.getInterestedCategories() != null ? userProfileDto.getInterestedCategories() : new HashSet<>()
    );
    // Right here, before the return
    userRepository.save(user);

    return  getProfile(email);

}
}
