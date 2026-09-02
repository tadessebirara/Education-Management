import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Wait for authentication to initialize
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User is not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Convert role object → role name
  const userRole =
    typeof user.role === "object" && user.role !== null
      ? user.role.name
      : user.role;

  const normalizedUserRole = String(userRole).trim().toLowerCase();

  // Check authorization
  if (allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some(
      (role) => role.trim().toLowerCase() === normalizedUserRole,
    );

    if (!hasPermission) {
      // IMPORTANT:
      // Do NOT redirect to /dashboard.
      // That can create an infinite redirect loop.
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>

            <p className="mt-2 text-gray-600">
              You do not have permission to access this page.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your role: {normalizedUserRole || "Unknown"}
            </p>

            <button
              onClick={() => window.history.back()}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
