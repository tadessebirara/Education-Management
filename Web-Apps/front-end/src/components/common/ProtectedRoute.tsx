import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Wait for authentication to initialize
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Get role name whether role is a string or an object
  const role =
    typeof user.role === "object" && user.role !== null
      ? user.role.name
      : user.role;

  const normalizedRole = String(role).toLowerCase();

  // Check role permission
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.some(
      (allowedRole) => allowedRole.toLowerCase() === normalizedRole,
    )
  ) {
    // User is authenticated but doesn't have permission
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
