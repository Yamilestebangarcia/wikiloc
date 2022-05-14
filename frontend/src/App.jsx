import { Routes, Route } from "react-router-dom";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import IndexApp from "./page/indexApp/indexApp";
import NotFound from "./page/notFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthAut from "./components/authAut";
import Reset from "./page/reset/reset";
import ResetPass from "./page/resetPass/ResetPass";
import DeleteVerified from "./page/deleteVerified/DeleteVerified";
import UploadFile from "./page/uploadFile/UploadFile";
import SeeMap from "./page/seeMap/seeMap";
import Search from "./page/search/search";
import ViewRute from "./page/viewRute/viewrute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthAut>
            <Login />
          </AuthAut>
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
        path="/app"
        element={
          <ProtectedRoute>
            <IndexApp />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/resetPass" element={<ResetPass />} />
      <Route
        path="/verified"
        element={
          <DeleteVerified
            method="POST"
            url="http://localhost:3001/login/verified"
            msgSuccess="Usuario verificado"
            msgErr="error al verificar"
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
            msgSuccess="Usuario borrado"
            msgErr="error al borrar"
            text="borrado Usuario"
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
