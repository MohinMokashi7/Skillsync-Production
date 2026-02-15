package com.example.SkillSync.repository;

import com.example.SkillSync.model.User;
import com.example.SkillSync.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    List<UserProfile> findBySkillsContaining(String skills);


}