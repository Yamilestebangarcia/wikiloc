import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav>
      <NavLink
        className={(isActive) => "nav-link" + (!isActive ? " unselected" : "")}
        to="/app/seemap"
      >
        Ver mapa
      </NavLink>
      <NavLink
        className={(isActive) => "nav-link" + (!isActive ? " unselected" : "")}
        to="/app/upload"
      >
        Subir ruta
      </NavLink>
    </nav>
  );
}

export default Nav;
