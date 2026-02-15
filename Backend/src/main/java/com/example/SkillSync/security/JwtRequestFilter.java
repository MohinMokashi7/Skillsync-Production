package com.example.SkillSync.security;// ... imports ...
import com.example.SkillSync.security.CustomUserDetailsService;
import com.example.SkillSync.security.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    // 1. The tools we need
    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;

    // 2. The constructor to inject them
    public JwtRequestFilter(JwtTokenProvider tokenProvider,
                            CustomUserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }

    // 3. The main bouncer logic (we'll do this next)
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

//        FIX: clear previous user
        SecurityContextHolder.clearContext();

        // 1. GET THE TOKEN FROM THE REQUEST HEADER
        String jwt = getJwtFromRequest(request);

        // 2. VALIDATE THE TOKEN
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {

            // 3. GET THE USERNAME (EMAIL) FROM THE TOKEN
            String username = tokenProvider.getUsernameFromToken(jwt);

            // 4. LOAD THE USER FROM THE DATABASE (THE "FRESH" CHECK)
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // 5. CREATE THE "OFFICIAL ID CARD" (Authentication object)
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // 6. GIVE THE "VIP PASS" TO SPRING. (THIS IS THE "LOGIN")
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // 7. "MOVE ALONG." Let the request continue to the controller.
        filterChain.doFilter(request, response);
    }

    // --- This is a helper method to get the "Bearer" token ---
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        // Check if the header is not null AND starts with "Bearer "
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            // Return just the token part (cut off "Bearer ")
            return bearerToken.substring(7);
        }
        return null;
    }
}