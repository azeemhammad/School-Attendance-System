"use client";
import styles from "./forgot.module.css";
import { IoIosArrowDown } from "react-icons/io";


const ForgotPassword = () => {
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftside}>
        <div className={styles.leftsidecontent}>
          <div className={styles.logo}>
            <img src="/logo.svg" width={110} />
            <img src="/logo2.svg" width={120} />
          </div>
          <h1>Forgot Password?</h1>
          <span className={styles.pleaseenter}>
            Please enter your email address below and we will send you a link to
            reset password
          </span>
          <div className={styles.inputfields}>
            <span>Email</span>
            <div className={styles.inputwrapper}>
              <img src="/email.svg" />
              <input type="text" placeholder="Email" />
            </div>
          </div>
          <button className={styles.signinbutton}>Send</button>
        </div>
      </div>
      <div className={styles.rightside}>
        <div className={styles.languagebox}>
          <div className={styles.language}>
            <img src="/ukflag.svg" />
            <span>English</span>
            <IoIosArrowDown />
          </div>
        </div>

        <div className={styles.rightimage}>
          <img src="/forgotpassword.svg" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
