"use client";
import { DistrictOptions, PerformanceOptions, regionOptions } from "@/app/utils/options";
import styles from "./filters.module.css";
import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
  getAllCiscoByRegionIdCall,
  getAllRegionsCall,
  getAllZapByCiscoIdCall,
} from "@/app/api/educ-etablissement/repo";
import ModelSelect from "../modelSelect/model-select";

const Filters = ({
  startDate,
  endDate,
  showRestFilters = true,
  onHandleClickLeft,
  onHandleClickRight,
  onChangeRegions,
  selectedRegions,
  onChangeCisco,
  selectedCisco,
  onChangeZap,
  selectedZap,
  onChangePerformance,
  selectedPerformance,
  onHandleSearch,
  onHandleReset,
  isWeeklyOrFortnightly,
}) => {
  const [state, setState] = useState({
    regionsData: [],
    ciscoData: [],
    zapData: [],
    performanceData: [
      { value: 1, label: "High" },
      { value: 2, label: "Medium" },
      { value: 3, label: "Low" },
    ],
  });

  useEffect(() => {
    if (isWeeklyOrFortnightly) {
      onChangeRegions([]);
      onChangeCisco([]);
      onChangeZap([]);
      onChangePerformance(null);
    }
  }, [isWeeklyOrFortnightly]);

  useEffect(() => {
    if (showRestFilters) getRegions();
  }, []);

  function getRegions() {
    getAllRegionsCall(1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({ ...prevState, regionsData: data.result }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function getCisco(value) {
    getAllCiscoByRegionIdCall(value.map((x) => x.value).join(","), 1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({ ...prevState, ciscoData: data.result }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function getZap(value) {
    getAllZapByCiscoIdCall(value.map((x) => x.value).join(","), 1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({ ...prevState, zapData: data.result }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const Styles = {
    control: (provided) => ({
      display: "flex",
      height: "45px",
      width: "220px",
      alignItems: "center",
      fontSize: "14px",
    }),
    indicatorSeparator: () => null,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.calenderbox}>
        {showRestFilters ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className={styles.schedule__timeline__weekly__topbar__first__icon__left}
              onClick={onHandleClickLeft}
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L2.06061 8.06061C1.47727 7.47727 1.47727 6.52273 2.06061 5.93939L7 1"
                  stroke="#CA3202"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              className={styles.schedule__timeline__weekly__topbar__first__icon__left}
              onClick={onHandleClickRight}
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13L5.93939 8.06061C6.52273 7.47727 6.52273 6.52273 5.93939 5.93939L1 1"
                  stroke="#CA3202"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        ) : null}
        <div className={styles.daterange}>
          <img src="/calender.svg" />
          <span>From</span>
          <ReactDatePicker
            dateFormat="MMM d, yyyy"
            selected={startDate}
            disabled
            // onChange={(date) => setStartDate(date)}
          />

          <span>to</span>
          <ReactDatePicker
            dateFormat="MMM d, yyyy"
            selected={endDate}
            disabled
            // onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      {showRestFilters ? (
        <>
          <ModelSelect
            placeholder={"Region"}
            isMulti
            options={state.regionsData}
            value={selectedRegions}
            onChange={(value) => {
              onChangeRegions(value);
              setState((prevState) => ({ ...prevState, ciscoData: [], zapData: [] }));
              if (value.length > 0) getCisco(value);
              onChangeCisco([]);
              onChangeZap([]);
            }}
          />

          <ModelSelect
            placeholder={"Cisco"}
            isMulti
            options={state.ciscoData}
            value={selectedCisco}
            onChange={(value) => {
              onChangeCisco(value);
              setState((prevState) => ({ ...prevState, zapData: [] }));
              if (value.length > 0) getZap(value);
              onChangeZap([]);
            }}
          />

          <ModelSelect
            placeholder={"Zap"}
            isMulti
            options={state.zapData}
            value={selectedZap}
            onChange={(value) => {
              onChangeZap(value);
            }}
          />

          {/* <Select
        options={state.regionsData}
        placeholder="Search by Region"
        className={styles.reactselect}
        styles={Styles}
        isMulti
        onChange={(value) => {
          console.log("value", value);
        }}
      /> */}
          {/* <Select
        options={DistrictOptions}
        placeholder="Search by Cisco"
        className={styles.reactselect}
        styles={Styles}
        isMulti
      /> */}
          {/* <Select
        options={DistrictOptions}
        styles={Styles}
        className={styles.reactselect}
        placeholder="Search by Zap"
        isMulti
      /> */}
          <Select
            options={state.performanceData}
            className={styles.reactselect}
            styles={Styles}
            placeholder="Search by Performance"
            value={selectedPerformance}
            onChange={(value) => onChangePerformance(value)}
          />
          {selectedRegions.length > 0 ||
          selectedCisco.length > 0 ||
          selectedZap.length > 0 ||
          selectedPerformance ? (
            <button className={styles.reset__button} onClick={onHandleReset}>
              <MdOutlineClose style={{ fontSize: "25px", fontWeight: "900" }} />
            </button>
          ) : null}
          <button className={styles.searchbutton} onClick={onHandleSearch}>
            <FiSearch style={{ fontSize: "25px", fontWeight: "900" }} />
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Filters;
