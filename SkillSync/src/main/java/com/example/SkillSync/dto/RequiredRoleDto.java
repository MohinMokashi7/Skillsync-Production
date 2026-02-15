package com.example.SkillSync.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class RequiredRoleDto {
    private Long id;
    private String roleName;

    private Set<String> requiredSkills;

}