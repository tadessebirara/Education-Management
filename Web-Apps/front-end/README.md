# 🎓 Education Management System (EMS)

### A Comprehensive Education Management System for Ethiopian Private Colleges


## 📖 Overview

The **Education Management System (EMS)** is a production-ready, SaaS-oriented web application designed to digitally manage the core academic and administrative activities of private colleges in Ethiopia. This system centralizes student management, instructor management, academic structure, enrollment, digital attendance, assessment and grades, fee tracking, timetables, announcements, reports, and audit logging.

### 🎯 Key Objectives

- Centralize college academic information
- Digitize student registration and enrollment
- Provide reliable digital attendance
- Enable instructors to manage assigned academic activities
- Allow students to access their own academic information
- Provide administrators with operational dashboards
- Reduce paper and spreadsheet dependency
- Improve data accuracy and transparency
- Provide secure role-based access
- Generate useful academic and administrative reports



## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-based access control (RBAC)
- Password hashing with Argon2
- Account activation/deactivation
- Session management
- Failed-login protection

### 👨‍🎓 Student Management
- Complete CRUD operations
- Student profile with personal and academic information
- Guardian/emergency contact management
- Enrollment history tracking
- Advanced search and filtering

### 👨‍🏫 Instructor Management
- Complete CRUD operations
- Course assignment management
- Specialization and department tracking

### 📚 Academic Structure
- Department management
- Program management
- Course management with credit hours
- Section management
- Semester and academic year management

### 📝 Enrollment Management
- Student enrollment in sections
- Enrollment history tracking
- Drop/withdraw functionality
- Capacity management

### 📊 Attendance System
- Digital attendance recording (Present, Absent, Late, Excused)
- Attendance percentage calculation
- Low attendance monitoring
- Comprehensive attendance reports
- Audit logging for attendance changes

### 📈 Assessment & Grade Management
- Multiple assessment types (Assignment, Quiz, Midterm, Final, Practical)
- Configurable assessment weights
- Grade calculation (marks, grade points, letter grades)
- Grade publishing and viewing
- Post-publication grade change authorization
- Audit logging for grade changes

### 🕐 Timetable Management
- Course scheduling by day/time/room
- Conflict detection
- Role-based timetable viewing

### 💰 Fee & Payment Management
- Student fee assignment
- Payment recording with references
- Balance tracking
- Financial reporting

### 📢 Announcements & Notifications
- Publish announcements by role
- In-application notifications
- Targeted communication

### 📊 Reports & Analytics
- Student reports (list, profile, enrollment)
- Attendance reports (daily, course, student, percentage, low attendance)
- Academic reports (course results, student results, semester results)
- Financial reports (payment history, outstanding balances)
- Export capabilities (PDF, Excel, CSV)

### 🔒 Security & Audit
- Comprehensive audit logging
- All critical operations logged
- Role-based access enforcement
- Input validation
- Secure database queries


## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 5.x | Build Tool |
| Tailwind CSS | 4.x | Styling |
| React Router DOM | 7.x | Routing |
| React Hook Form | 7.x | Form Handling |
| Zod | 3.x | Validation |
| Lucide React | 0.5.x | Icons |
| React Hot Toast | 2.x | Notifications |
| Recharts | 2.x | Charts & Data Visualization |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x | Runtime |
| Express.js | 5.x | Web Framework |
| TypeScript | 5.x | Type Safety |
| PostgreSQL | 14.x | Database |
| Prisma | 6.x | ORM |
| JWT | 9.x | Authentication |
| Argon2 | 0.45.x | Password Hashing |
| Morgan | 1.x | Logging |
| Helmet | 8.x | Security Headers |
| Cors | 2.x | Cross-Origin Support |

### DevOps & Tools
| Technology | Purpose |
|------------|---------|
| Git | Version Control |
| GitHub | Repository Hosting |
| Docker | Containerization |
| ESLint | Code Quality |
| Prettier | Code Formatting |

---

## 📁 Project Structure

