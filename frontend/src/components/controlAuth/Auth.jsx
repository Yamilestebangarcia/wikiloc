import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const token = window.sessionStorage.getItem("token");
  console.log("auth");
  console.log(token == "null");
  if (token == "null") {
    return <Navigate to="/app/index" replace />;
  }
  return children;
};

export default Auth;
