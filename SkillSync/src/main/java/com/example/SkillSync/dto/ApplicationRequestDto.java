package com.example.SkillSync.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor

public class ApplicationRequestDto {

    private String coverLetter;

    private Long requiredRoleId;
    
}