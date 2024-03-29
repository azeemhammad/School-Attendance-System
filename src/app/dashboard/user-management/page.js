"use client";
import styles from "./usermanagement.module.css";
import { IoArrowBack } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import {
  addEmployeeCall,
  employeeDeleteCall,
  getAllUsersCall,
} from "@/app/api/user/repo";
import ProcessingLoader from "@/app/components/processing-loader";
import { ACCESS_LEVELS } from "@/app/utils/constants";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  getAllCiscoByRegionIdCall,
  getAllRegionsCall,
  getAllZapByCiscoIdCall,
} from "@/app/api/educ-etablissement/repo";
import { isInvalidEmail } from "@/app/utils/validations";
import Pagination from "react-js-pagination";
import translation from "@/app/lang/translation";

const UserManagenemt = () => {
  const navigate = useRouter();

  let [state, setState] = useState({
    employees: [],
    selectedEmployee: null,
    name: "",
    email: "",
    accessLevels: [
      { label: "Country Level", value: ACCESS_LEVELS.country_level },
      { label: "Region Level", value: ACCESS_LEVELS.region_level },
      { label: "Cisco Level", value: ACCESS_LEVELS.cisco_level },
      { label: "Zap Level", value: ACCESS_LEVELS.zap_level },
    ],
    selectedAccessLevel: null,
    regionsData: [],
    selectedRegions: [],
    ciscoData: [],
    selectedCiscos: [],
    zapData: [],
    selectedZaps: [],
    password: "",
    confirmPassword: "",
    page: 1,
    limit: 10,
    totalRecords: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingAddEditUser, setIsProcessingAddEditUser] = useState(false);
  const [isUserAddOrEditModel, setIsUserAddOrEditModel] = useState(false);
  const [modalIsOpenDelete, setModelIsOpenDelete] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const storedIsEnglish = localStorage.getItem("isEnglish");
    const initialIsEnglish =
      storedIsEnglish !== null ? JSON.parse(storedIsEnglish) : true;
    setIsEnglish(initialIsEnglish);
  }, []);

  useEffect(() => {
    getUsers();
  }, [state.page]);

  useEffect(() => {
    if (state.selectedEmployee && isUserAddOrEditModel) {
      if (state.selectedEmployee.regions.length > 0) getRegions();
      if (state.selectedEmployee.Cisco.length > 0)
        getCisco(state.selectedEmployee.regions);
      if (state.selectedEmployee.Zap.length > 0)
        getZap(state.selectedEmployee.Cisco);
      setState((prevState) => ({
        ...prevState,
        name: state.selectedEmployee.name,
        email: state.selectedEmployee.email,
        selectedAccessLevel: {
          label:
            state.selectedEmployee.role_id == ACCESS_LEVELS.country_level
              ? "Country Level"
              : state.selectedEmployee.role_id == ACCESS_LEVELS.region_level
              ? "Region Level"
              : state.selectedEmployee.role_id == ACCESS_LEVELS.cisco_level
              ? "Cisco Level"
              : "Zap Level",
          value: state.selectedEmployee.role_id,
        },
        selectedRegions: state.selectedEmployee.regions,
        selectedCiscos: state.selectedEmployee.Cisco,
        selectedZaps: state.selectedEmployee.Zap,
      }));
    }
  }, [state.selectedEmployee, isUserAddOrEditModel]);

  function getUsers() {
    setIsProcessing(true);
    getAllUsersCall(state.page, state.limit)
      .then(({ data }) => {
        setIsProcessing(false);
        if (data.error_code == 0)
          setState((prevState) => ({
            ...prevState,
            employees: data.result,
            totalRecords: data.total_records,
          }));
        else
          setState((prevState) => ({
            ...prevState,
            employees: [],
            totalRecords: 0,
          }));
      })
      .catch((err) => {
        console.log("err", err);
        setIsProcessing(false);
        setState((prevState) => ({
          ...prevState,
          employees: [],
          totalRecords: 0,
        }));
      });
  }

  function getRegions() {
    getAllRegionsCall(1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({
            ...prevState,
            regionsData: (state.regionsData = data.result),
          }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function getCisco(value) {
    getAllCiscoByRegionIdCall(value.map((x) => x.value).join(","), 1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({
            ...prevState,
            ciscoData: (state.ciscoData = data.result),
          }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function getZap(value) {
    getAllZapByCiscoIdCall(value.map((x) => x.value).join(","), 1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({
            ...prevState,
            zapData: (state.zapData = data.result),
          }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const isViewValid = () => {
    if (!state.name)
      alertVisibility(
        isEnglish
          ? translation.en.please_enter_name
          : translation.mg.please_enter_name
      );
    else if (!state.email)
      alertVisibility(
        isEnglish
          ? translation.en.please_enter_email
          : translation.mg.please_enter_email
      );
    else if (isInvalidEmail(state.email))
      alertVisibility(
        isEnglish
          ? translation.en.please_enter_valid_email
          : translation.mg.please_enter_valid_email
      );
    else if (!state.selectedAccessLevel)
      alertVisibility(
        isEnglish
          ? translation.en.please_select_access_level
          : translation.mg.please_select_access_level
      );
    else if (
      (state.selectedAccessLevel.value == ACCESS_LEVELS.region_level ||
        state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level ||
        state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level) &&
      state.selectedRegions.length == 0
    )
      alertVisibility(
        isEnglish
          ? translation.en.please_select_regions
          : translation.mg.please_select_regions
      );
    else if (
      (state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level ||
        state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level) &&
      state.selectedCiscos.length == 0
    )
      alertVisibility(
        isEnglish
          ? translation.en.please_select_ciscos
          : translation.mg.please_select_ciscos
      );
    else if (
      state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level &&
      state.selectedZaps.length == 0
    )
      alertVisibility(
        isEnglish
          ? translation.en.please_select_zaps
          : translation.mg.please_select_access_level
      );
    else if (!state.selectedEmployee) {
      if (!state.password)
        alertVisibility(
          isEnglish
            ? translation.en.please_enter_password
            : translation.mg.please_enter_password
        );
      else if (state.password.length < 6)
        alertVisibility(
          "Please enter a password with a minimum of 6 characters"
        );
      else if (!state.confirmPassword)
        alertVisibility(
          isEnglish
            ? translation.en.enter_confirm_password
            : translation.mg.enter_confirm_password
        );
      else if (state.password != state.confirmPassword)
        alertVisibility(
          isEnglish
            ? translation.en.Password_does_not_match
            : translation.mg.Password_does_not_match
        );
      else return true;
    } else return true;
    return false;
  };

  function alertVisibility(msg) {
    alert(msg);
  }

  function onHandleSubmit() {
    if (isViewValid()) {
      let object = {
        id: state.selectedEmployee ? state.selectedEmployee.user_id : 0,
        name: state.name,
        email: state.email,
        password: state.selectedEmployee ? null : state.password,
        role_id: state.selectedAccessLevel.value,
        regions: state.selectedRegions,
        cisco: state.selectedCiscos,
        zap: state.selectedZaps,
      };
      setIsProcessingAddEditUser(true);
      addEmployeeCall(object)
        .then(({ data }) => {
          setIsProcessingAddEditUser(false);
          if (data.error_code == 0 || data.error_code == 1) {
            setIsUserAddOrEditModel(false);
            getUsers();
          } else alertVisibility(data.message);
        })
        .catch((err) => {
          console.log("err", err);
          setIsProcessingAddEditUser(false);
        });
    }
  }

  function onHandleDeleteEmployee() {
    let object = {
      id: state.selectedEmployee.user_id,
    };
    setIsProcessing(true);
    employeeDeleteCall(object)
      .then(({ data }) => {
        setIsProcessing(false);
        if (data.error_code == 0) {
          let newData = [...state.employees];
          let filteredData = newData.filter(
            (x) => x.user_id != state.selectedEmployee.user_id
          );
          setState((prevState) => ({
            ...prevState,
            employees: filteredData,
            selectedEmployee: null,
          }));
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsProcessing(false);
      });
  }

  const Styles = {
    control: (provided) => ({
      display: "flex",
      minHeight: "48px",
      width: "100%",
      alignItems: "center",
      fontSize: "14px",
    }),
    indicatorSeparator: () => null,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.addemployeebar}>
        <div className={styles.backbox}>
          <div
            className={styles.backbutton}
            onClick={() => navigate.push("/dashboard")}
          >
            <IoArrowBack style={{ color: "grey" }} />
          </div>
          <span>
            {isEnglish
              ? translation.en.monitoring_employees
              : translation.mg.monitoring_employees}
          </span>
        </div>
        <div
          className={styles.addbutton}
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              selectedEmployee: null,
              selectedAccessLevel: null,
              regionsData: [],
              selectedRegions: [],
              ciscoData: [],
              selectedCiscos: [],
              zapData: [],
              selectedZaps: [],
            }));
            setIsUserAddOrEditModel(!isUserAddOrEditModel);
          }}
        >
          <GoPlus style={{ fontSize: "1.4rem", fontWeight: "900" }} />
          <span>
            {isEnglish ? translation.en.add_user : translation.mg.add_user}
          </span>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.userManagementTable}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>
                {isEnglish
                  ? translation.en.user_name
                  : translation.mg.user_name}
              </th>
              <th>EMAIL</th>
              <th>
                {isEnglish
                  ? translation.en.access_level_header
                  : translation.mg.access_level_header}
              </th>
              <th>
                {isEnglish ? translation.en.region : translation.mg.region}
              </th>
              <th>{isEnglish ? translation.en.cisco : translation.mg.cisco}</th>
              <th>{isEnglish ? translation.en.zap : translation.mg.zap}</th>
              <th>
                {isEnglish ? translation.en.actions : translation.mg.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {state.employees.map((item, index) => (
              <tr key={index}>
                <td style={{ fontWeight: "700", color: "black" }}>
                  {index + 1}
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.role_id == ACCESS_LEVELS.super_admin
                    ? "Super Admin"
                    : item.role_id == ACCESS_LEVELS.country_level
                    ? "Country Level"
                    : item.role_id == ACCESS_LEVELS.region_level
                    ? isEnglish
                      ? translation.en.region_level
                      : translation.mg.region_level
                    : item.role_id == ACCESS_LEVELS.cisco_level
                    ? "Cisco Level"
                    : item.role_id == ACCESS_LEVELS.zap_level
                    ? "Zap Level"
                    : ""}
                </td>
                <td style={{ maxWidth: "400px" }}>
                  {item.regions.length > 0
                    ? item.regions.map((item) => item.label).join(", ")
                    : ""}
                </td>
                <td style={{ maxWidth: "400px" }}>
                  {item.Cisco.length > 0
                    ? item.Cisco.map((item) => item.label).join(", ")
                    : ""}
                </td>
                <td style={{ maxWidth: "400px" }}>
                  {item.Zap.length > 0
                    ? item.Zap.map((item) => item.label).join(", ")
                    : ""}
                </td>
                <td className={styles.actions}>
                  <div
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        selectedEmployee: item,
                        selectedAccessLevel: null,
                        regionsData: [],
                        selectedRegions: [],
                        ciscoData: [],
                        selectedCiscos: [],
                        zapData: [],
                        selectedZaps: [],
                      }));
                      setIsUserAddOrEditModel(!isUserAddOrEditModel);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <GrEdit fill="#9595AD" />
                  </div>
                  <div
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        selectedEmployee: item,
                      }));
                      setModelIsOpenDelete(!modalIsOpenDelete);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <RiDeleteBin6Line fill="red" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {state.employees.length > 0 ? (
        <div className={"list__container__pagination"}>
          <Pagination
            activePage={state.page}
            itemsCountPerPage={state.limit}
            totalItemsCount={state.totalRecords}
            pageRangeDisplayed={5}
            onChange={(value) =>
              setState((prevState) => ({ ...prevState, page: value }))
            }
          />
        </div>
      ) : null}

      <ReactModal
        isOpen={isUserAddOrEditModel}
        className={styles.addemployeemodal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <div className={styles.addemployeemodalheading}>
          <span>
            {state.selectedEmployee
              ? isEnglish
                ? translation.en.edit_user
                : translation.mg.edit_user
              : isEnglish
              ? translation.en.add_user
              : translation.mg.add_user}
          </span>
          <IoMdClose
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                selectedEmployee: null,
                name: "",
                email: "",
                selectedAccessLevel: null,
                regionsData: [],
                selectedRegions: [],
                ciscoData: [],
                selectedCiscos: [],
                zapData: [],
                selectedZaps: [],
                password: "",
                confirmPassword: "",
              }));
              setIsUserAddOrEditModel(!isUserAddOrEditModel);
            }}
            cursor={"pointer"}
            size={24}
          />
        </div>
        <div className={styles.add__employee__content__container}>
          <div className={styles.addemployeemodalname}>
            <span>
              {isEnglish
                ? translation.en.employees_name
                : translation.mg.employees_name}
            </span>
            <input
              type="text"
              placeholder={
                isEnglish
                  ? translation.en.enter_employee_name
                  : translation.mg.enter_employee_name
              }
              value={state.name}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.addemployeemodalname}>
            <span>
              {isEnglish
                ? translation.en.Email_Address
                : translation.mg.Email_Address}
            </span>
            <input
              type="email"
              placeholder={
                isEnglish
                  ? translation.en.Email_Address
                  : translation.mg.Email_Address
              }
              value={state.email}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.addemployeemodaldropdowns}>
            <span>
              {isEnglish
                ? translation.en.access_level
                : translation.mg.access_level}
            </span>
            <Select
              className={styles.reactselect}
              styles={Styles}
              placeholder={
                "Select " + isEnglish
                  ? translation.en.access_level
                  : translation.mg.access_level
              }
              options={state.accessLevels}
              value={state.selectedAccessLevel}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  selectedAccessLevel: (state.selectedAccessLevel = value),
                  selectedRegions: (state.selectedRegions = []),
                  ciscoData: (state.ciscoData = []),
                  selectedCiscos: (state.selectedCiscos = []),
                  zapData: (state.zapData = []),
                  selectedZaps: (state.selectedZaps = []),
                }));
                if (value.value != ACCESS_LEVELS.country_level) getRegions();
              }}
            />
          </div>

          {state.selectedAccessLevel &&
          (state.selectedAccessLevel.value == ACCESS_LEVELS.region_level ||
            state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level ||
            state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level) ? (
            <div className={styles.addemployeemodaldropdowns}>
              <span>
                {isEnglish ? translation.en.region : translation.mg.region}
              </span>
              <Select
                className={styles.reactselect}
                styles={Styles}
                placeholder={
                  "Select " + isEnglish
                    ? translation.en.region
                    : translation.mg.region
                }
                isMulti
                options={state.regionsData}
                value={state.selectedRegions}
                onChange={(value) => {
                  setState((prevState) => ({
                    ...prevState,
                    selectedRegions: (state.selectedRegions = value),
                    ciscoData: (state.ciscoData = []),
                    selectedCiscos: (state.selectedCiscos = []),
                    zapData: (state.zapData = []),
                    selectedZaps: (state.selectedZaps = []),
                  }));
                  getCisco(value);
                }}
              />
            </div>
          ) : null}

          {state.selectedAccessLevel &&
          (state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level ||
            state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level) ? (
            <div className={styles.addemployeemodaldropdowns}>
              <span>
                {isEnglish ? translation.en.cisco : translation.mg.cisco}
              </span>
              <Select
                className={styles.reactselect}
                styles={Styles}
                placeholder={
                  "Select " + isEnglish
                    ? translation.en.cisco
                    : translation.mg.cisco
                }
                isMulti
                options={state.ciscoData}
                value={state.selectedCiscos}
                onChange={(value) => {
                  setState((prevState) => ({
                    ...prevState,
                    selectedCiscos: (state.selectedCiscos = value),
                    zapData: (state.zapData = []),
                    selectedZaps: (state.selectedZaps = []),
                  }));
                  getZap(value);
                }}
              />
            </div>
          ) : null}

          {state.selectedAccessLevel &&
            state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level && (
              <div className={styles.addemployeemodaldropdowns}>
                <span>
                  {isEnglish ? translation.en.zap : translation.mg.zap}
                </span>
                <Select
                  className={styles.reactselect}
                  styles={Styles}
                  placeholder={
                    "Select " + isEnglish
                      ? translation.en.cisco
                      : translation.mg.cisco
                  }
                  isMulti
                  options={state.zapData}
                  value={state.selectedZaps}
                  onChange={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      selectedZaps: (state.selectedZaps = value),
                    }));
                  }}
                />
              </div>
            )}

          {!state.selectedEmployee ? (
            <>
              <div className={styles.addemployeemodalname}>
                <span>
                  {isEnglish
                    ? translation.en.Password
                    : translation.mg.Password}
                </span>
                <input
                  type="password"
                  placeholder={
                    isEnglish
                      ? translation.en.Password
                      : translation.mg.Password
                  }
                  value={state.password}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.addemployeemodalname}>
                <span>
                  {isEnglish
                    ? translation.en.confirm_password
                    : translation.mg.confirm_password}
                </span>
                <input
                  type="password"
                  placeholder={
                    isEnglish
                      ? translation.en.confirm_password
                      : translation.mg.confirm_password
                  }
                  value={state.confirmPassword}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
            </>
          ) : null}
        </div>
        <div className={styles.addemployeemodalcancel}>
          <span
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                selectedEmployee: null,
                name: "",
                email: "",
                selectedAccessLevel: null,
                regionsData: [],
                selectedRegions: [],
                ciscoData: [],
                selectedCiscos: [],
                zapData: [],
                selectedZaps: [],
                password: "",
                confirmPassword: "",
              }));
              setIsUserAddOrEditModel(!isUserAddOrEditModel);
            }}
          >
            {isEnglish ? translation.en.Cancel : translation.mg.Cancel}
          </span>
          <div
            onClick={() => {
              if (!isProcessingAddEditUser) onHandleSubmit();
            }}
          >
            {isProcessingAddEditUser
              ? "Processing..."
              : isEnglish
              ? translation.en.submit
              : translation.mg.submit}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={modalIsOpenDelete}
        className={styles.deleteemployeemodal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <div className={styles.deleteemployeeheading}>
          <span>
            {isEnglish
              ? translation.en.delete_user
              : translation.mg.delete_user}
          </span>
        </div>
        <div className={styles.deleteemployeesubheading}>
          <span>
            {isEnglish
              ? translation.en[
                  "do_you_confirm_your_intention_to_delete_this_employee?"
                ]
              : translation.mg[
                  "do_you_confirm_your_intention_to_delete_this_employee?"
                ]}{" "}
            <br />
            {isEnglish
              ? translation.en.please_note_that_this_action_cannot_be_undone
              : translation.mg.please_note_that_this_action_cannot_be_undone}
          </span>
        </div>
        <div className={styles.deleteemployeecancel}>
          <span
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                selectedEmployee: null,
              }));
              setModelIsOpenDelete(!modalIsOpenDelete);
            }}
          >
            {isEnglish ? translation.en.no_keep_it : translation.mg.no_keep_it}
          </span>
          <div
            onClick={(e) => {
              setModelIsOpenDelete(!modalIsOpenDelete);
              onHandleDeleteEmployee();
            }}
          >
            {isEnglish ? translation.en.yes_delete : translation.mg.yes_delete}
          </div>
        </div>
      </ReactModal>

      {isProcessing && <ProcessingLoader />}
    </div>
  );
};

export default UserManagenemt;
