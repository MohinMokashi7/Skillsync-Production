package com.example.SkillSync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamMemberDto {
    private String name;
    private String email;
    private String roleName;
    private Set<String> skills;
}