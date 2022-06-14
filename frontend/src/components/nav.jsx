import { NavLink } from "react-router-dom";
import styles from "./nav.module.css";
function Nav({ controlClass }) {
  return (
    <nav className={controlClass ? controlClass : styles.nav}>
      <NavLink
        className={({ isActive }) =>
          styles.navLink + " " + (isActive ? styles.active : null)
        }
        to="/app/index"
      >
        home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.navLink + " " + (isActive ? styles.active : null)
        }
        to="/app/seemap"
      >
        Ver mapa
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.navLink + " " + (isActive ? styles.active : null)
        }
        to="/app/upload"
      >
        Subir ruta
      </NavLink>
    </nav>
  );
}

export default Nav;
