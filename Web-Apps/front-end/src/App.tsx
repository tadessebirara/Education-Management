import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRedirect from "./components/DashboardRedirect";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import RegistrarDashboard from "./pages/dashboard/RegistrarDashboard";
import ManageAnnouncements from "./pages/announcements/ManageAnnouncements";
import SystemLogs from "./pages/logs/SystemLogs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* =========================
                PUBLIC ROUTES
            ========================== */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Root → role-based dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* =========================
                ROLE-BASED DASHBOARD ENTRY
            ========================== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              }
            />

            {/* =========================
                ADMIN
            ========================== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* =========================
                REGISTRAR / FACULTY
            ========================== */}
            <Route
              path="/registrar"
              element={
                <ProtectedRoute allowedRoles={["registrar"]}>
                  <RegistrarDashboard />
                </ProtectedRoute>
              }
            />

            {/* =========================
                INSTRUCTOR
            ========================== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["instructor"]}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />

            {/* =========================
                STUDENT
            ========================== */}
           <Route
  path="/student"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

            {/* =========================
                ANNOUNCEMENTS
                ADMIN + REGISTRAR
            ========================== */}
            <Route
              path="/announcements"
              element={
                <ProtectedRoute allowedRoles={["admin", "registrar"]}>
                  <ManageAnnouncements />
                </ProtectedRoute>
              }
            />

            {/* =========================
                SYSTEM LOGS
                ADMIN ONLY
            ========================== */}
            <Route
              path="/logs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SystemLogs />
                </ProtectedRoute>
              }
            />

            {/* =========================
                UNKNOWN ROUTES
            ========================== */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                style: {
                  background: "#22c55e",
                  color: "#fff",
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: "#ef4444",
                  color: "#fff",
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
