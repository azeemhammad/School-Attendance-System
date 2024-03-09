"use client";

import styles from "./weekly.module.css";

const Weekly0rFortnightly = ({ setIsWeeklyOrFortnightly, isWeeklyOrFortnightly }) => {
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
        Weekly
      </div>
      <div
        className={isWeeklyOrFortnightly === 2 ? styles.underline : ""}
        onClick={() => handleClick(2)}
        style={{ cursor: "pointer" }}
      >
        Fortnightly
      </div>
    </div>
  );
};

export default Weekly0rFortnightly;
