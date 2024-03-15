"use client";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { isInvalidEmail } from "@/app/utils/validations";
import { employeeLoginCall } from "@/app/api/user/repo";
import { LNGS } from "@/app/utils/constants";
import translation from "../../lang/translation"

const LoginPage = () => {
  const navigate = useRouter();

  const [state, setState] = useState({
    email: "",
    password: "",
  })
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const storedIsEnglish = localStorage.getItem("isEnglish");
  const initialIsEnglish = storedIsEnglish !== null ? JSON.parse(storedIsEnglish) : true;
  const [isEnglish, setIsEnglish] = useState(initialIsEnglish)

  // useEffect(() => {
  //   localStorage.clear();
  // }, [])

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  function isViewValid() {
    if (!state.email) alert(isEnglish ? translation.en.please_enter_email : translation.mg.please_enter_email);
    else if (isInvalidEmail(state.email)) alert(isEnglish ? translation.en.please_enter_valid_email : translation.mg.please_enter_valid_email);
    else if (!state.password) alert(isEnglish ? translation.en.please_enter_password : translation.mg.please_enter_password);
    else return true;
    return false
  }

  function onHandleLogin() {
    if (isViewValid()) {
      let object = {
        "email": state.email,
        "password": state.password
      }
      setIsProcessing(true);
      employeeLoginCall(object).then(({ data }) => {
        setIsProcessing(false);
        if (data.error_code == 0) {
          localStorage.setItem("user_data", JSON.stringify(data.result));
          navigate.push("/dashboard")
        } else alert(data.message);
      }).catch(err => {
        console.log("err", err);
        setIsProcessing(false);
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftside}>
        <div className={styles.leftsidecontent}>
          <div className={styles.logo}>
            <img src="/logo.svg" width={110} />
            <img src="/logo2.svg" width={120} />
          </div>
          <h1>{isEnglish ? translation.en.Welcome : translation.mg.Welcome}</h1>
          <span className={styles.pleaseenter}>
            {isEnglish ? translation.en.Provide_your_login_details_to_continue : translation.mg.Provide_your_login_details_to_continue}
          </span>
          <div className={styles.inputfields}>
            <span>{isEnglish ? translation.en.Email_Address : translation.mg.Email_Address}</span>
            <div className={styles.inputwrapper}>
              <img src="/email.svg" />
              <input
                type="text"
                placeholder={isEnglish ? translation.en.Email_Address : translation.mg.Email_Address}
                value={state.email}
                onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))}
              />
            </div>
          </div>
          <div className={styles.inputfields}>
            <span>{isEnglish ? translation.en.Password : translation.mg.Password}</span>
            <div className={styles.inputwrapper}>
              <img src="/Password.svg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={isEnglish ? translation.en.Password : translation.mg.Password}
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
            disabled={isProcessing}
            onClick={() => onHandleLogin()}
          >
            {isProcessing ? "Processing..." : isEnglish ? translation.en.Sign_in : translation.mg.Sign_in}
          </button>
          {/* <span
            className={styles.forgotpassword}
            onClick={() => navigate.push("/screens/forgotPassword")}
          >
            Forgot password?
          </span> */}
        </div>
      </div>
      <div className={styles.rightside}>
        <div className={styles.languagebox}>
          <div className={styles.language}>
            <div>
              <img src={isEnglish ? "/ukflag.svg" : "/madgascar_flag.svg"} style={{ width: "18px", height: "18px" }} />
              <span>{isEnglish ? "English" : "Madgascar"}</span>
            </div>
            <IoIosArrowDown />
          </div>
          <div className={styles.languagebox__content}>
            {LNGS.map((lng) => {
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
                  onClick={async () => {
                    localStorage.setItem("isEnglish", lng.code == "en" ? true : false);
                    setIsEnglish(lng.code == "en" ? true : false)
                  }}
                >
                  <span>{lng.nativeName}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.rightimage}>
          <img src="/loginphoto.svg" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
