package com.example.SkillSync.service;

import com.example.SkillSync.dto.ApplicationRequestDto;
import com.example.SkillSync.dto.ApplicationResponseDto;
import com.example.SkillSync.dto.TeamMemberDto;
import com.example.SkillSync.model.Application;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.RequiredRole;
import com.example.SkillSync.model.User;
import com.example.SkillSync.repository.ApplicationRepository;
import com.example.SkillSync.repository.ProjectPostRepository;
import com.example.SkillSync.repository.RequiredRoleRepository;
import com.example.SkillSync.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
//all about applications
@Service
@AllArgsConstructor
public class ApplicationService {

    private final  UserRepository userRepository;
    private final  ProjectPostRepository projectPostRepository;
    private final  RequiredRoleRepository requiredRoleRepository;
    private final ApplicationRepository applicationRepository;


    // Helper Method: Convert Application Entity -> Response DTO
    private ApplicationResponseDto mapToDto(Application app) {
        ApplicationResponseDto dto = new ApplicationResponseDto();
        dto.setProjectId(app.getProjectPost().getId());
        dto.setProjectTitle(app.getProjectPost().getTitle());
        dto.setApplicationId(app.getId());
        dto.setApplicantName(app.getApplicant().getName());
        dto.setRoleName(app.getRequiredRole().getRoleName());
        dto.setMatchScore(app.getMatchscore());
        dto.setStatus(app.getStatus());
        dto.setCoverLetter(app.getCoverletter());
        if (app.getApplicant().getUserProfile() != null) {
            dto.setApplicantSkills(app.getApplicant().getUserProfile().getSkills());
        } else {
            dto.setApplicantSkills(new HashSet<>()); // Return empty list if no profile
        }



        return dto;
    }
 //apply for project as user
    public ApplicationResponseDto applyToProject(String email,long projectid,ApplicationRequestDto requestDto){

        User applicant= userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
        ProjectPost project=projectPostRepository.findById(projectid).orElseThrow(()->new RuntimeException("project not found"));
        RequiredRole role=  requiredRoleRepository.findById(requestDto.getRequiredRoleId()).orElseThrow(()->new RuntimeException("role not found"));


        //check if owner of project applying to his own project
        if(project.getOwner().getId()== applicant.getId()){
            throw new RuntimeException("You are project owner , you cant apply for your project itself");
        }

        //check if applicant already applied for this project so double applications not happens
        if(applicationRepository.existsByApplicantAndProjectPost(applicant,project)){
            throw new RuntimeException("alreay applied for this project ");
        }


        Set<String> userSkills = (applicant.getUserProfile() != null)
                ? applicant.getUserProfile().getSkills()     //if true this line
                : new HashSet<>();         //if false this line

        Set<String> requiredSkills = role.getRequiredSkills();

        long matchingskillcount=requiredSkills.stream()
                .filter(skill->userSkills.contains(skill))
                .count();

        //{the everyskill from required skill will come one by one from stream and stored in skill one by one then we check if that skill is present in userskill and if yes then we count that}

        /*long count = 0;
for (String skill : requiredSkills) {
    if (userSkills.contains(skill)) {
        count++;
    }
}*/ //normal code for strem part

        double requiredskill=requiredSkills.size();

        //now do calculation to calculate score of applicant on based on his skills
        double applicantscore;
        if(requiredskill==0){
            applicantscore=100;
        }
        else{
            applicantscore= (matchingskillcount/requiredskill)*100;
        }

        Application application=new Application();
        application.setApplicant(applicant);
        application.setCoverletter(requestDto.getCoverLetter());
        application.setProjectPost(project);
        application.setRequiredRole(role);
        application.setMatchscore(applicantscore);
        application.setStatus("PENDING");


        Application savedapplication=applicationRepository.save(application);

        ApplicationResponseDto result=mapToDto(savedapplication);

        return result;


    }



//see all applications for your project post as owner of project
    public List<ApplicationResponseDto> getAllApplications(String ownerEmail,Long projectid){

        ProjectPost post = projectPostRepository.findById(projectid)
                .orElseThrow(()-> new RuntimeException("project with this id not found"));

        if(!post.getOwner().getEmail().equals(ownerEmail)){
            throw new RuntimeException("You are not Owner of this post you cant see applications ");
        }

        List<Application> applications=applicationRepository.findByProjectPostId(projectid);

        return applications.stream()
                .sorted(Comparator.comparingDouble(Application::getMatchscore).reversed())
                .map(this::mapToDto)
                .collect(Collectors.toList());


    }


    public void recalculateProjectStatus(ProjectPost project) {

        long acceptedCount = applicationRepository
                .countByProjectPostIdAndStatus(project.getId(), "ACCEPTED");

        if (acceptedCount >= project.getTeamSize()) {
            project.setStatus("CLOSED");
        } else {
            project.setStatus("OPEN");
        }
    }

    public void updateApplicationStatus(String ownerEmail, Long applicationId, String status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ProjectPost project = application.getProjectPost();

        if (!project.getOwner().getEmail().equals(ownerEmail)) {
            throw new RuntimeException("You are not authorized to update this application");
        }

        application.setStatus(status.toUpperCase());
        applicationRepository.save(application);

        //  Always recalculate
        recalculateProjectStatus(project);

        projectPostRepository.save(project);
    }
// see all projects for which you have applied as normal user (JOINER)
    public List<ApplicationResponseDto> getMyApplications(String applicantEmail){
       List<Application>  myapplications=applicationRepository.findByApplicantEmail(applicantEmail);



       return myapplications.stream()
               .map(myapp->mapToDto(myapp))
               .collect(Collectors.toList());






    }




}
