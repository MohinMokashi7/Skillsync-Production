package com.example.SkillSync.repository;

import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.User;
import com.example.SkillSync.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectPostRepository extends JpaRepository<ProjectPost, Long> {


    @Query("SELECT DISTINCT p FROM ProjectPost p " +
            "LEFT JOIN p.requiredRoles r " +
            "LEFT JOIN r.requiredSkills s " +
            "WHERE ( " +
            "    LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "    LOWER(CAST(p.description AS String)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "    LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "    LOWER(p.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "    LOWER(r.roleName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "    LOWER(s) LIKE LOWER(CONCAT('%', :keyword, '%')) " + // <--- FIXED: 's' is the string itself
            ") " +
            "AND p.status = 'OPEN' " +
            "AND p.visibility = 'PUBLIC'")

    List<ProjectPost> searchProjects(@Param("keyword") String keyword);

    List<ProjectPost> findByCategory(String category);
    List<ProjectPost> findByVisibilityAndStatus(String visibility,String status);
    List<ProjectPost> findByOwnerEmail(String email);

}