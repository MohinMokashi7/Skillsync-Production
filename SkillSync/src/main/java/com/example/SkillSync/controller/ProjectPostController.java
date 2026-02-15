package com.example.SkillSync.controller;

import com.example.SkillSync.dto.ProjectPostDto;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.service.ProjectPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectPostController {
    private ProjectPostService postService;
    public ProjectPostController(ProjectPostService postService) {
        this.postService = postService;
    }
    @PostMapping
    public ResponseEntity<ProjectPostDto> createPost(@RequestBody ProjectPostDto projectPostDto, Principal principal){

        String email= principal.getName();
        ProjectPostDto createdpost=postService.createPost(email,projectPostDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdpost);

    }

    @GetMapping
    public ResponseEntity<List<ProjectPostDto>> showProject(){

        List<ProjectPostDto> posts = postService.getAllOpenPosts();

        // 2. Return the list with 200 OK
        return ResponseEntity.ok(posts);

    }
    @GetMapping("/my-projects")
    public ResponseEntity<List<ProjectPostDto>> getMyProjects(Principal principal) {
        return ResponseEntity.ok(postService.getMyProjects(principal.getName()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProjectPostDto> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getProjectPostById(id));
    }
    @PatchMapping("/{id}/visibility")
    public ResponseEntity<ProjectPostDto> updateVisibility(
            @PathVariable Long id,
            @RequestParam String visibility,
            Principal principal) {

        // principal.getName() gives us the email of the logged-in user for the security check
        ProjectPostDto updatedPost = postService.updateVisibility(id, principal.getName(), visibility);
        return ResponseEntity.ok(updatedPost);
    }
    @GetMapping("/search")
    public ResponseEntity<List<ProjectPostDto>> searchProject(@RequestParam String keyword){
        return ResponseEntity.ok(postService.searchProject(keyword));
    }
}
