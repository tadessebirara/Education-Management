import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";
import {
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  Bell,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const courses = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: "Prof. Anderson",
      credits: 3,
      grade: "A",
    },
    {
      code: "MATH204",
      name: "Linear Algebra",
      instructor: "Prof. Williams",
      credits: 3,
      grade: "B+",
    },
    {
      code: "PHYS101",
      name: "Physics I",
      instructor: "Prof. Johnson",
      credits: 4,
      grade: "A-",
    },
  ];

  const upcomingClasses = [
    { course: "CS101", time: "09:00 AM", room: "Room 302", date: "Today" },
    { course: "MATH204", time: "11:30 AM", room: "Room 305", date: "Today" },
    { course: "PHYS101", time: "01:30 PM", room: "Room 201", date: "Tomorrow" },
  ];

  const stats = [
    {
      label: "Attendance Rate",
      value: "92%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    { label: "GPA", value: "3.75", icon: Award, color: "text-blue-600" },
    {
      label: "Credits Completed",
      value: "45/120",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      label: "Fee Balance",
      value: "₿ 2,500",
      icon: DollarSign,
      color: "text-red-600",
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.firstName || "Student"}! Here's your academic
            summary.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`bg-gray-50 p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Courses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                My Courses
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {course.code} - {course.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {course.instructor} • {course.credits} credits
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.grade === "A" || course.grade === "A-"
                            ? "bg-green-100 text-green-700"
                            : course.grade === "B+" || course.grade === "B"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {course.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Upcoming Classes
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{cls.course}</p>
                      <p className="text-sm text-gray-500">{cls.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        {cls.time}
                      </p>
                      <p className="text-xs text-gray-400">{cls.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-gray-400" />
              Notifications
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">
                  Attendance warning for CS101 - You have 3 absences
                </span>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  Grades published for MATH204 Quiz
                </span>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">
                  Fee payment reminder: ₿ 2,500 due by Dec 15
                </span>
              </div>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
