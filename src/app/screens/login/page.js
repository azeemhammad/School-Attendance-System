"use client";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { lngs } from "@/app/utils/options";

const LoginPage = () => {
  const navigate = useRouter();

  const [state, setState] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   localStorage.clear();
  // }, [])

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  function isViewValid() {
    if (!state.email) alert("Please enter email.");
    else if (!state.password) alert("Please enter password.");
    else if (state.email != "gatekeeper@odkeye.site") alert("Wrong email address.");
    else if (state.password != "SystemSentry007") alert("Wrong password.");
    else return true;
    return false
  }

  function onHandleLogin() {
    if (isViewValid())
      navigate.push("/dashboard")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftside}>
        <div className={styles.leftsidecontent}>
          <div className={styles.logo}>
            <img src="/logo.svg" width={110} />
            <img src="/logo2.svg" width={120} />
          </div>
          <h1>Welcome</h1>
          <span className={styles.pleaseenter}>
            Please enter the email and password and login to your account
          </span>
          <div className={styles.inputfields}>
            <span>Email</span>
            <div className={styles.inputwrapper}>
              <img src="/email.svg" />
              <input
                type="text"
                placeholder="Email"
                value={state.email}
                onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))}
              />
            </div>
          </div>
          <div className={styles.inputfields}>
            <span>Password</span>
            <div className={styles.inputwrapper}>
              <img src="/Password.svg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={state.password}
                onChange={(e) => setState(prevState => ({ ...prevState, password: e.target.value }))}
              />
              <span
                onClick={handleTogglePassword}
                style={{ cursor: "pointer", fontSize: "16px", color: "grey" }}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>
          </div>
          <button
            className={styles.signinbutton}
            onClick={() => onHandleLogin()}
          >
            Sign in
          </button>
          <span
            className={styles.forgotpassword}
            onClick={() => navigate.push("/screens/forgotPassword")}
          >
            Forgot password?
          </span>
        </div>
      </div>
      <div className={styles.rightside}>
        <div className={styles.languagebox}>
          <div className={styles.language}>
            <img src="/ukflag.svg" />
            <span>English</span>
            <IoIosArrowDown />
          </div>
          {/* <div className={styles.languagebox__content}>
            {lngs.map((lng) => {
              console.log("lng", lng)
              return (
                <div
                  style={{
                    paddingTop: "1em",
                    paddingLeft: "1em",
                    paddingBottom: ".5em",
                    height: "47px",
                    display: "flex",
                  }}
                  key={lng.country_code}
                  onClick={() => {
                    // i18n.changeLanguage(lng.code);
                    // localStorage.setItem("lang", lng.code);
                  }}
                >
                  <span>{lng.nativeName}</span>
                </div>
              )
            })}
          </div> */}
        </div>

        <div className={styles.rightimage}>
          <img src="/loginphoto.svg" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
