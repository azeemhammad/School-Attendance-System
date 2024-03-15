"use client";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { ACCESS_LEVELS, LNGS } from "@/app/utils/constants";
import translation from "../../lang/translation";

const Navbar = () => {
  const navigate = useRouter();
  const [user, setUser] = useState(null);
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const storedIsEnglish = localStorage.getItem("isEnglish");
    const initialIsEnglish = storedIsEnglish !== null ? JSON.parse(storedIsEnglish) : true;
    setIsEnglish(initialIsEnglish);
  }, []);

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
              {isEnglish ? translation.en.user_management : translation.mg.user_management}
            </button>
          )}
          {/* <div className={styles.personaccount}>
            <img src="/personicon.svg" />
            <span>Burhan Rasool</span>
          </div> */}
          <div className={styles.languagebox}>
            <div className={styles.language}>
              <div>
                <img
                  src={isEnglish ? "/ukflag.svg" : "/madgascar_flag.svg"}
                  style={{ width: "18px", height: "18px" }}
                />
                <span>{isEnglish ? "English" : "Madgascar"}</span>
              </div>
              <IoIosArrowDown />
            </div>

            <div className={styles.languagebox__content}>
              {LNGS.map((lng) => {
                return (
                  <div
                    style={{
                      paddingTop: "1em",
                      paddingLeft: "1em",
                      paddingBottom: ".5em",
                      height: "47px",
                      display: "flex",
                    }}
                    key={lng.country_code}
                    onClick={async () => {
                      localStorage.setItem("isEnglish", lng.code == "en" ? true : false);
                      window.location.reload();
                    }}
                  >
                    <span>{lng.nativeName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className={styles.logout__button}
            onClick={() => {
              localStorage.removeItem("user_data");
              navigate.push("/", undefined, { shallow: true });
            }}
          >
            {isEnglish ? translation.en.logout : translation.mg.logout}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
