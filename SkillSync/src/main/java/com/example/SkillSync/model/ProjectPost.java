package com.example.SkillSync.model;

import jakarta.persistence.GeneratedValue;
import lombok.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="ProjectPosts")
public class ProjectPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String description;


    @Column(nullable = false)
    private String status; // "OPEN", "CLOSED"


    @Column(nullable = false)
    private String category;// "HACKATHON", "STARTUP"


    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String expectedDuration;

    @Column(nullable = false)
    private int teamSize;

    @Column(nullable = false)
    private String visibility;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    // We'll add the link to RequiredRole later.
    @OneToMany(mappedBy = "projectPost",
            cascade = CascadeType.ALL)
    private Set<RequiredRole> requiredRoles = new HashSet<>();

    @OneToMany(mappedBy = "projectPost", cascade = CascadeType.ALL)
    private Set<Application> applications = new HashSet<>();

}