package com.example.SkillSync.service;

import com.example.SkillSync.dto.NoticeBoardDto;
import com.example.SkillSync.model.NoticeBoard;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.User;
import com.example.SkillSync.repository.ApplicationRepository;
import com.example.SkillSync.repository.NoticeBoardRepository;
import com.example.SkillSync.repository.ProjectPostRepository;
import com.example.SkillSync.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Data
@AllArgsConstructor
public class NoticeBoardService {
    private final UserRepository userRepository;
    private final ProjectPostRepository projectPostRepository;
    private final NoticeBoardRepository noticeBoardRepository;
    private final ApplicationRepository applicationRepository;
    public NoticeBoardDto postNotice(Long projectId, String email, String notice) {
        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProjectPost project = projectPostRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Only Owner can post
        if (project.getOwner().getId() != owner.getId()) {
            throw new RuntimeException("ACCESS DENIED: Only the project owner can post notices.");
        }

        NoticeBoard noticeBoard = new NoticeBoard();
        noticeBoard.setNotice(notice);
        noticeBoard.setTimestamp(LocalDateTime.now());
        noticeBoard.setProjectPost(project);
        noticeBoard.setOwner(owner);

        NoticeBoard saved = noticeBoardRepository.save(noticeBoard);

        // Convert to DTO
        NoticeBoardDto dto = new NoticeBoardDto();
        dto.setId(saved.getId());
        dto.setNotice(saved.getNotice());
        dto.setOwnerName(owner.getName());
        dto.setTimestamp(saved.getTimestamp());
        return dto;
    }

    // 2. Get Notices (Owner + Team Only)
    public List<NoticeBoardDto> getProjectNotices(Long projectId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProjectPost project = projectPostRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Security Check
        boolean isOwner = project.getOwner().getId() == user.getId();
        boolean isTeamMember = applicationRepository.existsByProjectPostAndApplicantAndStatus(project, user, "ACCEPTED");

        if (!isOwner && !isTeamMember) {
            throw new RuntimeException("ACCESS DENIED: You are not part of this team.");
        }

        return noticeBoardRepository.findByProjectPostOrderByTimestampDesc(project).stream()
                .map(notice -> {
                    NoticeBoardDto dto = new NoticeBoardDto();
                    dto.setId(notice.getId());
                    dto.setNotice(notice.getNotice());
                    dto.setOwnerName(notice.getOwner().getName());
                    dto.setTimestamp(notice.getTimestamp());
                    return dto;
                }).collect(Collectors.toList());
    }
}


