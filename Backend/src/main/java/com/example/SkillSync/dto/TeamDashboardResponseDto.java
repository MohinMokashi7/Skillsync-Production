package com.example.SkillSync.dto;

import lombok.Data;
import java.util.List;

@Data
public class TeamDashboardResponseDto {
    private boolean owner;
    private List<TeamMemberDto> members;
}
