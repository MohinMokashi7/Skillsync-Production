package com.example.SkillSync.dto;

import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NoticeBoardDto {
    Long id;

    String notice;

    LocalDateTime timestamp;

    private String ownerName;
}