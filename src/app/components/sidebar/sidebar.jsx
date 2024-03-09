import React from "react";
import styles from "./sidebar.module.css";
import menuItems from "@/app/utils/menuItems";
import MenuLink from "./menuLink/menuLink";


const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        {" "}
        <img src="/logo.svg" alt="logo" height={50} />
        <img src="/logo2.svg" alt="logo2" height={50} />
      </div>
      <ul className={styles.list}>
        {menuItems?.map((category) => (
          <li key={category.title}>
            {/* <div className={styles.catdiv}>
              <span className={styles.category}>{category.title}</span>
            </div> */}
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
