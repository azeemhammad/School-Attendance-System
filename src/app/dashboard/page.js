"use client";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import Weekly0rFortnightly from "../components/weekly-or-fortnightly/weekly";
import WeeklySchool from "../components/weeklySchool/weeklySchool";
import FortnightlySchool from "../components/fortnightlySchool/fortnightlySchool";
import PerformanceSchool from "../components/performanceSchool/performanceSchool";
import WeeklyEmployees from "../components/weeklyEmployees/weeklyEmployees";
import Filters from "../components/filters/filter";
import { getRecordSubmissionCall } from "../api/educ-etablissement/repo";
import { eachWeekOfInterval, endOfMonth, startOfMonth } from "date-fns";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import ProcessingLoader from "../components/processing-loader";

const DashboardHome = () => {
  const [isWeeklyOrFortnightly, setIsWeeklyOrFortnightly] = useState(1);

  let [state, setState] = useState({
    preformanceRecord: null,
    recordSubmissionData: [],
    selectedRegions: [],
    selectedCisco: [],
    selectedZap: [],
    selectedPerformance: null,
    dates: [],
    startDate: null,
    endDate: null,
    page: 1,
    limit: 10,
    totalRecords: 0,
    randomNumber: 0,
  })
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isWeeklyOrFortnightly === 1) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      setState((prevState) => ({
        ...prevState,
        startDate: new Date(year, month, 1),
        endDate: new Date(year, month + 1, 0),
        randomNumber: Math.random(),
      }));
    }
  }, [isWeeklyOrFortnightly]);

  useEffect(() => {
    if (state.startDate && isWeeklyOrFortnightly === 1) getWeeksInMonth();
    else if (state.startDate && isWeeklyOrFortnightly === 2) {
      calculateFortnightlyDates();
    }
  }, [state.randomNumber, isWeeklyOrFortnightly]);

  useEffect(() => {
    if (state.startDate && state.endDate && state.dates.length > 0)
      getRecordSubmission()
  }, [isWeeklyOrFortnightly, state.dates, state.page])

  function getWeeksInMonth() {
    let currentDate = new Date(state.startDate);
    let startDate = startOfMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    let endDate = endOfMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
    const weeksInYear = eachWeekOfInterval({ start: startDate, end: endDate });
    let newWeeksArray = [];
    for (let index = 0; index < weeksInYear.length; index++) {
      const element = weeksInYear[index];
      let object = {
        // label: `${dayjs(element).format("DD MMM, YYYY")} - ${dayjs(element)
        //   .add(6, "days")
        //   .format("DD MMM, YYYY")}`,
        label: `${index + 1} Week`,
        start: element,
        end: new Date(dayjs(element).add(6, "days").format("YYYY-MM-DD")),
        value: element,
      };
      newWeeksArray.push(object);
    }
    setState((prevState) => ({
      ...prevState,
      dates: newWeeksArray.length > 5 ? newWeeksArray.slice(0, 5) : newWeeksArray,
    }));
  }

  const calculateFortnightlyDates = () => {
    const startDate = state.startDate;
    const fortnightlyDateRanges = [];

    for (let i = 0; i < 2; i++) {
      // Loop for two fortnights
      const rangeStartDate = new Date(startDate);
      const rangeEndDate = new Date(startDate);
      rangeStartDate.setDate(rangeStartDate.getDate() + i * 14); // Start of fortnight
      rangeEndDate.setDate(rangeEndDate.getDate() + i * 14 + 13); // End of fortnight

      fortnightlyDateRanges.push({
        label: `${i + 1} Week`,
        start: rangeStartDate,
        end: rangeEndDate,
        value: rangeStartDate,
      });
    }
    setState((prevState) => ({
      ...prevState,
      dates: fortnightlyDateRanges,
      startDate: fortnightlyDateRanges[0].start,
      endDate: fortnightlyDateRanges[1].end,
    }));
  };

  function getRecordSubmission() {
    setIsProcessing(true);
    getRecordSubmissionCall(
      state.selectedRegions ? state.selectedRegions.map(x => x.value).join(",") : "",
      state.selectedCisco ? state.selectedCisco.map(x => x.value).join(",") : "",
      state.selectedZap ? state.selectedZap.map(x => x.value).join(",") : "",
      "",
      state.selectedPerformance ? state.selectedPerformance.value : null,
      isWeeklyOrFortnightly === 1 ? dayjs(state.dates[0].start).format("YYYY-MM-DD") : dayjs(state.startDate).format("YYYY-MM-DD"),
      isWeeklyOrFortnightly === 1 ? dayjs(state.dates[4].end).format("YYYY-MM-DD") : dayjs(state.endDate).format("YYYY-MM-DD"),
      isWeeklyOrFortnightly,
      state.page,
      state.limit
    ).then(({ data }) => {
      setIsProcessing(false);
      if (data.error_code == 0)
        setState(prevState => ({ ...prevState, recordSubmissionData: data.result.result, preformanceRecord: data.result.preference, totalRecords: data.total_records }))
      else
        setState(prevState => ({ ...prevState, recordSubmissionData: [], preformanceRecord: null, totalRecords: 0 }))
    }).catch(err => {
      console.log("err", err);
      setIsProcessing(false);
    })
  }

  function onHandleClickLeft() {
    if (isWeeklyOrFortnightly === 1) {
      let newStartDate = new Date(state.startDate);
      let newEndDate = new Date(state.endDate);

      setState((prevState) => ({
        ...prevState,
        endDate: new Date(newStartDate.getFullYear(), newStartDate.getMonth(), 0),
        startDate: new Date(newEndDate.getFullYear(), newEndDate.getMonth() - 1, 1),
        dates: [],
        page: 1,
        randomNumber: Math.random(),
      }));
    } else {
      let newStartDate = state.startDate;
      setState((prevState) => ({
        ...prevState,
        startDate: new Date(newStartDate.setDate(newStartDate.getDate() - 28)),
        endDate: null,
        randomNumber: Math.random(),
      }));
    }
  }

  function onHandleClickRight() {
    if (isWeeklyOrFortnightly === 1) {
      let newStartDate = new Date(state.startDate);
      let newEndDate = new Date(state.endDate);

      setState((prevState) => ({
        ...prevState,
        endDate: new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 2, 0),
        startDate: new Date(newEndDate.getFullYear(), newEndDate.getMonth() + 1, 1),
        dates: [],
        page: 1,
        randomNumber: Math.random(),
      }));
    } else {
      let newEndDate = state.endDate;
      setState((prevState) => ({
        ...prevState,
        startDate: new Date(newEndDate.setDate(newEndDate.getDate() + 1)),
        endDate: null,
        randomNumber: Math.random(),
      }));
    }
  }

  return (
    <>
      <Filters
        startDate={state.startDate}
        endDate={state.endDate}
        onHandleClickLeft={onHandleClickLeft}
        onHandleClickRight={onHandleClickRight}
        onChangeRegions={(value) => setState(prevState => ({ ...prevState, selectedRegions: value }))}
        selectedRegions={state.selectedRegions}
        onChangeCisco={(value) => setState(prevState => ({ ...prevState, selectedCisco: value }))}
        selectedCisco={state.selectedCisco}
        onChangeZap={(value) => setState(prevState => ({ ...prevState, selectedZap: value }))}
        selectedZap={state.selectedZap}
        onChangePerformance={(value) => setState(prevState => ({ ...prevState, selectedPerformance: value }))}
        selectedPerformance={state.selectedPerformance}
        onHandleSearch={getRecordSubmission}
        onHandleReset={() => {
          setState(prevState => ({ ...prevState, selectedRegions: state.selectedRegions = [], selectedCisco: state.selectedCisco = [], selectedZap: state.selectedZap = [], selectedPerformance: state.selectedPerformance = null }));
          setTimeout(() => {
            getRecordSubmission();
          }, 500);
        }}
        isWeeklyOrFortnightly={isWeeklyOrFortnightly}
      />
      <Weekly0rFortnightly
        setIsWeeklyOrFortnightly={(value) => {
          setState(prevState => ({ ...prevState, recordSubmissionData: [], preformanceRecord: null, totalRecords: 0, startDate: value === 1 ? null : startOfMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), endDate: null, dates: [] }))
          setIsWeeklyOrFortnightly(value);
        }}
        isWeeklyOrFortnightly={isWeeklyOrFortnightly}
      />
      <div className={styles.container}>
        <PerformanceSchool preformanceRecord={state.preformanceRecord} />
        {isWeeklyOrFortnightly === 1 &&
          <WeeklySchool
            recordSubmissionData={state.recordSubmissionData}
            dates={state.dates}
            page={state.page}
            limit={state.limit}
            totalRecords={state.totalRecords}
            onHandlePageChange={(value) => setState((prevState) => ({ ...prevState, page: value }))}
          />
        }
        {isWeeklyOrFortnightly === 2 &&
          <FortnightlySchool
            recordSubmissionData={state.recordSubmissionData}
            dates={state.dates}
            page={state.page}
            limit={state.limit}
            totalRecords={state.totalRecords}
            onHandlePageChange={(value) => setState((prevState) => ({ ...prevState, page: value }))}
          />
        }
      </div>
      {isProcessing && <ProcessingLoader />}
    </>
  );
};

export default DashboardHome;
