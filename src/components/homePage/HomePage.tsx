import Navbar from "../navbar/Navbar";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <section>
        <h1>Stay Focused. Stay Organized.</h1>
        <h2>Manage your tasks efficiently and boost your productivity.</h2>
      </section>
    </div>
  );
}

export default HomePage;
