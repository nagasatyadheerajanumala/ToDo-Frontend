# 📝 To-Do App – Frontend

This is the **frontend** of the full-stack To-Do Application. It is built with **React.js**, and interacts with a secure **Spring Boot** backend using REST APIs. Users can register, log in, create projects, manage tasks, and track progress through a clean, user-friendly interface.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📁 Project and Task Management
- ✅ Create / Update / Delete tasks
- 🔄 Real-time UI Updates
- 💡 Component-based Design
- 📱 Responsive and Mobile-Friendly
- 🌐 Integrated with secure backend APIs

---

## 🖼️ UI Preview (Optional)

_Add screenshots here once the UI is complete._

---

## 📁 Folder Structure

```text
todo-frontend
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── assets
│   │   └── (images, logos, styles)
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard
│   │   │   ├── TaskList.jsx
│   │   │   └── ProjectList.jsx
│   │   └── Shared
│   │       ├── Header.jsx
│   │       └── Loader.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── services
│   │   └── api.js          # Axios API wrapper
│   ├── utils
│   │   └── auth.js         # JWT/token helpers
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .env
├── package.json
└── README.md
```



**API Endpoints**
Base URL: http://localhost:8080/api

POST   /auth/register      → Register user
POST   /auth/login         → Authenticate user
GET    /projects           → Get all projects
POST   /projects           → Create a new project
GET    /tasks              → Get tasks by project
POST   /tasks              → Create a new task
PUT    /tasks/{id}         → Update task
DELETE /tasks/{id}         → Delete task

1. **Clone the repo**
- git clone https://github.com/yourusername/todo-frontend.git
- cd todo-frontend

2. **Run The App**
- npm start

3. **Build for Production**
- npm run build