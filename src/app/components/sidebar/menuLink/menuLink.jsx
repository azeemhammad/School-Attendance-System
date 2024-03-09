"use client";
import React, { useState } from "react";
import styles from "./menuLink.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <Link
        href={item.path}
        className={`${styles.wrapper} ${
          pathname === item.path && styles.active
        }`}
      >
        <span className={styles.icon}>{item.icon}</span>
        <span
          className={pathname === item.path ? styles.titleactive : styles.title}
        >
          {item.title}
        </span>
        
      </Link>
      
    </>
  );
};

export default MenuLink;
