'use client'
import { useState } from "react";
import Navbar from "../components/navbar/navbar";
import styles from "./dashboard.module.css";

const Layout = ({ children }) => {

  const [lala,setlala]=useState("dfdfdf");

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.sidebarContainer}>
       <Sidebar/>
        </div> */}
      <div className={styles.navbarContainer}>
        <Navbar />
   
      
        {children}
      </div>
    </div>
  );
};

export default Layout;
