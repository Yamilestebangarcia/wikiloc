import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = window.sessionStorage.getItem("token");
  console.log("protected");
  console.log(token !== "null");
  if (token !== "null") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
