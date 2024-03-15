"use client";

import translation from "@/app/lang/translation";
import styles from "./weekly.module.css";

const Weekly0rFortnightly = ({ setIsWeeklyOrFortnightly, isWeeklyOrFortnightly, isEnglish }) => {
  const handleClick = (value) => {
    setIsWeeklyOrFortnightly(value);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={isWeeklyOrFortnightly === 1 ? styles.underline : ""}
        onClick={() => handleClick(1)}
        style={{ cursor: "pointer" }}
      >
        {isEnglish ? translation.en.weekly : translation.mg.weekly}
      </div>
      <div
        className={isWeeklyOrFortnightly === 2 ? styles.underline : ""}
        onClick={() => handleClick(2)}
        style={{ cursor: "pointer" }}
      >
        {isEnglish ? translation.en.fortnightly : translation.mg.fortnightly}
      </div>
    </div>
  );
};

export default Weekly0rFortnightly;
