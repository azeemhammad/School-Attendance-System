import translation from "@/app/lang/translation";
import styles from "../../dashboard/dashboard.module.css";

const PerformanceSchool = ({ preformanceRecord, isEnglish }) => {
  return (
    <div className={styles.performanceboxes}>
      <div className={styles.performancebox}>
        <div className={styles.performanceboxImgContainer}>
          <img src="/Frame 3.svg" className={styles.performanceboxImg} />
        </div>

        <div className={styles.text}>
          <span>
            {isEnglish
              ? translation.en.high_performing_schools
              : translation.mg.high_performing_schools}
          </span>
          <h2>{preformanceRecord?.highPreferenceCount}</h2>
        </div>
      </div>
      <div className={styles.performancebox}>
        <div className={styles.performanceboxImgContainer}>
          <img src="/Frame 4.svg" className={styles.performanceboxImg} />
        </div>
        <div className={styles.text}>
          <span>
            {isEnglish
              ? translation.en.medium_performing_schools
              : translation.mg.medium_performing_schools}
          </span>
          <h2>{preformanceRecord?.middleLvelPreferenceCount}</h2>
        </div>
      </div>
      <div className={styles.performancebox}>
        <div className={styles.performanceboxImgContainer}>
          <img src="/Frame 5.svg" className={styles.performanceboxImg} />
        </div>
        <div className={styles.text}>
          <span>
            {isEnglish
              ? translation.en.Low_performing_schools
              : translation.mg.Low_performing_schools}
          </span>
          <h2>{preformanceRecord?.lowPreferenceCount}</h2>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSchool;
