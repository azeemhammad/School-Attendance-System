"use client";
import { user_management } from "@/app/utils/user-management";
import styles from "./usermanagement.module.css";
import { IoArrowBack } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { regionOptions } from "@/app/utils/options";
import Select from "react-select";
import { addEmployeeCall, employeeDeleteCall, getAllUsersCall } from "@/app/api/user/repo";
import ProcessingLoader from "@/app/components/processing-loader";
import { ACCESS_LEVELS } from "@/app/utils/constants";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllCiscoByRegionIdCall, getAllRegionsCall, getAllZapByCiscoIdCall } from "@/app/api/educ-etablissement/repo";
import { isInvalidEmail } from "@/app/utils/validations";

const UserManagenemt = () => {
  const navigate = useRouter();

  let [state, setState] = useState({
    employees: [],
    selectedEmployee: null,
    name: "",
    email: "",
    accessLevels: [
      { label: "Super Admin Level", value: ACCESS_LEVELS.super_admin },
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
    limit: 10
  })
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingAddEditUser, setIsProcessingAddEditUser] = useState(false);
  const [isUserAddOrEditModel, setIsUserAddOrEditModel] = useState(false);
  const [modalIsOpenDelete, setModelIsOpenDelete] = useState(false);

  useEffect(() => {
    getUsers();
  }, [state.page])

  useEffect(() => {
    if (state.selectedEmployee && isUserAddOrEditModel) {
      debugger;
      if (state.selectedEmployee.regions.length > 0) getRegions();
      if (state.selectedEmployee.Cisco.length > 0) getCisco(state.selectedEmployee.regions);
      if (state.selectedEmployee.Zap.length > 0) getZap(state.selectedEmployee.Cisco);
      setState((prevState) => ({
        ...prevState,
        name: state.selectedEmployee.name,
        email: state.selectedEmployee.email,
        selectedAccessLevel: {
          label:
            state.selectedEmployee.role_id == ACCESS_LEVELS.super_admin
              ? "Super Admin Level"
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
    getAllUsersCall(state.page, state.limit).then(({ data }) => {
      setIsProcessing(false);
      if (data.error_code == 0)
        setState(prevState => ({ ...prevState, employees: data.result }))
      else
        setState(prevState => ({ ...prevState, employees: [] }))
    }).catch(err => {
      console.log("err", err);
      setIsProcessing(false);
      setState(prevState => ({ ...prevState, employees: [] }))
    })
  }

  function getRegions() {
    getAllRegionsCall(1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({ ...prevState, regionsData: state.regionsData = data.result }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function getCisco(value) {
    getAllCiscoByRegionIdCall(value.map((x) => x.value).join(","), 1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({ ...prevState, ciscoData: state.ciscoData = data.result }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function getZap(value) {
    getAllZapByCiscoIdCall(value.map((x) => x.value).join(","), 1, 1000)
      .then(({ data }) => {
        if (data.error_code === 0)
          setState((prevState) => ({ ...prevState, zapData: state.zapData = data.result }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const isViewValid = () => {
    if (!state.name) alertVisibility("Please enter name");
    else if (!state.email) alertVisibility("Please enter name");
    else if (isInvalidEmail(state.email)) alertVisibility("Please enter valid email");
    else if (!state.selectedAccessLevel) alertVisibility("Please select access level");
    else if (
      state.selectedAccessLevel.value == ACCESS_LEVELS.region_level &&
      !state.selectedRegions
    )
      alertVisibility("Please select regions");
    else if (
      state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level &&
      !state.selectedCiscos
    )
      alertVisibility("Please select ciscos");
    else if (
      state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level &&
      !state.selectedZaps
    )
      alertVisibility("Please select zaps");
    else if (!state.selectedEmployee) {
      if (!state.password) alertVisibility("Please enter password");
      else if (state.password.length < 6)
        alertVisibility("Please enter a password with a minimum of 6 characters");
      else if (!state.confirmPassword) alertVisibility("Please enter confirm password");
      else if (state.password != state.confirmPassword)
        alertVisibility("Your password didn't matched");
      else return true;
    } else return true;
    return false;
  };

  function alertVisibility(msg) {
    alert(msg)
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
      id: state.selectedEmployee.user_id
    }
    setIsProcessing(true);
    employeeDeleteCall(object).then(({ data }) => {
      setIsProcessing(false);
      if (data.error_code == 0) {
        let newData = [...state.employees];
        let filteredData = newData.filter(x => x.user_id != state.selectedEmployee.user_id);
        setState(prevState => ({ ...prevState, employees: filteredData, selectedEmployee: null }))
      }
    }).catch(err => {
      console.log("err", err);
      setIsProcessing(false);
    })
  }

  const Styles = {
    control: (provided) => ({
      display: "flex",
      minHeight: "48px",
      width: "550px",
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
          <span>Employees</span>
        </div>
        <div
          className={styles.addbutton}
          onClick={() => {
            setState(prevState => ({ ...prevState, selectedEmployee: null, selectedAccessLevel: null, regionsData: [], selectedRegions: [], ciscoData: [], selectedCiscos: [], zapData: [], selectedZaps: [] }))
            setIsUserAddOrEditModel(!isUserAddOrEditModel)
          }}
        >
          <GoPlus style={{ fontSize: "1.4rem", fontWeight: "900" }} />
          <span>Add Employee</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>EMPLOYEE NAME</th>
            <th>EMAIL</th>
            <th>ACCESS LEVEL</th>
            <th>REGION</th>
            <th>DISTRICT</th>
            <th>COMMUNES</th>
            <th>ACTIONS</th>
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
              <td>{item.role_id == ACCESS_LEVELS.super_admin ? "Super Admin" : item.role_id == ACCESS_LEVELS.region_level ? "Region Level" : item.role_id == ACCESS_LEVELS.cisco_level ? "Cisco Level" : item.role_id == ACCESS_LEVELS.zap_level ? "Zap Level" : ""}</td>
              <td>{item.regions.length > 0 ? item.regions.map((item) => item.label).join(", ") : ""}</td>
              <td>{item.Cisco.length > 0 ? item.Cisco.map((item) => item.label).join(", ") : ""}</td>
              <td>{item.Zap.length > 0 ? item.Zap.map((item) => item.label).join(", ") : ""}</td>
              <td className={styles.actions}>
                <div
                  onClick={() => {
                    setState(prevState => ({ ...prevState, selectedEmployee: item, selectedAccessLevel: null, regionsData: [], selectedRegions: [], ciscoData: [], selectedCiscos: [], zapData: [], selectedZaps: [] }))
                    setIsUserAddOrEditModel(!isUserAddOrEditModel)
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <GrEdit fill="#9595AD" />
                </div>
                <div
                  onClick={() => {
                    setState(prevState => ({ ...prevState, selectedEmployee: item }))
                    setModelIsOpenDelete(!modalIsOpenDelete)
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

      <ReactModal
        isOpen={isUserAddOrEditModel}
        className={styles.addemployeemodal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <div className={styles.addemployeemodalheading}>
          <span>Add Employee</span>
          <IoMdClose
            onClick={() => setIsUserAddOrEditModel(!isUserAddOrEditModel)}
            cursor={"pointer"}
            size={24}
          />
        </div>
        <div className={styles.add__employee__content__container} >
          <div className={styles.addemployeemodalname}>
            <span>Name</span>
            <input
              type="text"
              placeholder="Enter Employee Name"
              value={state.name}
              onChange={(e) => setState(prevState => ({ ...prevState, name: e.target.value }))}
            />
          </div>
          <div className={styles.addemployeemodalname}>
            <span>Email</span>
            <input
              type="email"
              placeholder="Enter Employee Email"
              value={state.email}
              onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))}
            />
          </div>
          <div className={styles.addemployeemodaldropdowns}>
            <span>Access Level</span>
            <Select
              className={styles.reactselect}
              styles={Styles}
              placeholder="Select Access Level"
              options={state.accessLevels}
              value={state.selectedAccessLevel}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  selectedAccessLevel: state.selectedAccessLevel = value,
                  selectedRegions: state.selectedRegions = [],
                  ciscoData: state.ciscoData = [],
                  selectedCiscos: state.selectedCiscos = [],
                  zapData: state.zapData = [],
                  selectedZaps: state.selectedZaps = []
                }));
                if (value.value != ACCESS_LEVELS.super_admin) getRegions();
              }}
            />
          </div>

          {state.selectedAccessLevel &&
            (state.selectedAccessLevel.value == ACCESS_LEVELS.region_level ||
              state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level ||
              state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level) ? (
            <div className={styles.addemployeemodaldropdowns}>
              <span>Regions</span>
              <Select
                className={styles.reactselect}
                styles={Styles}
                placeholder="Select Regions"
                isMulti
                options={state.regionsData}
                value={state.selectedRegions}
                onChange={(value) => {
                  setState(prevState => ({
                    ...prevState,
                    selectedRegions: state.selectedRegions = value,
                    ciscoData: state.ciscoData = [],
                    selectedCiscos: state.selectedCiscos = [],
                    zapData: state.zapData = [],
                    selectedZaps: state.selectedZaps = []
                  }))
                  getCisco(value);
                }}
              />
            </div>
          ) : null}

          {state.selectedAccessLevel &&
            (state.selectedAccessLevel.value == ACCESS_LEVELS.cisco_level ||
              state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level) ? (
            <div className={styles.addemployeemodaldropdowns}>
              <span>Cisco</span>
              <Select
                className={styles.reactselect}
                styles={Styles}
                placeholder="Select Ciscos"
                isMulti
                options={state.ciscoData}
                value={state.selectedCiscos}
                onChange={(value) => {
                  setState(prevState => ({
                    ...prevState,
                    selectedCiscos: state.selectedCiscos = value,
                    zapData: state.zapData = [],
                    selectedZaps: state.selectedZaps = []
                  }))
                  getZap(value)
                }}
              />
            </div>
          ) : null}

          {state.selectedAccessLevel &&
            state.selectedAccessLevel.value == ACCESS_LEVELS.zap_level && (
              <div className={styles.addemployeemodaldropdowns}>
                <span>Zap</span>
                <Select
                  className={styles.reactselect}
                  styles={Styles}
                  placeholder="Select Zaps"
                  isMulti
                  options={state.zapData}
                  value={state.selectedZaps}
                  onChange={(value) => {
                    setState(prevState => ({ ...prevState, selectedZaps: state.selectedZaps = value }))
                  }}
                />
              </div>
            )}

          {!state.selectedEmployee ? (
            <>
              <div className={styles.addemployeemodalname}>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={state.password}
                  onChange={(e) => setState(prevState => ({ ...prevState, password: e.target.value }))}
                />
              </div>
              <div className={styles.addemployeemodalname}>
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  value={state.confirmPassword}
                  onChange={(e) => setState(prevState => ({ ...prevState, confirmPassword: e.target.value }))}
                />
              </div>
            </>
          ) : null}

        </div>
        <div className={styles.addemployeemodalcancel}>
          <span onClick={() => {
            setState(prevState => ({ ...prevState, selectedEmployee: null, name: "", email: "", selectedAccessLevel: null, regionsData: [], selectedRegions: [], ciscoData: [], selectedCiscos: [], zapData: [], selectedZaps: [], password: "", confirmPassword: "" }))
            setIsUserAddOrEditModel(!isUserAddOrEditModel);
          }}>Cancel</span>
          <div onClick={() => {
            if (!isProcessingAddEditUser)
              onHandleSubmit()
          }} >
            {isProcessingAddEditUser ? "Processing..." : state.selectedEmployee ? "Edit" : "Add"}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={modalIsOpenDelete}
        className={styles.deleteemployeemodal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <div className={styles.deleteemployeeheading}>
          <span>Delete Employee</span>
        </div>
        <div className={styles.deleteemployeesubheading}>
          <span>
            Do you confirm your intention to delete this Employee? <br />
            Please note that this action cannot be undone.
          </span>
        </div>
        <div className={styles.deleteemployeecancel}>
          <span onClick={() => {
            setState(prevState => ({ ...prevState, selectedEmployee: null }))
            setModelIsOpenDelete(!modalIsOpenDelete);
          }}>
            No, Keep it
          </span>
          <div onClick={(e) => {
            setModelIsOpenDelete(!modalIsOpenDelete);
            onHandleDeleteEmployee();
          }} >Yes, Delete</div>
        </div>
      </ReactModal>

      {isProcessing && <ProcessingLoader />}
    </div>
  );
};

export default UserManagenemt;
