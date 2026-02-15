package com.example.SkillSync.repository;

import com.example.SkillSync.model.RequiredRole;
import com.example.SkillSync.model.User;
import com.example.SkillSync.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequiredRoleRepository extends JpaRepository<RequiredRole, Long> {

    List<RequiredRole> findByRoleName(String roleName);

}