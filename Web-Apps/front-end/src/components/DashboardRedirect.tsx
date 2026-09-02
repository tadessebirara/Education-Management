import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardRedirect = () => {
  const { user, isLoading } = useAuth();

  // Wait until authentication has finished loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // No authenticated user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Handle both string and object role formats
  const role =
    typeof user.role === "object" && user.role !== null
      ? user.role.name
      : user.role;

  switch (String(role).toLowerCase()) {
    case "admin":
      return <Navigate to="/admin" replace />;

    case "registrar":
      return <Navigate to="/registrar" replace />;

    case "instructor":
      return <Navigate to="/instructor" replace />;

    case "student":
      return <Navigate to="/student" replace />;

    default:
      console.error("Unknown user role:", user.role);
      return <Navigate to="/login" replace />;
  }
};

export default DashboardRedirect;