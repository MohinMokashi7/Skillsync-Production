package com.example.SkillSync.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class ApplicationResponseDto {
    private Long applicationId;

    private String applicantName;

    private Set<String> applicantSkills;

    private String roleName;

    private Double matchScore;

    private String coverLetter;

    private String status;

    private Long projectId;
    private String projectTitle;

}