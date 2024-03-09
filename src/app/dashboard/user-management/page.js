"use client";
import { user_management } from "@/app/utils/user-management";
import styles from "./usermanagement.module.css";
import { IoArrowBack } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { regionOptions } from "@/app/utils/options";
import Select from "react-select";

const UserManagenemt = () => {
  const navigate = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
  const [modalIsOpenUpdate, setIsOpenUpdate] = useState(false);

  const Styles = {
    control: (provided) => ({
      display: "flex",
      height: "48px",
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
          onClick={() => setIsOpen(!modalIsOpen)}
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
          {user_management.map((item, index) => (
            <tr key={index}>
              <td style={{ fontWeight: "700", color: "black" }}>
                {item.serial}
              </td>
              <td>{item.employee_name}</td>
              <td>{item.email}</td>
              <td>{item.access_level}</td>
              <td>{item.region}</td>
              <td>{item.district}</td>
              <td>{item.communes}</td>
              {item.actions.map((actions) => (
                <td className={styles.actions}>
                  <div
                    onClick={() => setIsOpenUpdate(!modalIsOpenUpdate)}
                    style={{ cursor: "pointer" }}
                  >
                    {actions.edit}
                  </div>
                  <div
                    onClick={() => setIsOpenDelete(!modalIsOpenDelete)}
                    style={{ cursor: "pointer" }}
                  >
                    {actions.delete}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ReactModal
        isOpen={modalIsOpen}
        className={styles.addemployeemodal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <div className={styles.addemployeemodalheading}>
          <span>Add Employee</span>
          <IoMdClose
            onClick={() => setIsOpen(!modalIsOpen)}
            cursor={"pointer"}
            size={24}
          />
        </div>
        <div className={styles.addemployeemodalname}>
          <span>Name</span>
          <input type="text" placeholder="Enter Employee Name" />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Access Level</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Commune Level"
            className={styles.reactselect}
          />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Regions</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Select Regions"
            className={styles.reactselect}
            isMulti
          />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Districts</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Select Districts"
            className={styles.reactselect}
            isMulti
          />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Communes</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Select Communes"
            className={styles.reactselect}
            isMulti
          />
        </div>
        <div className={styles.addemployeemodalcancel}>
          <span onClick={() => setIsOpen(!modalIsOpen)}>Cancel</span>
          <div>Add</div>
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
          <span onClick={() => setIsOpenDelete(!modalIsOpenDelete)}>
            No, Keep it
          </span>
          <div>Yes, Delete</div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={modalIsOpenUpdate}
        className={styles.addemployeemodal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <div className={styles.addemployeemodalheading}>
          <span>Edit Employee</span>
          <IoMdClose
            onClick={() => setIsOpenUpdate(!modalIsOpenUpdate)}
            cursor={"pointer"}
            size={24}
          />
        </div>
        <div className={styles.addemployeemodalname}>
          <span>Name</span>
          <input type="text" placeholder="Enter Employee Name" />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Access Level</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Commune Level"
            className={styles.reactselect}
          />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Regions</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Select Regions"
            className={styles.reactselect}
            isMulti
          />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Districts</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Select Districts"
            className={styles.reactselect}
            isMulti
          />
        </div>
        <div className={styles.addemployeemodaldropdowns}>
          <span>Communes</span>
          <Select
            options={regionOptions}
            styles={Styles}
            placeholder="Select Communes"
            className={styles.reactselect}
            isMulti
          />
        </div>
        <div className={styles.addemployeemodalcancel}>
          <span onClick={() => setIsOpenUpdate(!modalIsOpenUpdate)}>
            Cancel
          </span>
          <div>Update</div>
        </div>
      </ReactModal>
    </div>
  );
};

export default UserManagenemt;
