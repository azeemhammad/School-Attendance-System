"use client";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const navigate = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        {" "}
        <img src="/logo.svg" alt="logo" height={60} />
        <img src="/logo2.svg" alt="logo2" height={60} />
      </div>
      <div className={styles.content}>
        <h4>Hello Burhan!!!</h4>
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
          <button
            className={styles.usermanagementbutton}
            onClick={() => navigate.push("/dashboard/user-management")}
          >
            User Management
          </button>
          <div className={styles.personaccount}>
            <img src="/personicon.svg" />
            <span>Burhan Rasool</span>
          </div>
          <div className={styles.language}>
            <img src="/ukflag.svg" />
            <span>English</span>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
