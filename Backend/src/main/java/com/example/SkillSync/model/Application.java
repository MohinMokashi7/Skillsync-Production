package com.example.SkillSync.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(columnDefinition = "TEXT")
    private String coverletter;

    @Column(nullable = false)
    private String status; // complete pending

    private Double matchscore;

    // LINK 1: The User (Joiner) who is applying
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_user_id", nullable = false)
    private User applicant;

    // LINK 2: The Post they applied to
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_post_id", nullable = false)
    private ProjectPost projectPost;

    // LINK 3: The specific Role they want
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "required_role_id", nullable = false)
    private RequiredRole requiredRole;

}