```
Education_Managment_System/
├── back-end/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── src/
│   │   ├── config/                # Configuration files
│   │   ├── controllers/           # Business logic
│   │   │   ├── authController.ts
│   │   │   ├── studentController.ts
│   │   │   ├── courseController.ts
│   │   │   ├── attendanceController.ts
│   │   │   ├── gradeController.ts
│   │   │   └── ...
│   │   ├── middleware/            # Auth, validation
│   │   │   ├── auth.ts
│   │   │   └── validation.ts
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── studentRoutes.ts
│   │   │   ├── courseRoutes.ts
│   │   │   └── ...
│   │   ├── services/              # Business services
│   │   ├── utils/                 # Helpers
│   │   ├── seed.ts                # Database seed
│   │   └── index.ts               # Entry point
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── front-end/
│   ├── src/
│   │   ├── assets/                # Images, fonts
│   │   ├── components/
│   │   │   ├── common/            # Reusable components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── layout/            # Layout components
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Header.tsx
│   │   │   ├── forms/             # Form components
│   │   │   ├── tables/            # Table components
│   │   │   └── charts/            # Chart components
│   │   ├── contexts/              # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── NotificationContext.tsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── usePagination.ts
│   │   ├── pages/                 # Page components
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── InstructorDashboard.tsx
│   │   │   │   ├── RegistrarDashboard.tsx
│   │   │   │   └── StudentDashboard.tsx
│   │   │   ├── students/
│   │   │   │   ├── StudentsList.tsx
│   │   │   │   ├── StudentDetails.tsx
│   │   │   │   ├── AddStudent.tsx
│   │   │   │   └── EditStudent.tsx
│   │   │   ├── courses/
│   │   │   │   ├── CoursesList.tsx
│   │   │   │   ├── CourseDetails.tsx
│   │   │   │   ├── AddCourse.tsx
│   │   │   │   └── EditCourse.tsx
│   │   │   ├── sections/
│   │   │   ├── enrollments/
│   │   │   ├── assessments/
│   │   │   ├── grades/
│   │   │   ├── timetable/
│   │   │   ├── fees/
│   │   │   ├── reports/
│   │   │   ├── announcements/
│   │   │   ├── users/
│   │   │   ├── settings/
│   │   │   └── logs/
│   │   ├── services/              # API services
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── studentService.ts
│   │   │   ├── courseService.ts
│   │   │   └── ...
│   │   ├── types/                 # TypeScript types
│   │   │   ├── index.ts
│   │   │   ├── user.ts
│   │   │   ├── student.ts
│   │   │   └── course.ts
│   │   ├── utils/                 # Utilities
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env                       # Environment variables
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md


## 👥 Role-Based Access Control

### 👑 ADMIN (System Administrator)
```
├── 📊 Dashboard
├── 👥 Users
├── 🏛️ Departments
├── 📚 Programs
├── 👨‍🎓 Students
├── 👨‍🏫 Instructors
├── 📖 Courses
├── 📋 Sections
├── 📅 Timetable
├── 📝 Attendance
├── 📊 Assessments
├── 📈 Reports
├── 🔔 Announcements
├── 📋 System Logs
├── ⚙️ Settings
└── 📁 File Manager
```

### 📋 REGISTRAR
```
├── 📊 Dashboard
├── 👨‍🎓 Students
├── 📚 Programs
├── 📖 Courses
├── 📋 Sections
├── 📝 Enrollments
├── 📅 Timetable
├── 📊 Assessments
├── 📈 Reports
├── 🔔 Announcements
└── 📋 Audit Logs
```

### 👨‍🏫 INSTRUCTOR
```
├── 📊 Dashboard
├── 📖 My Courses
├── 📋 My Sections
├── 📝 Attendance
├── 📊 Assessments
├── 📈 Grades
├── 📅 Timetable
├── 👨‍🎓 Students
├── 🔔 Announcements
└── 📈 Reports
```

### 👨‍🎓 STUDENT
```
├── 📊 Dashboard
├── 📖 My Courses
├── 📅 Timetable
├── 📝 Attendance
├── 📈 Grades
├── 💰 Fees
├── 👤 Profile
├── 🔔 Announcements
└── 📈 My Reports
```

### 💰 FINANCE
```
├── 📊 Dashboard
├── 💰 Fees
├── 💳 Payments
├── 👨‍🎓 Students
├── 📈 Financial Reports
├── 🔔 Announcements
└── 📋 Audit Logs
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- PostgreSQL v14 or higher
- npm or yarn package manager
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/tadessebirara/Education-Management.git
 
