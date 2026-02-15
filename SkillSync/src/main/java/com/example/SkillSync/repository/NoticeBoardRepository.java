package com.example.SkillSync.repository;

import com.example.SkillSync.model.NoticeBoard;
import com.example.SkillSync.model.ProjectPost;
import com.example.SkillSync.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeBoardRepository extends JpaRepository<NoticeBoard,Long> {
    List<NoticeBoard> findByProjectPostOrderByTimestampDesc(ProjectPost projectPost);
}
