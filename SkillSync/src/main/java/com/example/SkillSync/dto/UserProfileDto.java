package com.example.SkillSync.dto;




import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private String name;

    private String email;

    private String phone;

    private String bio;

    private  String location;

    private String college;

    private Set<String> skills;

    private Set<String> interestedCategories;



}
