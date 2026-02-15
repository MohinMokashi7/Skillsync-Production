package com.example.SkillSync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="NoticeBoard")
public class NoticeBoard {










    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String notice;

    LocalDateTime timestamp;
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectPost projectPost;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

}
