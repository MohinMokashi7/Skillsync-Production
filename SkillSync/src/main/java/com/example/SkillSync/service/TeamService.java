package com.example.SkillSync.service;

import com.example.SkillSync.dto.TeamDashboardResponseDto;
import com.example.SkillSync.dto.TeamMemberDto;
import com.example.SkillSync.model.Application;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.User;
import com.example.SkillSync.repository.ApplicationRepository;
import com.example.SkillSync.repository.ProjectPostRepository;
import com.example.SkillSync.repository.RequiredRoleRepository;
import com.example.SkillSync.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TeamService {
    private final UserRepository userRepository;
    private final ProjectPostRepository projectPostRepository;
    private final RequiredRoleRepository requiredRoleRepository;
    private final ApplicationRepository applicationRepository;

    public TeamDashboardResponseDto getTeamMembers(Long projectId, String email) {
        // 1. Fetch Project and Requester
        ProjectPost project = projectPostRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User requester = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2.Is Owner OR Accepted Member
        boolean isOwner = project.getOwner().getId() == requester.getId();
        boolean isMember = applicationRepository.existsByProjectPostAndApplicantAndStatus(project, requester, "ACCEPTED");

        if (!isOwner && !isMember) {
            throw new RuntimeException("Access Denied: You are not part of this team.");
        }

        List<TeamMemberDto> teamList = new ArrayList<>();

        // Add the Project Lead (Owner)
        User owner = project.getOwner();
        TeamMemberDto ownerDto = new TeamMemberDto();
        ownerDto.setName(owner.getName());
        ownerDto.setEmail(owner.getEmail());
        ownerDto.setRoleName("Project Lead"); // Special Title for the Owner

        // Safely get Owner Skills
        if (owner.getUserProfile() != null && owner.getUserProfile().getSkills() != null) {
            ownerDto.setSkills(owner.getUserProfile().getSkills());
        } else {
            ownerDto.setSkills(new HashSet<>());
        }

        teamList.add(ownerDto); // Add Owner FIRST

        // --- STEP B: Add the Hired Team Members ---
        List<Application> acceptedApps = applicationRepository.findByProjectPostAndStatus(project, "ACCEPTED");

        List<TeamMemberDto> members = acceptedApps.stream().map(app -> {
            TeamMemberDto dto = new TeamMemberDto();
            dto.setName(app.getApplicant().getName());
            dto.setEmail(app.getApplicant().getEmail());
            dto.setRoleName(app.getRequiredRole().getRoleName());

            // Safely get Applicant Skills
            if (app.getApplicant().getUserProfile() != null) {
                dto.setSkills(app.getApplicant().getUserProfile().getSkills());
            } else {
                dto.setSkills(new HashSet<>());
            }
            return dto;
        }).toList();

        teamList.addAll(members);

        TeamDashboardResponseDto response = new TeamDashboardResponseDto();
        response.setOwner(isOwner);
        response.setMembers(teamList);

        return response;

    }

}
