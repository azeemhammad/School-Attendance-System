"use client";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { ACCESS_LEVELS } from "@/app/utils/constants";

const Navbar = () => {
  const navigate = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user_data");
    setUser(data ? JSON.parse(data) : null);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        {" "}
        <img src="/logo.svg" alt="logo" height={60} />
        <img src="/logo2.svg" alt="logo2" height={60} />
      </div>
      <div className={styles.content}>
        <h4>{user?.name}!!!</h4>
        {/* <div className={styles.calenderbox}>
          <span>Select Date Range</span>
          <div className={styles.daterange}>
            <span>from</span>
            <input type="date" />
            <span>to</span>
            <input type="date" />
          </div>
        </div> */}
        {/* <img src="options.svg" height={40} /> */}
        <div className={styles.personandlanguage}>
          {user?.role_id == ACCESS_LEVELS.super_admin && (
            <button
              className={styles.usermanagementbutton}
              onClick={() => navigate.push("/dashboard/user-management")}
            >
              User Management
            </button>
          )}
          {/* <div className={styles.personaccount}>
            <img src="/personicon.svg" />
            <span>Burhan Rasool</span>
          </div> */}
          {/* <div className={styles.language}>
            <img src="/ukflag.svg" />
            <span>English</span>
            <IoIosArrowDown />
          </div> */}
          <button
            className={styles.logout__button}
            onClick={() => {
              // navigate.push("/")
              localStorage.removeItem("user_data");
              navigate.push("/", undefined, { shallow: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
