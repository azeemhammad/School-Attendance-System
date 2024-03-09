import styles from "../../dashboard/dashboard.module.css";

const PerformanceSchool = ({ preformanceRecord }) => {
  return (
    <div className={styles.performanceboxes}>
      <div className={styles.performancebox}>
        <img src="/Frame 3.svg" height={40} />
        <div className={styles.text}>
          <span>High Performing Schools</span>
          <h2>{preformanceRecord?.highPreferenceCount}</h2>
        </div>
      </div>
      <div className={styles.performancebox}>
        <img src="/Frame 4.svg" height={40} />
        <div className={styles.text}>
          <span>Medium Performing Schools</span>
          <h2>{preformanceRecord?.middleLvelPreferenceCount}</h2>
        </div>
      </div>
      <div className={styles.performancebox}>
        <img src="/Frame 5.svg" height={40} />
        <div className={styles.text}>
          <span>Low Performing Schools</span>
          <h2>{preformanceRecord?.lowPreferenceCount}</h2>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSchool;
