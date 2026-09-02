import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";
import { BookOpen, Users, ClipboardList, Bell, Clock } from "lucide-react";

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();

  const todayClasses = [
    { time: "09:00 AM", course: "CS101 - Intro to Comp Sci", room: "Room 302", section: "Lecture Hall B", students: 45 },
    { time: "11:30 AM", course: "MATH204 - Linear Algebra", room: "Room 305", section: "Section C", students: 32 },
    { time: "01:30 PM", course: "PHYS101 - Physics I", room: "Room 201", section: "Section A", students: 28 },
  ];

  const pendingTasks = [
    { title: "Submit Final Grades for CS101", overdue: true, days: 1 },
    { title: "Review Midterm Syllabus", due: "Next Week" },
    { title: "Upload Lecture Notes for Week 5", due: "Tomorrow" },
  ];

  return (
    <Layout>
      <div className="p-6">
        {/* ✅ FIXED: Only showing firstName, not the whole user object */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Instructor Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.firstName || "Instructor"}. You have {todayClasses.length} classes today.
          </p>
        </div>

        {/* Stats Grid - All safe */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Classes</p>
                <p className="text-2xl font-bold text-gray-800">{todayClasses.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg"><BookOpen className="w-6 h-6 text-blue-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">124</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg"><Users className="w-6 h-6 text-green-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-800">{pendingTasks.length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg"><ClipboardList className="w-6 h-6 text-yellow-600" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Notifications</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg"><Bell className="w-6 h-6 text-purple-600" /></div>
            </div>
          </div>
        </div>

        {/* Today's Classes - All properties are safe (time, course, room, section, students are all strings/numbers) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Today's Classes</h2></div>
          <div className="divide-y divide-gray-100">
            {todayClasses.map((cls, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">{cls.time}</div>
                    <div>
                      <p className="font-medium text-gray-800">{cls.course}</p>
                      <p className="text-sm text-gray-500">{cls.room} • {cls.section}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{cls.students} students</span>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Mark Attendance</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks - All properties are safe (title, days, due are all strings/numbers) */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
            <span className="text-sm text-gray-500">{pendingTasks.length} tasks</span>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingTasks.map((task, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <div className="flex items-center mt-1">
                      {task.overdue ? (
                        <span className="text-red-600 text-sm flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Overdue by {task.days} day{task.days && task.days > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Due: {task.due}</span>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">⋮</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstructorDashboard;