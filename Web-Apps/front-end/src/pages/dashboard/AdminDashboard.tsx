import React from "react";
import Layout from "../../components/layout/Layout";

import { useAuth } from "../../hooks/useAuth";
import {
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  Bell,
  DollarSign,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Students",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Total Instructors",
      value: "45",
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      label: "Active Courses",
      value: "32",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      label: "Today's Classes",
      value: "12",
      icon: Calendar,
      color: "bg-orange-500",
    },
    { label: "Pending Tasks", value: "8", icon: Bell, color: "bg-yellow-500" },
    {
      label: "Revenue This Month",
      value: "₿ 245,000",
      icon: DollarSign,
      color: "bg-indigo-500",
    },
  ];

  const recentActivities = [
    {
      action: "New student enrolled in CS101",
      time: "5 minutes ago",
      user: "John Doe",
    },
    {
      action: "Attendance recorded for MATH204",
      time: "1 hour ago",
      user: "Prof. Williams",
    },
    {
      action: "Payment received from Student STU001",
      time: "2 hours ago",
      user: "Finance Dept",
    },
    {
      action: "New announcement published",
      time: "3 hours ago",
      user: "Admin",
    },
    {
      action: "Grade published for PHYS101",
      time: "5 hours ago",
      user: "Prof. Anderson",
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.firstName || "Admin"}! Here's what's happening
            today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
