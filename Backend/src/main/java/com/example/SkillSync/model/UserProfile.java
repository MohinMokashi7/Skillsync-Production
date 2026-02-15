package com.example.SkillSync.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="UserProfiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String bio;


    private  String location;

    private String college;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_skills",
                      joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "skills") //
    private Set<String> skills;


    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "interested_category",
            joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "category")
    private Set<String> interestedCategories;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
