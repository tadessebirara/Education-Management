# 🎓 Education Management System (EMS)


## screenshot


<img width="1355" height="636" alt="image" src="https://github.com/user-attachments/assets/c85dab00-b815-42dd-ba60-fdf1c2c048be" />


### A Production-Ready Education Management System for Ethiopian Private Colleges

---

## 📋 Overview

The **Education Management System (EMS)** is a comprehensive web-based platform designed to digitize and streamline academic and administrative operations for private colleges in Ethiopia. Built with modern technologies, it centralizes student management, course administration, attendance tracking, grade management, fee processing, and reporting.

### 🎯 Core Objectives

- Centralize academic information management
- Digitize student registration and enrollment
- Enable reliable digital attendance tracking
- Streamline assessment and grade management
- Provide role-based access with secure authentication
- Generate comprehensive academic and administrative reports

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **TypeScript 5** | Type Safety |
| **Vite 5** | Build Tool |
| **Tailwind CSS 4** | Styling |
| **React Router DOM 7** | Routing |
| **React Hook Form + Zod** | Form Handling & Validation |
| **Lucide React** | Icons |
| **Recharts** | Data Visualization |
| **React Hot Toast** | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 20** | Runtime |
| **Express.js 5** | Web Framework |
| **TypeScript 5** | Type Safety |
| **PostgreSQL 14** | Database |
| **Prisma 6** | ORM |
| **JWT + Argon2** | Authentication & Security |
| **Helmet + Cors** | Security Middleware |

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Registrar, Instructor, Student, Finance)
- Secure password hashing with Argon2
- Session management & account activation

### 👨‍🎓 Student Management
- Complete CRUD operations with search & filter
- Student profiles with academic information
- Enrollment history tracking
- Guardian/emergency contact management

### 📚 Academic Structure
- Department & Program management
- Course management with credit hours
- Section management with instructor assignment
- Semester & academic year tracking

### 📝 Enrollment Management
- Student enrollment in sections
- Enrollment history & status tracking
- Drop/withdraw functionality

### 📊 Attendance System
- Digital attendance recording (Present, Absent, Late, Excused)
- Attendance percentage calculation
- Low attendance monitoring
- Comprehensive attendance reports

### 📈 Assessment & Grade Management
- Multiple assessment types (Assignment, Quiz, Midterm, Final)
- Configurable weights & grade calculation
- Grade publishing & viewing
- Audit logging for grade changes

### 🕐 Timetable Management
- Course scheduling with conflict detection
- Role-based timetable viewing

### 💰 Fee & Payment Management
- Student fee assignment & tracking
- Payment recording with references
- Balance tracking & financial reporting

### 📢 Announcements & Notifications
- Role-based announcement publishing
- In-application notifications

### 📊 Reports & Analytics
- Student, attendance, grade, and financial reports
- Export capabilities (PDF, Excel, CSV)

### 🔒 Security & Audit
- Comprehensive audit logging
- Input validation & secure queries
- HTTPS enforcement

---

## 👥 Role-Based Access Control

| Role | Access Level | Key Permissions |
|------|--------------|-----------------|
| **Admin** | Full System Access | Users, Departments, Programs, All CRUD operations |
| **Registrar** | Academic Management | Students, Courses, Sections, Enrollments |
| **Instructor** | Teaching Activities | My Courses, Attendance, Assessments, Grades |
| **Finance** | Financial Management | Fees, Payments, Financial Reports |
| **Student** | Personal Data | My Courses, Timetable, Grades, Fees |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Tadesse103/ems-ethiopia-college.git
cd ems-ethiopia-college

# Backend setup
cd back-end
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Frontend setup
cd front-end
npm install

# Start development servers
# Backend: npm run dev (port 5000)
# Frontend: npm run dev (port 5173)
```

### Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@ems.edu` | `Admin@2026` |
| Instructor | `anderson@ems.edu` | `Instructor@2026` |
| Student | `student1@ems.edu` | `Student@2026` |
| Registrar | `registrar@ems.edu` | `Registrar@2026` |
| Finance | `finance@ems.edu` | `Finance@2026` |

---

## 📁 Project Structure

```
├── back-end/
│   ├── prisma/          # Database schema
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & validation
│   │   └── services/    # Business services
│   └── .env             # Environment variables
│
├── front-end/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utilities
│   └── .env             # Environment variables
│
└── README.md
```

---

## 📚 API Endpoints

| Category | Endpoint | Method | Description |
|----------|----------|--------|-------------|
| **Auth** | `/api/auth/login` | POST | User login |
| | `/api/auth/profile` | GET | Get user profile |
| **Students** | `/api/students` | GET/POST | List/Create students |
| | `/api/students/:id` | GET/PUT/DELETE | Manage student |
| **Courses** | `/api/courses` | GET/POST | List/Create courses |
| | `/api/courses/:id` | GET/PUT/DELETE | Manage course |
| **Attendance** | `/api/attendance/record` | POST | Record attendance |
| | `/api/attendance` | GET | View attendance |
| **Grades** | `/api/grades` | POST | Create grade |
| | `/api/grades/:id` | PUT | Update grade |
| **Fees** | `/api/fees` | GET/POST | Manage fees |
| | `/api/payments` | GET/POST | Record payments |

---

## 🚢 Deployment

### Docker
```bash
docker-compose up -d
```

### Production Build
```bash
# Backend
cd back-end && npm run build && npm start

# Frontend
cd front-end && npm run build
# Serve dist/ folder with your web server
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to branch (`git push origin feature/feature-name`)
5. Open a Pull Request

---

## 📄 License

© 2026 Tadesse Birara. All rights reserved.

---

## 📞 Contact

- **GitHub:**  (https://github.com/Tadessebirara)
- **Repository:**  https://github.com/tadessebirara/Education-Management.git
  

**Built with ❤️ for   Educational institutions specially for private educational institutions with user friendly way  **
