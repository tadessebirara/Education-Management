import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  department?: string;
  program?: string;
  enrollmentStatus: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const [form, setForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    program: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load students");
          return;
        }

        setStudents(data);
      } catch (err: unknown) {
        setError("Cannot connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create student");
        return;
      }

      // Reset form
      setShowForm(false);
      setForm({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        program: "",
      });

      // Refresh list
      setLoading(true);
      const refreshRes = await fetch("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const refreshData = await refreshRes.json();

      if (refreshRes.ok) {
        setStudents(refreshData);
      }
      setLoading(false);
    } catch (err: unknown) {
      alert("Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>
          <p className="text-slate-500 mt-1">Manage student records</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "+ Add Student"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Student</h2>

          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              required
              placeholder="Student ID (e.g. STU-2024-001)"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
            />
            <input
              required
              placeholder="First Name"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              required
              placeholder="Last Name"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Phone"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              placeholder="Department"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
            <input
              placeholder="Program"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
              >
                Save Student
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading students...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : students.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No students found. Add your first student.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-slate-500">
                  Student ID
                </th>
                <th className="px-6 py-3 text-sm font-medium text-slate-500">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-medium text-slate-500">
                  Department
                </th>
                <th className="px-6 py-3 text-sm font-medium text-slate-500">
                  Program
                </th>
                <th className="px-6 py-3 text-sm font-medium text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{student.studentId}</td>
                  <td className="px-6 py-4">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4">{student.department || "—"}</td>
                  <td className="px-6 py-4">{student.program || "—"}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {student.enrollmentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
