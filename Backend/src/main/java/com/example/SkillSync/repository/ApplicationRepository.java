package com.example.SkillSync.repository;

import com.example.SkillSync.model.Application;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.RequiredRole;
import com.example.SkillSync.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByMatchscoreGreaterThan(Double score);

    List<Application> findByProjectPostId(Long projectId);

    boolean existsByApplicantAndProjectPost(User applicant, ProjectPost projectPost);

    List<Application> findByApplicantEmail(String email);
    long countByProjectPostIdAndStatus(Long projectId , String status);
    List<Application> findByProjectPostIdAndStatus(Long projectId , String status);

    boolean existsByProjectPostAndApplicantAndStatus(ProjectPost project, User requester, String accepted);

    List<Application> findByProjectPostAndStatus(ProjectPost project, String accepted);
}