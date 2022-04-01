import { Navigate } from "react-router-dom";

const AuthAut = ({ children }) => {
  const token = window.sessionStorage.getItem("token");

  if (token || token === undefined) {
    return <Navigate to="/app" replace />;
  }
  return children;
};

export default AuthAut;
