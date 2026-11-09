import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../AuthProvider";

function PageNav() {
  const { user } = useAuth();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Logout
          </NavLink>
        </li>
      </ul>
      <h2>{user?.username}</h2>
    </nav>
  );
}

export default PageNav;
