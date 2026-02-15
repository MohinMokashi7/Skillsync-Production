package com.example.SkillSync.controller;

import com.example.SkillSync.dto.NoticeBoardDto;
import com.example.SkillSync.service.NoticeBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeBoardController {

    private final NoticeBoardService noticeService;

    @PostMapping("/{projectId}")
    public ResponseEntity<NoticeBoardDto> createNotice(@PathVariable Long projectId,
                                                  @RequestBody String content,
                                                  Principal principal) {
        return ResponseEntity.ok(noticeService.postNotice(projectId, principal.getName(), content));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<NoticeBoardDto>> getNotices(@PathVariable Long projectId,
                                                      Principal principal) {
        return ResponseEntity.ok(noticeService.getProjectNotices(projectId, principal.getName()));
    }
}