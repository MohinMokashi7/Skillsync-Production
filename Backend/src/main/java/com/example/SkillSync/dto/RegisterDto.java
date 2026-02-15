package com.example.SkillSync.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "Email is required")
    private  String email;
    @NotBlank(message = "password is required")
    private String password;
    @NotBlank(message = "phone is required")
    private String phone ;

}
