import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  BarChart3,
  Search,
  UserPlus,
  GraduationCap,
  DollarSign,
  Clock,
  TrendingUp,
  Award,
  FileCheck,
  CreditCard,
  FileBarChart,
  BookMarked,
  User,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Safe helper to prevent object rendering errors
  const safeString = (value: any): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "object") {
      // If it's a role object, get the name
      if (value.name) return value.name;
      // If it's a user object with firstName
      if (value.firstName) return value.firstName;
      return "";
    }
    return "";
  };

  // ✅ Get role name from object or string
  const getRoleName = (role: any): string => {
    if (!role) return "student";
    if (typeof role === "string") return role;
    if (typeof role === "object" && role.name) return role.name;
    return "student";
  };

  // ✅ Get role display name
  const getRoleDisplay = (role: any): string => {
    const roleName = getRoleName(role);
    const roleMap: Record<string, string> = {
      admin: "System Administrator",
      registrar: "Registrar",
      instructor: "Instructor",
      finance: "Finance Staff",
      student: "Student",
    };
    return roleMap[roleName] || roleName;
  };

  // ✅ Get user role safely
  const userRole = getRoleName(user?.role);
  console.log("🔐 Current user role:", userRole);

  // ✅ Menu items based on user role
  const getMenuItems = () => {
    // Student menu (default)
    const studentMenu = [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: BookMarked, label: "My Courses", path: "/my-courses" },
      { icon: Calendar, label: "Timetable", path: "/timetable" },
      { icon: Clock, label: "Attendance", path: "/attendance" },
      { icon: Award, label: "Grades", path: "/grades" },
      { icon: DollarSign, label: "Fees", path: "/fees" },
      { icon: Bell, label: "Announcements", path: "/announcements" },
    ];

    // Instructor menu
    const instructorMenu = [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: BookMarked, label: "My Courses", path: "/my-courses" },
      { icon: ClipboardList, label: "My Sections", path: "/my-sections" },
      { icon: Clock, label: "Attendance", path: "/attendance" },
      { icon: FileText, label: "Assessments", path: "/assessments" },
      { icon: Award, label: "Grades", path: "/grades" },
      { icon: Calendar, label: "Timetable", path: "/timetable" },
      { icon: Bell, label: "Announcements", path: "/announcements" },
    ];

    // Registrar menu
    const registrarMenu = [
      { icon: LayoutDashboard, label: "Dashboard", path: "/registrar" },
      { icon: GraduationCap, label: "Students", path: "/students" },
      { icon: BookOpen, label: "Programs", path: "/programs" },
      { icon: BookMarked, label: "Courses", path: "/courses" },
      { icon: ClipboardList, label: "Sections", path: "/sections" },
      { icon: FileCheck, label: "Enrollments", path: "/enrollments" },
      { icon: Calendar, label: "Timetable", path: "/timetable" },
      { icon: FileText, label: "Assessments", path: "/assessments" },
      { icon: BarChart3, label: "Reports", path: "/reports" },
      { icon: Bell, label: "Announcements", path: "/announcements" },
    ];

    // Admin menu
    const adminMenu = [
      { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
      { icon: Users, label: "Users", path: "/users" },
      { icon: GraduationCap, label: "Students", path: "/students" },
      { icon: UserPlus, label: "Instructors", path: "/instructors" },
      { icon: BookOpen, label: "Programs", path: "/programs" },
      { icon: BookMarked, label: "Courses", path: "/courses" },
      { icon: ClipboardList, label: "Sections", path: "/sections" },
      { icon: Calendar, label: "Timetable", path: "/timetable" },
      { icon: Clock, label: "Attendance", path: "/attendance" },
      { icon: FileText, label: "Assessments", path: "/assessments" },
      { icon: BarChart3, label: "Reports", path: "/reports" },
      { icon: Bell, label: "Announcements", path: "/announcements" },
      { icon: FileBarChart, label: "System Logs", path: "/logs" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ];

    // ✅ Return menu based on role
    switch (userRole) {
      case "admin":
        return adminMenu;
      case "registrar":
        return registrarMenu;
      case "instructor":
        return instructorMenu;
      case "student":
      default:
        return studentMenu;
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
          <h1 className="text-xl font-bold text-white">EMS Core</h1>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {safeString(user?.firstName?.[0])}
              {safeString(user?.lastName?.[0])}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {safeString(user?.firstName)} {safeString(user?.lastName)}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {getRoleDisplay(user?.role)}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition group"
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}

          <hr className="my-4 border-gray-700" />

          <button
            className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-red-600 hover:text-white transition group"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search EMS..."
                  className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {safeString(user?.firstName?.[0])}
                  {safeString(user?.lastName?.[0])}
                </div>
                <div className="hidden sm:block">
                  {/* ✅ SAFE: Using safeString() to prevent object rendering */}
                  <p className="text-sm font-medium text-gray-700">
                    {safeString(user?.firstName)} {safeString(user?.lastName)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {getRoleDisplay(user?.role)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;