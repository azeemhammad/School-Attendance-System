"use client";
import styles from "../../dashboard/dashboard.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Pagination from "react-js-pagination";
import { getAbsentEtabCall } from "@/app/api/educ-presence-photogroupe/repo";
import { useState } from "react";
import ProcessingLoader from "../processing-loader";
import translation from "@/app/lang/translation";

const FortnightlySchool = ({
  recordSubmissionData,
  dates,
  page,
  limit,
  totalRecords,
  onHandlePageChange,
  isEnglish,
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
          <span style={{ color: "white", fontWeight: "600" }}>
            {isEnglish ? translation.en.schools : translation.mg.schools}
          </span>
        </div>
        {dates.map((item) => (
          <div className={styles.schoolfortnightly}>
            <span style={{ color: "white", fontWeight: "600" }}>
              {isEnglish ? translation.en.fortnightly : translation.mg.fortnightly}
            </span>
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

          <div className={styles.greenfieldcontentfortnightly}>
            <div className={styles.countandpercentage}>
              <span>
                {item.fortnightly01_present_records} of {item.fortnightly01_total_records}
              </span>
              <p>{item.fortnightly01_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.fortnightly01_percentage)}`}>
              {item.fortnightly01_percentage <= 20
                ? isEnglish
                  ? translation.en.low_performing
                  : translation.mg.low_performing
                : item.fortnightly01_percentage > 20 && item.fortnightly01_percentage <= 60
                ? isEnglish
                  ? translation.en.medium_performing
                  : translation.mg.medium_performing
                : item.fortnightly01_percentage > 60
                ? isEnglish
                  ? translation.en.high_performing
                  : translation.mg.high_performing
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.fortnightly01_percentage > 0) {
                    getImagesRecord(dates[0].start, dates[0].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                {isEnglish ? translation.en.view_gallery : translation.mg.view_gallery}
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.fortnightly01_percentage > 0) {
                    let object = {
                      start: dates[0].start,
                      end: dates[0].end,
                      schoolData: item,
                      numberOfWeeks: 14,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  }
                }}
              >
                {isEnglish ? translation.en.view_records : translation.mg.view_records}
              </div>
              {/* <div>
                <Link
                  href={{
                    pathname: "/dashboard/employees",
                    query: { schoolname: item.schoolname, timeperiod: 2 },
                  }}
                  className={styles.link}
                >
                  View Records
                </Link>
              </div> */}
            </div>
          </div>

          <div className={styles.greenfieldcontentfortnightly}>
            <div className={styles.countandpercentage}>
              <span>
                {item.fortnightly02_present_records} of {item.fortnightly02_total_records}
              </span>
              <p>{item.fortnightly02_percentage}%</p>
            </div>
            <div className={`${getColorForPerformance(item.fortnightly02_percentage)}`}>
              {item.fortnightly02_percentage <= 20
                ? isEnglish
                  ? translation.en.low_performing
                  : translation.mg.low_performing
                : item.fortnightly02_percentage > 20 && item.fortnightly02_percentage <= 60
                ? isEnglish
                  ? translation.en.medium_performing
                  : translation.mg.medium_performing
                : item.fortnightly02_percentage > 60
                ? isEnglish
                  ? translation.en.high_performing
                  : translation.mg.high_performing
                : ""}
            </div>
            <div className={styles.greenfieldbuttons}>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.fortnightly02_percentage > 0) {
                    getImagesRecord(dates[1].start, dates[1].end, item, item.name_etab);
                  } else alert("No images to show.");
                }}
              >
                {isEnglish ? translation.en.view_gallery : translation.mg.view_gallery}
              </div>
              <div
                style={{ borderRight: "1px solid #d8d2d2" }}
                onClick={() => {
                  if (item.fortnightly02_percentage > 0) {
                    let object = {
                      start: dates[1].start,
                      end: dates[1].end,
                      schoolData: item,
                      numberOfWeeks: 14,
                    };
                    localStorage.setItem("employeeObject", JSON.stringify(object));
                    navigate.push(`/dashboard/employees?${item.name_etab}`);
                  }
                }}
              >
                {isEnglish ? translation.en.view_records : translation.mg.view_records}
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

export default FortnightlySchool;
