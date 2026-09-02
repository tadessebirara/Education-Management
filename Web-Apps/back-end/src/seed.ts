import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================
  // STEP 1: Clear all existing data
  // ============================================
  console.log("🗑️ Clearing existing data...");

  // Delete in correct order (reverse dependency order)
  await prisma.auditLog.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.feeRecord.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.assessment.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.timetable.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.courseAssignment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.semester.deleteMany({});
  await prisma.academicYear.deleteMany({});
  await prisma.rolePermission.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Database cleared");

  // ============================================
  // STEP 2: Create Roles
  // ============================================
  console.log("📚 Creating roles...");

  const adminRole = await prisma.role.create({
    data: { name: "admin", description: "System Administrator" },
  });
  const registrarRole = await prisma.role.create({
    data: { name: "registrar", description: "Registrar" },
  });
  const instructorRole = await prisma.role.create({
    data: { name: "instructor", description: "Instructor/Lecturer" },
  });
  const financeRole = await prisma.role.create({
    data: { name: "finance", description: "Finance Staff" },
  });
  const studentRole = await prisma.role.create({
    data: { name: "student", description: "Student" },
  });

  console.log("✅ Roles created");

  // ============================================
  // STEP 3: Create Permissions
  // ============================================
  console.log("🔐 Creating permissions...");

  const permissionsData = [
    { name: "manage_users", resource: "users", action: "write" },
    { name: "view_users", resource: "users", action: "read" },
    { name: "manage_students", resource: "students", action: "write" },
    { name: "view_students", resource: "students", action: "read" },
    { name: "manage_courses", resource: "courses", action: "write" },
    { name: "view_courses", resource: "courses", action: "read" },
    { name: "record_attendance", resource: "attendance", action: "write" },
    { name: "view_attendance", resource: "attendance", action: "read" },
    { name: "manage_grades", resource: "grades", action: "write" },
    { name: "view_grades", resource: "grades", action: "read" },
    { name: "manage_fees", resource: "fees", action: "write" },
    { name: "view_fees", resource: "fees", action: "read" },
    { name: "generate_reports", resource: "reports", action: "write" },
    { name: "view_reports", resource: "reports", action: "read" },
    { name: "view_audit_logs", resource: "audit", action: "read" },
    {
      name: "manage_announcements",
      resource: "announcements",
      action: "write",
    },
    { name: "view_announcements", resource: "announcements", action: "read" },
  ];

  const permissions = [];
  for (const permData of permissionsData) {
    const perm = await prisma.permission.create({ data: permData });
    permissions.push(perm);
  }

  console.log("✅ Permissions created");

  // ============================================
  // STEP 4: Assign Permissions to Roles
  // ============================================
  console.log("🔗 Assigning permissions to roles...");

  // Admin gets all permissions
  for (const perm of permissions) {
    await prisma.rolePermission.create({
      data: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
    });
  }

  // Registrar permissions
  const registrarPerms = [
    "view_users",
    "manage_students",
    "view_students",
    "view_courses",
    "view_attendance",
    "view_grades",
    "view_fees",
  ];
  for (const permName of registrarPerms) {
    const perm = permissions.find((p) => p.name === permName);
    if (perm) {
      await prisma.rolePermission.create({
        data: {
          roleId: registrarRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // Instructor permissions
  const instructorPerms = [
    "view_courses",
    "record_attendance",
    "view_attendance",
    "manage_grades",
    "view_grades",
  ];
  for (const permName of instructorPerms) {
    const perm = permissions.find((p) => p.name === permName);
    if (perm) {
      await prisma.rolePermission.create({
        data: {
          roleId: instructorRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // Finance permissions
  const financePerms = ["manage_fees", "view_fees", "view_reports"];
  for (const permName of financePerms) {
    const perm = permissions.find((p) => p.name === permName);
    if (perm) {
      await prisma.rolePermission.create({
        data: {
          roleId: financeRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // Student permissions
  const studentPerms = [
    "view_courses",
    "view_attendance",
    "view_grades",
    "view_fees",
    "view_announcements",
  ];
  for (const permName of studentPerms) {
    const perm = permissions.find((p) => p.name === permName);
    if (perm) {
      await prisma.rolePermission.create({
        data: {
          roleId: studentRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  console.log("✅ Permissions assigned");

  // ============================================
  // STEP 5: Create Admin User
  // ============================================
  console.log("👤 Creating admin user...");

  const adminPassword = await argon2.hash("Admin@2026");
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@ems.edu",
      passwordHash: adminPassword,
      firstName: "System",
      lastName: "Administrator",
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log("✅ Admin user created");

  // ============================================
  // STEP 6: Create Departments
  // ============================================
  console.log("🏛️ Creating departments...");

  const csDept = await prisma.department.create({
    data: {
      name: "Computer Science",
      code: "CS",
      description: "Department of Computer Science",
    },
  });
  const mathDept = await prisma.department.create({
    data: {
      name: "Mathematics",
      code: "MATH",
      description: "Department of Mathematics",
    },
  });
  const physDept = await prisma.department.create({
    data: {
      name: "Physics",
      code: "PHYS",
      description: "Department of Physics",
    },
  });
  const baDept = await prisma.department.create({
    data: {
      name: "Business Administration",
      code: "BA",
      description: "Department of Business Administration",
    },
  });

  console.log("✅ Departments created");

  // ============================================
  // STEP 7: Create Programs
  // ============================================
  console.log("📚 Creating programs...");

  const csProgram = await prisma.program.create({
    data: {
      name: "BSc in Computer Science",
      code: "BSCS",
      departmentId: csDept.id,
      durationYears: 3,
    },
  });
  const mathProgram = await prisma.program.create({
    data: {
      name: "BSc in Mathematics",
      code: "BSMATH",
      departmentId: mathDept.id,
      durationYears: 3,
    },
  });
  const physProgram = await prisma.program.create({
    data: {
      name: "BSc in Physics",
      code: "BSPHYS",
      departmentId: physDept.id,
      durationYears: 3,
    },
  });
  const baProgram = await prisma.program.create({
    data: {
      name: "BA in Business Administration",
      code: "BABA",
      departmentId: baDept.id,
      durationYears: 3,
    },
  });

  console.log("✅ Programs created");

  // ============================================
  // STEP 8: Create Courses
  // ============================================
  console.log("📖 Creating courses...");

  const cs101 = await prisma.course.create({
    data: {
      name: "Introduction to Computer Science",
      code: "CS101",
      creditHours: 3,
      departmentId: csDept.id,
      programId: csProgram.id,
    },
  });
  const cs201 = await prisma.course.create({
    data: {
      name: "Data Structures and Algorithms",
      code: "CS201",
      creditHours: 3,
      departmentId: csDept.id,
      programId: csProgram.id,
    },
  });
  const cs301 = await prisma.course.create({
    data: {
      name: "Database Management Systems",
      code: "CS301",
      creditHours: 3,
      departmentId: csDept.id,
      programId: csProgram.id,
    },
  });
  const math101 = await prisma.course.create({
    data: {
      name: "Calculus I",
      code: "MATH101",
      creditHours: 3,
      departmentId: mathDept.id,
      programId: mathProgram.id,
    },
  });
  const math204 = await prisma.course.create({
    data: {
      name: "Linear Algebra",
      code: "MATH204",
      creditHours: 3,
      departmentId: mathDept.id,
      programId: mathProgram.id,
    },
  });
  const phys101 = await prisma.course.create({
    data: {
      name: "Mechanics",
      code: "PHYS101",
      creditHours: 3,
      departmentId: physDept.id,
      programId: physProgram.id,
    },
  });
  const ba101 = await prisma.course.create({
    data: {
      name: "Principles of Management",
      code: "BA101",
      creditHours: 3,
      departmentId: baDept.id,
      programId: baProgram.id,
    },
  });

  console.log("✅ Courses created");

  // ============================================
  // STEP 9: Create Academic Years
  // ============================================
  console.log("📅 Creating academic years...");

  const academicYear2024 = await prisma.academicYear.create({
    data: {
      name: "2024/25",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-06-30"),
      isCurrent: true,
    },
  });
  const academicYear2023 = await prisma.academicYear.create({
    data: {
      name: "2023/24",
      startDate: new Date("2023-09-01"),
      endDate: new Date("2024-06-30"),
      isCurrent: false,
    },
  });

  console.log("✅ Academic years created");

  // ============================================
  // STEP 10: Create Semesters
  // ============================================
  console.log("📚 Creating semesters...");

  const semester1 = await prisma.semester.create({
    data: {
      name: "Semester 1",
      academicYearId: academicYear2024.id,
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-01-15"),
      isActive: true,
    },
  });
  const semester2 = await prisma.semester.create({
    data: {
      name: "Semester 2",
      academicYearId: academicYear2024.id,
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-06-15"),
      isActive: false,
    },
  });

  console.log("✅ Semesters created");

  // ============================================
  // STEP 11: Create Instructors
  // ============================================
  console.log("👨‍🏫 Creating instructors...");

  const instructorPassword = await argon2.hash("Instructor@2026");

  const instructorUser1 = await prisma.user.create({
    data: {
      username: "prof.anderson",
      email: "anderson@ems.edu",
      passwordHash: instructorPassword,
      firstName: "John",
      lastName: "Anderson",
      roleId: instructorRole.id,
      isActive: true,
    },
  });
  const instructorUser2 = await prisma.user.create({
    data: {
      username: "prof.tadese",
      email: "tadese@ems.edu",
      passwordHash: instructorPassword,
      firstName: "tadese",
      lastName: "birara",
      roleId: instructorRole.id,
      isActive: true,
    },
  });

  await prisma.instructor.create({
    data: {
      userId: instructorUser1.id,
      employeeId: "EMP001",
      departmentId: csDept.id,
      specialization: "Computer Science",
      hireDate: new Date("2020-09-01"),
    },
  });
  await prisma.instructor.create({
    data: {
      userId: instructorUser2.id,
      employeeId: "EMP002",
      departmentId: mathDept.id,
      specialization: "Mathematics",
      hireDate: new Date("2019-09-01"),
    },
  });

  console.log("✅ Instructors created");

  // ============================================
  // STEP 12: Create Students
  // ============================================
  console.log("👨‍🎓 Creating students...");

  const studentPassword = await argon2.hash("Student@2026");

  const studentUser1 = await prisma.user.create({
    data: {
      username: "student.001",
      email: "student1@ems.edu",
      passwordHash: studentPassword,
      firstName: "Alice",
      lastName: "Johnson",
      roleId: studentRole.id,
      isActive: true,
    },
  });
  const studentUser2 = await prisma.user.create({
    data: {
      username: "student.002",
      email: "student2@ems.edu",
      passwordHash: studentPassword,
      firstName: "Bob",
      lastName: "Smith",
      roleId: studentRole.id,
      isActive: true,
    },
  });
  const studentUser3 = await prisma.user.create({
    data: {
      username: "student.003",
      email: "student3@ems.edu",
      passwordHash: studentPassword,
      firstName: "Charlie",
      lastName: "Brown",
      roleId: studentRole.id,
      isActive: true,
    },
  });

  const student1 = await prisma.student.create({
    data: {
      userId: studentUser1.id,
      studentId: "STU001",
      gender: "Female",
      guardianName: "Michael Johnson",
      guardianPhone: "+251911111111",
      programId: csProgram.id,
      currentAcademicYear: "2024/25",
      enrollmentStatus: "active",
    },
  });
  const student2 = await prisma.student.create({
    data: {
      userId: studentUser2.id,
      studentId: "STU002",
      gender: "Male",
      guardianName: "Mary Smith",
      guardianPhone: "+251922222222",
      programId: csProgram.id,
      currentAcademicYear: "2024/25",
      enrollmentStatus: "active",
    },
  });
  const student3 = await prisma.student.create({
    data: {
      userId: studentUser3.id,
      studentId: "STU003",
      gender: "Male",
      guardianName: "James Brown",
      guardianPhone: "+251933333333",
      programId: mathProgram.id,
      currentAcademicYear: "2024/25",
      enrollmentStatus: "active",
    },
  });

  console.log("✅ Students created");

  // ============================================
  // STEP 13: Create Sections
  // ============================================
  console.log("📚 Creating sections...");

  const sectionA = await prisma.section.create({
    data: {
      name: "Section A",
      courseId: cs101.id,
      semesterId: semester1.id,
      instructorId: instructorUser1.id,
      departmentId: csDept.id,
      room: "Room 302",
      maxCapacity: 50,
      currentEnrollment: 2,
    },
  });
  const sectionB = await prisma.section.create({
    data: {
      name: "Section B",
      courseId: cs101.id,
      semesterId: semester1.id,
      instructorId: instructorUser1.id,
      departmentId: csDept.id,
      room: "Room 304",
      maxCapacity: 50,
      currentEnrollment: 0,
    },
  });
  const sectionC = await prisma.section.create({
    data: {
      name: "Section C",
      courseId: math204.id,
      semesterId: semester1.id,
      instructorId: instructorUser2.id,
      departmentId: mathDept.id,
      room: "Room 305",
      maxCapacity: 40,
      currentEnrollment: 1,
    },
  });

  console.log("✅ Sections created");

  // ============================================
  // STEP 14: Create Enrollments
  // ============================================
  console.log("📝 Creating enrollments...");

  const enrollment1 = await prisma.enrollment.create({
    data: {
      studentId: student1.id,
      sectionId: sectionA.id,
      semesterId: semester1.id,
      status: "active",
    },
  });
  const enrollment2 = await prisma.enrollment.create({
    data: {
      studentId: student2.id,
      sectionId: sectionA.id,
      semesterId: semester1.id,
      status: "active",
    },
  });
  const enrollment3 = await prisma.enrollment.create({
    data: {
      studentId: student3.id,
      sectionId: sectionC.id,
      semesterId: semester1.id,
      status: "active",
    },
  });

  console.log("✅ Enrollments created");

  // ============================================
  // STEP 15: Create Assessments
  // ============================================
  console.log("📊 Creating assessments...");

  const midterm = await prisma.assessment.create({
    data: {
      sectionId: sectionA.id,
      name: "Midterm Exam",
      type: "Midterm",
      weight: 30,
      maxMarks: 100,
      dueDate: new Date("2024-10-15"),
      isPublished: false,
    },
  });
  const finalExam = await prisma.assessment.create({
    data: {
      sectionId: sectionA.id,
      name: "Final Exam",
      type: "Final",
      weight: 40,
      maxMarks: 100,
      dueDate: new Date("2024-12-10"),
      isPublished: false,
    },
  });
  const quiz1 = await prisma.assessment.create({
    data: {
      sectionId: sectionC.id,
      name: "Quiz 1",
      type: "Quiz",
      weight: 10,
      maxMarks: 20,
      dueDate: new Date("2024-09-20"),
      isPublished: true,
    },
  });

  console.log("✅ Assessments created");

  // ============================================
  // STEP 16: Create Grades
  // ============================================
  console.log("📝 Creating grades...");

  await prisma.grade.create({
    data: {
      enrollmentId: enrollment1.id,
      assessmentId: quiz1.id,
      marksObtained: 18,
      totalMarks: 20,
      gradePoint: 4.0,
      letterGrade: "A",
      isPublished: true,
      publishedAt: new Date("2024-09-21"),
      studentId: student1.id, // ✅ Added for relation
    },
  });

  console.log("✅ Grades created");

  // ============================================
  // STEP 17: Create Fee Records
  // ============================================
  console.log("💰 Creating fee records...");

  const feeRecord1 = await prisma.feeRecord.create({
    data: {
      studentId: student1.id,
      semesterId: semester1.id,
      totalFees: 15000,
      paidAmount: 5000,
      remainingBalance: 10000,
      dueDate: new Date("2024-10-15"),
    },
  });
  const feeRecord2 = await prisma.feeRecord.create({
    data: {
      studentId: student2.id,
      semesterId: semester1.id,
      totalFees: 15000,
      paidAmount: 15000,
      remainingBalance: 0,
      dueDate: new Date("2024-10-15"),
    },
  });

  console.log("✅ Fee records created");

  // ============================================
  // STEP 18: Create Payments
  // ============================================
  console.log("💳 Creating payments...");

  await prisma.payment.create({
    data: {
      feeRecordId: feeRecord1.id,
      amount: 5000,
      paymentDate: new Date("2024-09-01"),
      referenceNumber: "PAY-001",
      paymentMethod: "Bank Transfer",
      receivedBy: admin.id,
      receiptNumber: "RCP-001",
      studentId: student1.id, // ✅ Added for relation
    },
  });

  console.log("✅ Payments created");

  // ============================================
  // STEP 19: Create Announcements
  // ============================================
  console.log("📢 Creating announcements...");

  await prisma.announcement.create({
    data: {
      title: "Welcome to the New Academic Year",
      content:
        "We are excited to welcome all students to the 2024/25 academic year. Please register for your courses before the deadline.",
      authorId: admin.id,
      targetRoles: ["student", "instructor"],
      status: "published",
      publishedAt: new Date("2024-09-01"),
    },
  });
  await prisma.announcement.create({
    data: {
      title: "Faculty Meeting Scheduled",
      content:
        "All faculty members are required to attend the monthly meeting on Friday, September 15th at 2:00 PM.",
      authorId: admin.id,
      targetRoles: ["instructor"],
      status: "published",
      publishedAt: new Date("2024-09-05"),
    },
  });

  console.log("✅ Announcements created");

  // ============================================
  // STEP 20: Create Audit Logs
  // ============================================
  console.log("📋 Creating audit logs...");

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "SYSTEM_INITIALIZED",
      resourceType: "system",
      ipAddress: "127.0.0.1",
      userAgent: "Seeder Script",
      status: "success",
    },
  });

  console.log("✅ Audit logs created");

  // ============================================
  // FINAL: Print Summary
  // ============================================
  console.log("");
  console.log("✅ ============================================");
  console.log("✅              SEEDING COMPLETE!               ");
  console.log("✅ ============================================");
  console.log("");
  console.log("📝 Test Credentials:");
  console.log("   🔑 Admin:");
  console.log("      Email: admin@ems.edu");
  console.log("      Password: Admin@2026");
  console.log("   🔑 Instructor:");
  console.log("      Email: anderson@ems.edu");
  console.log("      Password: Instructor@2026");
  console.log("      Email: williams@ems.edu");
  console.log("      Password: Instructor@2026");
  console.log("   🔑 Student:");
  console.log("      Email: student1@ems.edu");
  console.log("      Password: Student@2026");
  console.log("      Email: student2@ems.edu");
  console.log("      Password: Student@2026");
  console.log("      Email: student3@ems.edu");
  console.log("      Password: Student@2026");
  console.log("");
  console.log("🏗️ Database seeded successfully!");
}

// ============================================
// RUN THE SEEDER
// ============================================
main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// ============================================
// SEEDER OUTPUT
// ============================================
// 📝 Test Credentials:
//    🔑 Admin:
//       Email: admin@ems.edu
//       Password: Admin@2026
//    🔑 Instructor:
//       Email: anderson@ems.edu
//       Password: Instructor@2026
//       Email: williams@ems.edu
//       Password: Instructor@2026
//    🔑 Student:
//       Email: student1@ems.edu
//       Password: Student@2026
//       Email: student2@ems.edu
//       Password: Student@2026
//       Email: student3@ems.edu
//       Password: Student@2026
