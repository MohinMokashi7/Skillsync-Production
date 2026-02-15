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
@Table(name="RequiredRole")
public class RequiredRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roleName;


    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "required_skills", joinColumns = @JoinColumn(name = "role_id"))
    @Column(name = "skill")
    private Set<String> requiredSkills;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_post_id", nullable = false)
    private ProjectPost projectPost;

    @OneToMany(mappedBy = "requiredRole", cascade = CascadeType.ALL)
    private Set<Application> applications = new HashSet<>();

}