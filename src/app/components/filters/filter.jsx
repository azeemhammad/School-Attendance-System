"use client";
import styles from "./filters.module.css";
import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModelSelect from "../modelSelect/model-select";
import { ACCESS_LEVELS } from "@/app/utils/constants";
import translation from "@/app/lang/translation";

const Filters = ({
  user,
  startDate,
  endDate,
  showRestFilters = true,
  onHandleClickLeft,
  onHandleClickRight,
  regionsData,
  onChangeRegions,
  selectedRegions,
  ciscoData,
  onChangeCisco,
  selectedCisco,
  zapData,
  onChangeZap,
  selectedZap,
  performanceData,
  onChangePerformance,
  selectedPerformance,
  onHandleSearch,
  onHandleReset,
  isWeeklyOrFortnightly,
  isEnglish,
}) => {
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
      <div className={styles.wrapperChild}>
        <div className={styles.calenderbox}>
          {showRestFilters ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className={
                  styles.schedule__timeline__weekly__topbar__first__icon__left
                }
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
                className={
                  styles.schedule__timeline__weekly__topbar__first__icon__left
                }
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

            <span>{isEnglish ? translation.en.to : translation.mg.to}</span>
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
            {user?.role_id == ACCESS_LEVELS.super_admin ||
            user?.role_id == ACCESS_LEVELS.country_level ||
            user?.role_id == ACCESS_LEVELS.region_level ? (
              <ModelSelect
                placeholder={
                  isEnglish ? translation.en.region : translation.mg.region
                }
                isMulti
                options={regionsData}
                value={selectedRegions}
                onChange={(value) => {
                  onChangeRegions(value);
                }}
              />
            ) : null}

            {user?.role_id == ACCESS_LEVELS.super_admin ||
            user?.role_id == ACCESS_LEVELS.country_level ||
            user?.role_id == ACCESS_LEVELS.region_level ||
            user?.role_id == ACCESS_LEVELS.cisco_level ? (
              <ModelSelect
                placeholder={
                  isEnglish ? translation.en.cisco : translation.mg.cisco
                }
                isMulti
                options={ciscoData}
                value={selectedCisco}
                onChange={(value) => {
                  onChangeCisco(value);
                }}
              />
            ) : null}

            {user?.role_id == ACCESS_LEVELS.super_admin ||
            user?.role_id == ACCESS_LEVELS.country_level ||
            user?.role_id == ACCESS_LEVELS.region_level ||
            user?.role_id == ACCESS_LEVELS.cisco_level ||
            user?.role_id == ACCESS_LEVELS.zap_level ? (
              <ModelSelect
                placeholder={
                  isEnglish ? translation.en.zap : translation.mg.zap
                }
                isMulti
                options={zapData}
                value={selectedZap}
                onChange={(value) => {
                  onChangeZap(value);
                }}
              />
            ) : null}

            <Select
              options={performanceData}
              className={styles.reactselect}
              styles={Styles}
              placeholder={
                isEnglish
                  ? translation.en.search_by_performance
                  : translation.mg.search_by_performance
              }
              value={selectedPerformance}
              onChange={(value) => onChangePerformance(value)}
            />
            {selectedRegions.length > 0 ||
            selectedCisco.length > 0 ||
            selectedZap.length > 0 ||
            selectedPerformance ? (
              <button className={styles.reset__button} onClick={onHandleReset}>
                <MdOutlineClose
                  style={{ fontSize: "25px", fontWeight: "900" }}
                />
              </button>
            ) : null}
          </>
        ) : null}
      </div>

      <div className={styles.wrapperChild2}>
        {showRestFilters ? (
          <button className={styles.searchbutton} onClick={onHandleSearch}>
            <FiSearch style={{ fontSize: "25px", fontWeight: "900" }} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Filters;
