package com.example.SkillSync.dto; // Your package

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthResponseDto {

    private String accessToken;
    private String tokenType = "Bearer"; // Optional: Standard practice to include type

}