#### 2. Set Up Backend
```bash
cd back-end
npm install
cp .env.example .env  # Update with your database credentials
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

#### 3. Set Up Frontend
```bash
cd front-end
npm install
cp .env.example .env  # Update with API URL
```

#### 4. Start Development Servers

**Backend:**
```bash
cd back-end
npm run dev
# Server running at http://localhost:5000
```

**Frontend:**
```bash
cd front-end
npm run dev
# Application running at http://localhost:5173
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development

DATABASE_URL="postgresql://user:password@localhost:5432/ems_db?schema=public"

JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRE=7d

BCRYPT_ROUNDS=10
MAX_LOGIN_ATTEMPTS=5
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=EMS Core
```

### Test Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@ems.edu` | `Admin@2026` |
| **Registrar** | `registrar@ems.edu` | `Registrar@2026` |
| **Instructor** | `anderson@ems.edu` | `Instructor@2026` |
| **Instructor** | `williams@ems.edu` | `Instructor@2026` |
| **Student** | `student1@ems.edu` | `Student@2026` |
| **Student** | `student2@ems.edu` | `Student@2026` |
| **Student** | `student3@ems.edu` | `Student@2026` |
| **Finance** | `finance@ems.edu` | `Finance@2026` |

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| POST | `/api/auth/change-password` | Change password | ✅ |

### Student Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/students` | Get all students | ✅ |
| GET | `/api/students/:id` | Get student by ID | ✅ |
| POST | `/api/students` | Create student | ✅ |
| PUT | `/api/students/:id` | Update student | ✅ |
| DELETE | `/api/students/:id` | Delete student | ✅ |

### Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | ✅ |
| GET | `/api/courses/:id` | Get course by ID | ✅ |
| POST | `/api/courses` | Create course | ✅ |
| PUT | `/api/courses/:id` | Update course | ✅ |
| DELETE | `/api/courses/:id` | Delete course | ✅ |

### Attendance Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/attendance/record` | Record attendance | ✅ |
| GET | `/api/attendance` | Get attendance records | ✅ |
| GET | `/api/attendance/stats` | Get attendance statistics | ✅ |
| GET | `/api/attendance/low-attendance` | Get low attendance students | ✅ |

### Grade Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/grades` | Create grade | ✅ |
| PUT | `/api/grades/:id` | Update grade | ✅ |
| POST | `/api/grades/publish/:assessmentId` | Publish grades | ✅ |
| GET | `/api/grades/student/:studentId` | Get student grades | ✅ |

---

## 🧪 Testing

### Backend Tests
```bash
cd back-end
npm test
```

### Frontend Tests
```bash
cd front-end
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 🚢 Deployment

### Docker Deployment

```bash
# Build and start containers
docker-compose up -d

# Stop containers
docker-compose down
```

### Production Deployment

#### Backend
```bash
cd back-end
npm run build
npm start
```

#### Frontend
```bash
cd front-end
npm run build
# Serve the dist folder with your preferred web server
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for all code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation accordingly

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Ethiopian Private College for providing the requirements
- All contributors and testers
- Open source community for the amazing tools and libraries

---

## 📞 Contact

- **Project Maintainer:** [Tadesse Birara](https://github.com/tadessebirara )
- **Project Repository:** [github.com/Tadesse103/ems-ethiopia-college](https://github.com/tadessebirara/Education-Management)
- **Issue Tracker:** [github.com/Tadesse103/ems-ethiopia-college/issues](https://github.com/tadessebirara/Education-Management/issues)



## 🎯 Roadmap

### Phase 1: Foundation (✅ Complete)
- Authentication & Authorization
- Database setup & seeding
- Basic CRUD operations
- Role-based access control

### Phase 2: Core Features (✅ Complete)
- Student Management
- Course Management
- Section Management
- Enrollment Management

### Phase 3: Academic Features (🟡 In Progress)
- Attendance System
- Assessment & Grade Management
- Timetable Management

### Phase 4: Supporting Features (🔲 Planned)
- Fee & Payment Management
- Reports & Analytics
- Announcements & Notifications
- Advanced Search & Filters
- Export Functionality


**Built with ❤️ for Ethiopian Education**


 **Note:** This project is actively maintained and regularly updated. For the latest features and bug fixes, please check the repository regularly.