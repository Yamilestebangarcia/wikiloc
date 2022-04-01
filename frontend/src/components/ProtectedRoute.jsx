import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = window.sessionStorage.getItem("token");

  if (token) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
