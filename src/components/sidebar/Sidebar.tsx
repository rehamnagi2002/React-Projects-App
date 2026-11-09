import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div>
      {" "}
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="overview">Overview</NavLink>
          </li>
          <li>
            <NavLink to="projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
