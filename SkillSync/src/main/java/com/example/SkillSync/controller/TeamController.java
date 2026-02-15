package com.example.SkillSync.controller;

import com.example.SkillSync.dto.TeamDashboardResponseDto;
import com.example.SkillSync.dto.TeamMemberDto;
import com.example.SkillSync.service.ApplicationService;
import com.example.SkillSync.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/team")
public class TeamController {
    private final TeamService service;
    @GetMapping("/{projectId}/team")
    public ResponseEntity<TeamDashboardResponseDto> getTeam(@PathVariable Long projectId, Principal principal) {

        String email= principal.getName();
        // 1. Trigger the service logic we just discussed
        TeamDashboardResponseDto team = service.getTeamMembers(projectId,email);

        // 2. Return the clean, mapped list of teammates
        return ResponseEntity.ok(team);
    }
}
