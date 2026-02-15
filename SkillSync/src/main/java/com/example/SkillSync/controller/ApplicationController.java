package com.example.SkillSync.controller;

import com.example.SkillSync.dto.ApplicationRequestDto;
import com.example.SkillSync.dto.ApplicationResponseDto;
import com.example.SkillSync.dto.ProjectPostDto;
import com.example.SkillSync.dto.TeamMemberDto;
import com.example.SkillSync.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService service;
//apply for projects
    @PostMapping("/{projectId}/apply")
    public ResponseEntity<ApplicationResponseDto> applyToProject
            (@PathVariable Long projectId, @RequestBody ApplicationRequestDto requestDto, Principal principal){
        String email=principal.getName();
        ApplicationResponseDto response=service.applyToProject(email,projectId,requestDto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(response);


    }

    // to get all applications for your post as owner
    @GetMapping("/{projectId}")
    public ResponseEntity<List<ApplicationResponseDto>> showApplications
            (@PathVariable Long projectId,  Principal principal){

        String email=principal.getName();

        List<ApplicationResponseDto> apllications= service.getAllApplications(email,projectId);


        // 2. Return the list with 200 OK
        return ResponseEntity.ok(apllications);

    }

// to show all projects user as applied for as JOINER
    @GetMapping("/My-applications")
    public ResponseEntity<List<ApplicationResponseDto>> showMyApplications
            (  Principal principal){

        String applicantemail=principal.getName();

        List<ApplicationResponseDto> apllications= service.getMyApplications(applicantemail);


        // 2. Return the list with 200 OK
        return ResponseEntity.ok(apllications);

    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            java.security.Principal principal
    ) {
        // 1. Get Owner Email
        String ownerEmail = principal.getName();

        // 2. Call Service
        service.updateApplicationStatus(ownerEmail, applicationId, status);

        // 3. Return Success Message
        return ResponseEntity.ok("Application status updated to " + status);
    }

}
