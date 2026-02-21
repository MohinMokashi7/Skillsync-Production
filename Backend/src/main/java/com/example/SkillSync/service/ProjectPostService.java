package com.example.SkillSync.service;

import com.example.SkillSync.dto.ProjectPostDto;
import com.example.SkillSync.dto.RequiredRoleDto;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.RequiredRole;
import com.example.SkillSync.model.User;
import com.example.SkillSync.repository.ProjectPostRepository;
import com.example.SkillSync.repository.RequiredRoleRepository;
import com.example.SkillSync.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectPostService {
    private final ProjectPostRepository projectPostRepository;
    private final RequiredRoleRepository requiredRoleRepository;
    private final UserRepository userRepository;
//create project as owner
    @Transactional
    public ProjectPostDto createPost(String owenerEmail,ProjectPostDto projectPostDto){
        User owner=userRepository.findByEmail(owenerEmail)
                .orElseThrow(()->new RuntimeException("user not found"));
        ProjectPost post=new ProjectPost();
        post.setTitle(projectPostDto.getTitle());
        post.setDescription(projectPostDto.getDescription());
        post.setStatus("OPEN");
        post.setCategory(projectPostDto.getCategory());
        post.setLocation(projectPostDto.getLocation());
        post.setExpectedDuration(projectPostDto.getExpectedDuration());
        post.setTeamSize(projectPostDto.getTeamSize());
        post.setVisibility("PUBLIC");
        if (projectPostDto.getVisibility() != null && !projectPostDto.getVisibility().isEmpty()) {
            post.setVisibility(projectPostDto.getVisibility().toUpperCase());
        }
        post.setOwner(owner);
        Set<RequiredRole> roles=new HashSet<>();

        if(projectPostDto.getRequiredRoleDto()!=null){

            for(RequiredRoleDto roleDto : projectPostDto.getRequiredRoleDto()) {

                RequiredRole role = new RequiredRole();

                role.setRoleName(roleDto.getRoleName());
                role.setRequiredSkills(roleDto.getRequiredSkills());

                // Link Child to Parent
                role.setProjectPost(post);

                roles.add(role);
            }
        }

        post.setRequiredRoles(roles);
       ProjectPost savedpost=projectPostRepository.save(post);
        return mapToDto(savedpost);
    }

    public List<ProjectPostDto> getMyProjects(String email) {
        List<ProjectPost> myPosts = projectPostRepository.findByOwnerEmail(email);
        return myPosts.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

      //this is helper class where we are converting entity data to dto so we can show data on frontend
    private ProjectPostDto mapToDto(ProjectPost post){
        ProjectPostDto dto=new ProjectPostDto();
        dto.setId(post.getId());
        dto.setCategory(post.getCategory());
        dto.setDescription(post.getDescription());
        dto.setTitle(post.getTitle());
        dto.setStatus(post.getStatus());
        dto.setLocation(post.getLocation());
        dto.setExpectedDuration(post.getExpectedDuration());
        dto.setOwnerName(post.getOwner().getName());
        dto.setVisibility(post.getVisibility());
        dto.setTeamSize(post.getTeamSize());



        Set<RequiredRoleDto> roles=new HashSet<>();

        if(post.getRequiredRoles()!=null){
            for(RequiredRole role : post.getRequiredRoles()) {

                RequiredRoleDto rdto = new RequiredRoleDto();
                rdto.setId(role.getId());
                rdto.setRequiredSkills(role.getRequiredSkills());
                rdto.setRoleName(role.getRoleName());
                roles.add(rdto);
            }
        }
        dto.setRequiredRoleDto(roles);
        return dto;



    }

//shows post with open status only and excluding projects of same logged in user
public List<ProjectPostDto> getAllOpenPosts(String currentUserEmail) {

    List<ProjectPost> posts =
            projectPostRepository.findOpenPublicProjectsExcludingOwner(
                    "PUBLIC",
                    "OPEN",
                    currentUserEmail
            );

    return posts.stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
}




    public ProjectPostDto getProjectPostById(Long id) {
        ProjectPost project = projectPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));


        return mapToDto(project);
    }

    @Transactional

    public ProjectPostDto updateVisibility(Long projectId, String ownerEmail, String newVisibility) {

        ProjectPost post = projectPostRepository.findById(projectId)

                .orElseThrow(() -> new RuntimeException("Project not found"));



        if (!post.getOwner().getEmail().equals(ownerEmail)) {

            throw new RuntimeException("Not authorized to change visibility");

        }



        post.setVisibility(newVisibility.toUpperCase());

        ProjectPost saved = projectPostRepository.save(post);

        return mapToDto(saved);

    }
//searches project with keyword when that word is mentioned in that project title desc,skill anything mentioned in repo
    public List<ProjectPostDto> searchProject(String keyword,String currentUserEmail) {
        //checking if user searched empty keyword
        // .trim() makes sure all white spaces before or after word are remover but not removing whitespace between two texts
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllOpenPosts(currentUserEmail);
        }

        List<ProjectPost> search=projectPostRepository.searchProjects(keyword.trim());





    return search.stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
}
}
