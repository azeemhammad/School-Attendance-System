"use client";
import { useRouter } from "next/navigation";
import styles from "../../dashboard/dashboard.module.css";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import Pagination from "react-js-pagination";
import { getAbsentEtabCall } from "@/app/api/educ-presence-photogroupe/repo";
import ProcessingLoader from "../processing-loader";

const WeeklySchool = ({
  recordSubmissionData,
  dates,
  page,
  limit,
  totalRecords,
  onHandlePageChange,
}) => {
  const navigate = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const getColorForPerformance = (performance) => {
    if (performance <= 20) return styles.lowPerforming;
    else if (performance > 20 && performance <= 60) return styles.mediumPerforming;
    else if (performance > 60) return styles.highPerforming;
    else return "";

    // switch (performance) {
    //   case "High Performing":
    //     return styles.highPerforming;
    //   case "Medium Performing":
    //     return styles.mediumPerforming;
    //   case "Low Performing":
    //     return styles.lowPerforming;
    //   default:
    //     return "";
    // }
  };

  function getImagesRecord(startDate, endDate, item, name_csb) {
    // setIsProcessing(true);
    getAbsentEtabCall(
      dayjs(startDate).format("YYYY-MM-DD"),
      dayjs(endDate).format("YYYY-MM-DD"),
      item.deviceid
    )
      .then(({ data }) => {
        setIsProcessing(false);
        if (data.error_code == 0 && data.result) {
          let object = {
            start: startDate,
            end: endDate,
            imagesNameData: data.result,
            school_name: name_csb,
          };
          localStorage.setItem("galleryImagesData", JSON.stringify(object));
          navigate.push("/dashboard/gallery");
        } else alert("No images found");
      })
      .catch((err) => {
        console.log("err", err);
        setIsProcessing(false);
      });
  }

  return (
    <div>
      <div className={styles.schools}>
        <div className={styles.school}>
          <span style={{ color: "white", fontWeight: "600" }}>School</span>
        </div>
        {dates.map((item) => (
          <div className={styles.school}>
            <span style={{ color: "white", fontWeight: "600" }}>{item.label}</span>
            <span style={{ color: "#FBBC04", fontSize: "14px" }}>
              {dayjs(item.start).format("DD MMM, YYYY")}
            </span>
          </div>
        ))}
      </div>

      {recordSubmissionData.map((item, index) => (
        <div key={index} className={styles.greenfield}>
          <div className={styles.greenfieldcontent}>
            <span className={styles.schoolname}>{item.name_etab}</span>
          </div>
          <div className={styles.greenfieldcontent}>
            <div className={styles.countandpercentage}>
              <span>
                {item.week01_present_records} of {item.week01_total_records}
              </span>
              <p>{item.week01_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.week01_percentage)}`}>
              {item.week01_percentage <= 20
                ? "Low Performing"
                : item.week01_percentage > 20 && item.week01_percentage <= 60
                ? "Medium Performing"
                : item.week01_percentage > 60
                ? "High Performing"
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week01_percentage > 0) {
                    getImagesRecord(dates[0].start, dates[0].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                View Gallery
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week01_percentage > 0) {
                    let object = {
                      start: dates[0].start,
                      end: dates[0].end,
                      schoolData: item,
                      numberOfWeeks: 7,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  } else alert("No records to show.");
                }}
              >
                View Records
              </div>
              {/* <div>
                <Link
                  href={{
                    pathname: "/dashboard/employees",
                    query: { schoolname: item.name_etab, timeperiod: 1 },
                  }}
                  className={styles.link}
                >
                  View Records
                </Link>
              </div> */}
            </div>
          </div>

          <div className={styles.greenfieldcontent}>
            <div className={styles.countandpercentage}>
              <span>
                {item.week02_present_records} of {item.week02_total_records}
              </span>
              <p>{item.week02_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.week02_percentage)}`}>
              {item.week02_percentage <= 20
                ? "Low Performing"
                : item.week02_percentage > 20 && item.week02_percentage <= 60
                ? "Medium Performing"
                : item.week02_percentage > 60
                ? "High Performing"
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week02_percentage > 0) {
                    getImagesRecord(dates[1].start, dates[1].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                View Gallery
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week02_percentage > 0) {
                    let object = {
                      start: dates[1].start,
                      end: dates[1].end,
                      schoolData: item,
                      numberOfWeeks: 7,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  } else alert("No records to show.");
                }}
              >
                View Records
              </div>
            </div>
          </div>

          <div className={styles.greenfieldcontent}>
            <div className={styles.countandpercentage}>
              <span>
                {item.week03_present_records} of {item.week03_total_records}
              </span>
              <p>{item.week03_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.week03_percentage)}`}>
              {item.week03_percentage <= 20
                ? "Low Performing"
                : item.week03_percentage > 20 && item.week03_percentage <= 60
                ? "Medium Performing"
                : item.week03_percentage > 60
                ? "High Performing"
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week03_percentage > 0) {
                    getImagesRecord(dates[2].start, dates[2].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                View Gallery
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week03_percentage > 0) {
                    let object = {
                      start: dates[2].start,
                      end: dates[2].end,
                      schoolData: item,
                      numberOfWeeks: 7,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  } else alert("No records to show.");
                }}
              >
                View Records
              </div>
            </div>
          </div>

          <div className={styles.greenfieldcontent}>
            <div className={styles.countandpercentage}>
              <span>
                {item.week04_present_records} of {item.week04_total_records}
              </span>
              <p>{item.week04_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.week04_percentage)}`}>
              {item.week04_percentage <= 20
                ? "Low Performing"
                : item.week04_percentage > 20 && item.week04_percentage <= 60
                ? "Medium Performing"
                : item.week04_percentage > 60
                ? "High Performing"
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week04_percentage > 0) {
                    getImagesRecord(dates[3].start, dates[3].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                View Gallery
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week04_percentage > 0) {
                    let object = {
                      start: dates[3].start,
                      end: dates[3].end,
                      schoolData: item,
                      numberOfWeeks: 7,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  } else alert("No records to show.");
                }}
              >
                View Records
              </div>
            </div>
          </div>

          <div className={styles.greenfieldcontent}>
            <div className={styles.countandpercentage}>
              <span>
                {item.week05_present_records} of {item.week05_total_records}
              </span>
              <p>{item.week05_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.week05_percentage)}`}>
              {item.week05_percentage <= 20
                ? "Low Performing"
                : item.week05_percentage > 20 && item.week05_percentage <= 60
                ? "Medium Performing"
                : item.week05_percentage > 60
                ? "High Performing"
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week05_percentage > 0) {
                    getImagesRecord(dates[4].start, dates[4].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                View Gallery
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.week05_percentage > 0) {
                    let object = {
                      start: dates[4].start,
                      end: dates[4].end,
                      schoolData: item,
                      numberOfWeeks: 7,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  } else alert("No records to show.");
                }}
              >
                View Records
              </div>
            </div>
          </div>
        </div>
      ))}
      {recordSubmissionData.length > 0 ? (
        <div className={"list__container__pagination"}>
          <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={5}
            onChange={onHandlePageChange}
          />
        </div>
      ) : null}
      {isProcessing && <ProcessingLoader />}
    </div>
  );
};

export default WeeklySchool;
