git add README.md
git commit -m "Finalize project README"
git push origin main# InterviewPrep AI

A full-stack interview preparation platform designed to help students organize company-specific interview questions, track DSA preparation, save important questions, maintain personal notes, manage resumes, and monitor their preparation progress.

## 🌐 Live Demo

**Frontend:** https://interviewprep-ai-frontend.vercel.app

**Backend API:** https://interviewprep-ai-d62i.onrender.com

---

## 🚀 Features

### 🔐 JWT Authentication

- User signup and login
- Protected routes
- JWT-based authentication
- HTTP-only cookie-based authentication
- Logout functionality
- Persistent login sessions

### 💼 Company-wise Interview Questions

- Practice company-specific interview questions
- Search questions by company
- Filter questions by difficulty
- Filter questions by topic
- View question answers and details

### 🔖 Bookmarks

- Save important interview questions
- View all bookmarked questions
- Remove questions from bookmarks
- User-specific bookmark persistence

### ✅ Solved Questions

- Mark interview questions as solved
- View solved questions
- Remove questions from solved list
- Track interview preparation progress

### 📚 DSA Tracker

- Track DSA preparation topics
- Mark topics as completed
- Maintain revision counts
- Reset topic progress
- User-specific progress persistence

### 📝 Personal Notes

- Create personal preparation notes
- Edit existing notes
- Delete notes
- Automatically track note creation and update timestamps
- Store notes securely per user

### 📄 Resume Management

- Upload resumes in PDF, DOC, and DOCX formats
- Store resume information for the authenticated user
- View the uploaded resume
- Replace the existing resume
- File upload handling using Multer

### 📊 Dashboard

- View overall preparation statistics
- Track solved questions
- Track bookmarked questions
- View total companies and questions
- Monitor personal notes
- Check resume upload status
- View preparation progress
- Quick navigation to major application modules

### 👤 User Profile

- View profile information
- Update name
- Update target role
- Manage personal account information

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MySQL
- JWT
- Cookie-based authentication
- Multer
- REST APIs
- CORS

### Database

- MySQL
- Relational database design
- User-specific persistent data

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Aiven MySQL

---

## 🏗️ Project Architecture

The application follows a client-server architecture.

```text
                         ┌─────────────────────┐
                         │      React UI       │
                         │  React + Tailwind   │
                         └──────────┬──────────┘
                                    │
                                  Axios
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Express API      │
                         │      Node.js        │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
             Controllers         Models          Middleware
                  │                 │                 │
                  └─────────────────┼─────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       MySQL         │
                         │      Database       │
                         └─────────────────────┘

## Development Notes
- Improved interview question interactions and user feedback.

