import React, { useState } from "react";
import Layout from "../../components/layout/Layout"; // ✅ Fixed import path
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Globe,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "scheduled";
  audience: string;
  date: string;
  department?: { id: number; name: string } | string;
}

const ManageAnnouncements: React.FC = () => {
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Full Semester Registration Guidelines",
      content: "Important updates regarding priority registration windows...",
      status: "published",
      audience: "All Students",
      date: "Oct 12, 2023",
      department: { id: 1, name: "Registrar Office" },
    },
    {
      id: 2,
      title: "Faculty & Staff Professional Development",
      content: "Annual training session scheduled for all faculty members...",
      status: "published",
      audience: "Faculty & Staff",
      date: "Nov 01, 2023",
      department: "HR Department",
    },
    {
      id: 3,
      title: "Campus Infrastructure Maintenance",
      content: "Network downtime scheduled for Science building this week.",
      status: "draft",
      audience: "Engineering Dept",
      date: "Nov 15, 2023",
      department: { id: 2, name: "IT Department" },
    },
    {
      id: 4,
      title: "Guest Lecture: Dr. Aris",
      content: "Join us for a special seminar on advanced fluid dynamics.",
      status: "scheduled",
      audience: "All Students",
      date: "Dec 01, 2023",
      department: { id: 3, name: "Physics Department" },
    },
  ]);

  // ✅ Safe helper function to get department display name
  const getDepartmentName = (dept: any): string => {
    if (!dept) return "N/A";
    if (typeof dept === "string") return dept;
    if (typeof dept === "object" && dept.name) return dept.name;
    return "N/A";
  };

  // ✅ Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <Globe className="w-4 h-4" />;
      case "draft":
        return <Edit className="w-4 h-4" />;
      case "scheduled":
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Announcements
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage institutional announcements
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-5 h-5 mr-2" />
            New Announcement
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Broadcasts</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Drafts</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Edit className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {announcement.title}
                      </h3>
                      {/* ✅ Status Badge - Fixed */}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          announcement.status,
                        )}`}
                      >
                        {getStatusIcon(announcement.status)}
                        <span className="ml-1 capitalize">
                          {announcement.status}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {announcement.content}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {announcement.audience}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {announcement.date}
                      </span>
                      {announcement.department && (
                        <span className="flex items-center">
                          📁 {getDepartmentName(announcement.department)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* ✅ Action Buttons - Fixed */}
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* ✅ Pagination - Fixed */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing 1 to {announcements.length} of 19 entries
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageAnnouncements;
