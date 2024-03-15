import translation from "@/app/lang/translation";
import styles from "../../styles/weeklyemployees.module.css";
import dayjs from "dayjs";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

const WeeklyEmployees = ({ employeeData, dates, startDate, endDate, isEnglish }) => {
  const getColorForAttendance = (status, reason) => {
    if (status == 1 || status == 2) return styles.present;
    else if (status == 0 && !reason) return styles.absent;
    else return "";
    // switch (status) {
    //   case "Present":
    //     return styles.present;
    //   case "Absent":
    //     return styles.absent;
    //   default:
    //     return "";
    // }
  };

  return (
    <>
      {/* {employees.map((item) => ( */}
      <div className={styles.employees}>
        <div className={styles.employee}>
          <span style={{ color: "white", fontWeight: "600" }}>
            {isEnglish ? translation.en.employees : translation.mg.employees}
          </span>
        </div>
        {dates.map((x, i) => (
          <div className={styles.employee2}>
            <div className={styles.date}>
              <span
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {/* {x.date} */}
                {dayjs(x).format("DD")}
              </span>
              <div className={styles.dayandmonth}>
                <span
                  style={{
                    color: "#FBBC04",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {/* {x.day} */}
                  {dayjs(x).format("dddd")}
                </span>
                <span
                  style={{
                    color: "#FBBC04",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {/* {x.month} */}
                  {dayjs(x).format("MMM")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ))} */}

      {employeeData.map((item, index) => (
        <div key={index} className={styles.employees}>
          <div
            className={styles.attendance}
            style={{
              backgroundColor: item.employee_type == 1 ? "#C1E1C1" : "#FFFFE0",
              color: "grey",
            }}
          >
            {/* <img src={item.image} style={{ width: "30px", height: "30px", borderRadius: 100 }} /> */}
            <span style={{ fontWeight: "600" }}>{item.employee_name}</span>
          </div>
          {item.present.map((x, i) => (
            <div key={i} className={`${getColorForAttendance(x.is_present, x.reason)}`}>
              <div className={styles.reason}>
                <div className={styles.iconandstatus}>
                  <div>
                    {x.is_present == 1 || x.is_present == 2 ? (
                      <FaCircleCheck />
                    ) : (
                      <IoIosCloseCircle size={25} />
                    )}
                  </div>
                  <span>
                    {x.is_present == 1 || x.is_present == 2
                      ? isEnglish
                        ? translation.en.present
                        : translation.mg.present
                      : x.is_present == 0
                      ? isEnglish
                        ? translation.en.absent
                        : translation.mg.absent
                      : ""}
                  </span>
                </div>

                <p>{x.reason}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default WeeklyEmployees;
