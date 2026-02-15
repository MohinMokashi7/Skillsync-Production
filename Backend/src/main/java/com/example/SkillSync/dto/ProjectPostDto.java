package com.example.SkillSync.dto;

import com.example.SkillSync.model.Application;
import com.example.SkillSync.model.RequiredRole;
import com.example.SkillSync.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProjectPostDto {

    private Long id;
    private String title;

    private String description;
    private int teamSize;

    private String visibility;

    private String status; // "OPEN", "CLOSED"

    private String ownerName;

    private String category; // "HACKATHON", "STARTUP"

    private String location;

    private String expectedDuration;


    private Set<RequiredRoleDto> requiredRoleDto = new HashSet<>();



}