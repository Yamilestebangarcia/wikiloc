import { Routes, Route } from "react-router-dom";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import IndexApp from "./page/indexApp/indexApp";
import NotFound from "./page/notFound/NotFound";
import ProtectedRoute from "./components/controlAuth/ProtectedRoute";
import ResetPass from "./page/resetPass/ResetPass";
import DeleteVerified from "./page/deleteVerified/DeleteVerified";
import UploadFile from "./page/uploadFile/UploadFile";
import SeeMap from "./page/seeMap/seeMap";
import Search from "./page/search/search";
import ViewRute from "./page/viewRute/viewrute";
import Follow from "./page/follow/Follow";
import "./index.css";
import ChangePass from "./page/changePass/ChangePass";
import Auth from "./components/controlAuth/Auth";
/* import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("./page/login/Login"));
const Register = lazy(() => import("./page/register/Register"));
const IndexApp = lazy(() => import("./page/indexApp/indexApp"));
const NotFound = lazy(() => import("./page/notFound/NotFound"));
const ProtectedRoute = lazy(() => import("./components/protectedRoute"));
const ResetPass = lazy(() => import("./page/resetPass/ResetPass"));
const DeleteVerified = lazy(() =>
  import("./page/deleteVerified/DeleteVerified")
);
const UploadFile = lazy(() => import("./page/uploadFile/UploadFile"));
const SeeMap = lazy(() => import("./page/seeMap/SeeMap"));
const Search = lazy(() => import("./page/search/Search"));
const ViewRute = lazy(() => import("./page/viewRute/ViewRute"));
const Follow = lazy(() => import("./page/follow/Follow"));
const ChangePass = lazy(() => import("./page/changePass/ChangePass"));
import "./index.css";
const Auth = lazy(() => import("./components/auth")); */

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Auth>
            <Login />
          </Auth>
        }
      />
      <Route
        path="/app/upload"
        element={
          <ProtectedRoute>
            <UploadFile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/seemap"
        element={
          <ProtectedRoute>
            <SeeMap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/view"
        element={
          <ProtectedRoute>
            <ViewRute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/follow"
        element={
          <ProtectedRoute>
            <Follow />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/index"
        element={
          <ProtectedRoute>
            <IndexApp />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ChangePass />} />

      <Route path="/resetPass" element={<ResetPass />} />
      <Route
        path="/verified"
        element={
          <DeleteVerified
            method="POST"
            url="http://localhost:3001/login/verified"
            text="Verificando Contraseña"
          />
        }
      />
      <Route
        path="/delete"
        element={
          <DeleteVerified
            method="DELETE"
            url="http://localhost:3001/login/delete"
            text="borrado Usuario"
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
