'use client'
import Navbar from "../components/navbar/navbar";
import ProcessingLoader from "../components/processing-loader";
import styles from "./dashboard.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbarContainer}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
