"use client";
import WeeklyEmployees from "@/app/components/weeklyEmployees/weeklyEmployees";
import styles from "./employee.module.css";
import Weekly0rFortnightly from "@/app/components/weekly-or-fortnightly/weekly";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import FortnightlyEmployees from "@/app/components/fortnightlyemployees/fortnightlyEmployees";
import Filters from "@/app/components/filters/filter";
import { IoArrowBack } from "react-icons/io5";
import { getEtabAttendanceCall } from "@/app/api/educ-presence-photogroupe/repo";
import dayjs from "dayjs";
import ProcessingLoader from "@/app/components/processing-loader";
import translation from "@/app/lang/translation";

const Employees = () => {
  const navigate = useRouter();

  const [state, setState] = useState({
    schoolData: null,
    employeeData: [],
    dates: [],
    startDate: new Date(),
    endDate: new Date(),
    numberOfWeeks: 7,
  })
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWeeklyOrFortnightly, setIsWeeklyOrFortnightly] = useState(2);
  const storedIsEnglish = localStorage.getItem("isEnglish");
  const initialIsEnglish = storedIsEnglish !== null ? JSON.parse(storedIsEnglish) : true;
  const [isEnglish, setIsEnglish] = useState(initialIsEnglish)

  useEffect(() => {
    let data = localStorage.getItem("employeeObject");
    data = JSON.parse(data);
    setState(prevState => ({ ...prevState, startDate: new Date(data.start), endDate: new Date(data.end), numberOfWeeks: data.numberOfWeeks, schoolData: data.schoolData }))
    setIsWeeklyOrFortnightly(data.numberOfWeeks == 7 ? 1 : 2)
  }, [])

  useEffect(() => {
    if (state.startDate && state.endDate && state.schoolData) {
      generatesDates();
      getEtabRecord();
    }
  }, [isWeeklyOrFortnightly, state.startDate, state.endDate, state.schoolData])

  function generatesDates() {
    // Generate an array of dates for the specified number of weeks
    const newDates = [];
    for (let i = 0; i < state.numberOfWeeks; i++) {
      const date = new Date(state.startDate);
      date.setDate(state.startDate.getDate() + i); // Increment the date by 14 days
      newDates.push(date);
    }
    setState((prevState) => ({ ...prevState, dates: newDates }));
  }

  function getEtabRecord() {
    setIsProcessing(true);
    getEtabAttendanceCall(
      dayjs(state.startDate).format("YYYY-MM-DD"),
      dayjs(state.endDate).format("YYYY-MM-DD"),
      state.schoolData.code_etab
    ).then(({ data }) => {
      setIsProcessing(false);
      if (data.error_code == 0)
        setState(prevState => ({ ...prevState, employeeData: data.result }))
      else
        setState(prevState => ({ ...prevState, employeeData: [] }))
    }).catch(err => {
      console.log("err", err);
      setIsProcessing(false);
    })
  }

  return (
    <>
      <Filters
        startDate={state.startDate}
        endDate={state.endDate}
        showRestFilters={false}
      />
      {/* <Weekly0rFortnightly setIsWeeklyOrFortnightly={setIsWeeklyOrFortnightly} isWeeklyOrFortnightly={isWeeklyOrFortnightly} /> */}
      <div className={styles.wrapper}>
        <div className={styles.schoolname}>
          <div
            className={styles.backbutton}
            onClick={() => navigate.push("/dashboard")}
          >
            <IoArrowBack style={{ color: "grey" }} />
          </div>
          <span>{state.schoolData?.name_etab}</span>
        </div>
        <div className={styles.location}>
          <span>{isEnglish ? translation.en.home : translation.mg.home}</span>
          <IoIosArrowForward />
          {isWeeklyOrFortnightly === 1 && <span>{isEnglish ? translation.en.weekly : translation.mg.weekly}</span>}
          {isWeeklyOrFortnightly === 2 && <span>{isEnglish ? translation.en.fortnightly : translation.mg.fortnightly}</span>}
          <IoIosArrowForward />
          <span>{isEnglish ? translation.en.employees : translation.mg.employees}</span>
        </div>
        <div style={{ marginTop: "10px" }}>
          {isWeeklyOrFortnightly === 1 &&
            <WeeklyEmployees
              employeeData={state.employeeData}
              dates={state.dates}
              startDate={state.startDate}
              endDate={state.endDate}
              isEnglish={isEnglish}
            />}
          {isWeeklyOrFortnightly === 2 &&
            <FortnightlyEmployees
              employeeData={state.employeeData}
              dates={state.dates}
              startDate={state.startDate}
              endDate={state.endDate}
              isEnglish={isEnglish}
            />}
        </div>
      </div>
      {isProcessing && <ProcessingLoader />}
    </>
  );
};

export default Employees;
