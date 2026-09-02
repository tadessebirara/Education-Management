// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "admin" | "registrar" | "instructor" | "finance" | "student";
  roleId: number;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  instructor?: Instructor;
}

// Student related types
export interface Student {
  id: number;
  userId: number;
  studentId: string;
  dateOfBirth?: string;
  gender?: string;
  guardianName?: string;
  guardianPhone?: string;
  address?: string;
  programId?: number;
  currentAcademicYear?: string;
  enrollmentStatus: "active" | "graduated" | "suspended" | "inactive";
  registrationDate: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  program?: Program;
}

// Instructor related types
export interface Instructor {
  id: number;
  userId: number;
  employeeId: string;
  departmentId?: number;
  specialization?: string;
  hireDate: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  department?: Department;
}

// Department types
export interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  headId?: number;
  createdAt: string;
  updatedAt: string;
}

// Program types
export interface Program {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  durationYears: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  department?: Department;
}

// Course types
export interface Course {
  id: number;
  name: string;
  code: string;
  creditHours: number;
  departmentId: number;
  programId?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  department?: Department;
  program?: Program;
}

// Section types
export interface Section {
  id: number;
  name: string;
  courseId: number;
  semesterId: number;
  instructorId?: number;
  departmentId?: number;
  room?: string;
  maxCapacity?: number;
  currentEnrollment: number;
  createdAt: string;
  updatedAt: string;
  course?: Course;
  semester?: Semester;
  instructor?: User;
  department?: Department;
}

// Semester types
export interface Semester {
  id: number;
  name: string;
  academicYearId: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  academicYear?: AcademicYear;
}

// Academic Year types
export interface AcademicYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
}

// Enrollment types
export interface Enrollment {
  id: number;
  studentId: number;
  sectionId: number;
  semesterId: number;
  enrollmentDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  section?: Section;
  semester?: Semester;
}

// Attendance types
export interface Attendance {
  id: number;
  studentId: number;
  sectionId: number;
  date: string;
  status: "Present" | "Absent" | "Late" | "Excused";
  instructorId: number;
  submittedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  section?: Section;
  instructor?: User;
}

// Assessment types
export interface Assessment {
  id: number;
  sectionId: number;
  name: string;
  type: "Assignment" | "Quiz" | "Midterm" | "Final" | "Practical";
  weight: number;
  maxMarks: number;
  dueDate?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  section?: Section;
}

// Grade types
export interface Grade {
  id: number;
  enrollmentId: number;
  assessmentId: number;
  marksObtained: number;
  totalMarks: number;
  gradePoint?: number;
  letterGrade?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  enrollment?: Enrollment;
  assessment?: Assessment;
}

// Fee Record types
export interface FeeRecord {
  id: number;
  studentId: number;
  semesterId: number;
  totalFees: number;
  paidAmount: number;
  remainingBalance: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  semester?: Semester;
  payments?: Payment[];
}

// Payment types
export interface Payment {
  id: number;
  feeRecordId: number;
  amount: number;
  paymentDate: string;
  referenceNumber?: string;
  paymentMethod: string;
  receivedBy: number;
  receiptNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  feeRecord?: FeeRecord;
  receiver?: User;
}

// Timetable types
export interface Timetable {
  id: number;
  sectionId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
  createdAt: string;
  updatedAt: string;
  section?: Section;
}

// Announcement types
export interface Announcement {
  id: number;
  title: string;
  content: string;
  authorId: number;
  targetRoles: string[];
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: User;
}

// Notification types
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  readAt?: string;
  link?: string;
  createdAt: string;
  user?: User;
}

// Audit Log types
export interface AuditLog {
  id: number;
  userId: number;
  action: string;
  resourceType: string;
  resourceId?: number;
  changes?: any;
  ipAddress?: string;
  userAgent?: string;
  status: string;
  createdAt: string;
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  status: "success" | "error";
  data?: T;
  message?: string;
  errors?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Login types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Dashboard types
export interface DashboardStats {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalSections: number;
  todayClasses: number;
  pendingTasks: number;
  notifications: number;
}

export interface TodayClass {
  time: string;
  course: string;
  room: string;
  section: string;
  students: number;
}

export interface PendingTask {
  title: string;
  overdue?: boolean;
  days?: number;
  due?: string;
}

export interface RecentActivity {
  action: string;
  time: string;
}
