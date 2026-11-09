import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className={styles.dashboard}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
