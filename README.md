🚀 SkillSync – Intelligent Team Formation Platform

SkillSync is a full-stack web application designed to help students and developers build skill-based teams for hackathons, startups, and academic projects.

Instead of forming teams randomly, SkillSync allows project owners to define required roles and skills, while applicants apply for specific roles based on their expertise. The platform automatically calculates a skill match score and manages team formation dynamically.

🧠 Problem It Solves

Forming effective teams for hackathons or projects is often chaotic and unstructured. SkillSync provides:

Structured team creation

Skill-based role matching

Automated application handling

Controlled project visibility

Transparent approval workflow

✨ Key Features

🔐 JWT-based authentication & secure API access

👤 User profile management with skills & interests

📝 Project creation with multiple required roles

📊 Automatic skill-match scoring for applications

✅ Owner-based approval system (Accept / Reject)

🔒 Public & Unlisted project visibility

🔍 Advanced search across title, description, roles & skills

🔁 Automatic project closure when team capacity is reached

👥 Team member retrieval after acceptance

🌐 Fully deployed full-stack application

🏗 Tech Stack
Backend

Java 17

Spring Boot

Spring Security

JWT Authentication

Spring Data JPA (Hibernate)

MySQL

Frontend

React

Vite

React Router

Axios

TailwindCSS

🔑 Authentication Flow

User registers

Logs in using email or phone

Receives JWT token

Token stored in browser

All protected APIs require Authorization: Bearer <token>

📌 Core Functional Workflow

User creates a project with defined team size and required roles.

Other users apply for specific roles.

Skill match score is calculated automatically.

Project owner reviews applications.

Accepted applications become team members.

Project automatically closes when team size is reached.

📂 API Overview
Auth

POST /api/auth/register

POST /api/auth/login

Profile

GET /api/about/profile

PUT /api/about/profile

Projects

POST /api/projects

GET /api/projects

GET /api/projects/search?keyword=

GET /api/projects/my-projects

PATCH /api/projects/{id}/visibility

Applications

POST /api/applications/{projectId}/apply

GET /api/applications/{projectId}

PUT /api/applications/{applicationId}/status

GET /api/applications/My-applications

Team

GET /api/team/{projectId}/team

📈 Project Status

This is Phase 1 (MVP).

Planned Future Enhancements:

🏅 Karma / Reputation System

🔔 Real-time Notifications

💬 Team collaboration tools

📧 Email Verification

📹 Video Collaboration Tools

🎯 Purpose of This Project

This project was built to:

Strengthen full-stack development skills

Implement secure authentication workflows

Design real-world project management logic

Practice clean API design and role-based access

Deploy and test with real users

🌐 Live Demo

🔗 https://skillsync-production.vercel.app/

🤝 Feedback

This project is actively being improved.
Feedback, suggestions, and issue reports are always welcome.

⭐ If you like the project, consider starring the repo!
