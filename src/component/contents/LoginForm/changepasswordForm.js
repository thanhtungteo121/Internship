// ChangePasswordForm.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutationHooks } from "../../../hooks/useMutationHooks";
import * as message from "../../MessageComponent/Message";
import * as UserService from '../../../services/UserService'
const ChangePasswordForm = ({
}) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [imageSrc, setImageSrc] = useState(require("../../assets/img/scc.png"));
  const [altText, setAltText] = useState(
    "Hand holding a smartphone with a security lock and checkmark"
  );
  
  const [newforgotFocused, setNewforgotFocused] = useState(false);
  const [newforgotValue, setNewforgotValue] = useState("");

  const [checkforgotFocused, setCheckforgotFocused] = useState(false);
  const [checkforgotValue, setCheckforgotValue] = useState("");

  //check pass when error
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordSpaceError, setPasswordSpaceError] = useState(false);
  const [passwordSpecialCharError, setPasswordSpecialCharError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  //-----------check ký tự và check mật khẩu mới---------------//
  // Function to validate password
  const validatePassword = (password) => {
    // Check for minimum length
    setPasswordLengthError(password.length < 6);
    // Check for spaces
    setPasswordSpaceError(/\s/.test(password));
    // Check for special characters
    setPasswordSpecialCharError(!/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewforgotValue(value);
    // Validate the password and set the error messages
    validatePassword(value);
    checkPasswordsMatch(value, checkforgotValue);
  };

  const handleCheckPasswordChange = (e) => {
    const value = e.target.value;
    setCheckforgotValue(value);
    checkPasswordsMatch(newforgotValue, value);
  };

  const checkPasswordsMatch = (password, confirmPassword) => {
    setPasswordMatchError(password !== confirmPassword);
  };

  const location = useLocation();
  const [token, setToken] = useState("");
  console.log("token", token);
  useEffect(() => {
    // Sử dụng URLSearchParams để lấy giá trị token
    const queryParams = new URLSearchParams(location.search);
    const tokenValue = queryParams.get("token"); // Lấy giá trị của token
    setToken(tokenValue);
  }, [location.search]); // Chỉ chạy khi URL thay đổi

  const mutation = useMutationHooks((data) =>  UserService.resetPassword(token, data ));
  console.log("mutation", mutation);
  const {data, isError, isSuccess} = mutation;
  useEffect(() => {
    if(data){
      if(data.status === "Error"){
        message.error("Đổi mật khẩu thất bại");
      }else{
        message.success("Đổi mật khẩu thành công");
      }
    }
  }, [isError, isSuccess]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    mutation.mutate({
      newPassword: newforgotValue,
      confirmPassword: checkforgotValue
    });
  }

  //đổi hình ảnh qua các thanh input
  const changeImage = (action) => {
    if (action === "email") {
      setImageSrc(require("../../assets/img/email.jpg"));
      setAltText("Image 1 description");
    } else if (action === "password") {
      setImageSrc(require("../../assets/img/pass.jpg"));
      setAltText("Image 2 description");
    } else if (action === "forgot") {
      setImageSrc(require("../../assets/img/scrt.png"));
      setAltText("Image 3 description");
    } else if (action === "enter") {
      setImageSrc(require("../../assets/img/scc.png"));
      setAltText("Image 3 description");
    }
  };

  return (
    <div className="container-L-S">
      <div className="left">
        <div className="verify">
          <div
            className="back-to-login"
            onFocus={() => changeImage("email")}
          >
            <i className="fas fa-arrow-left"></i> Back to login
          </div>
          <h2>Verify code</h2>
          <p>An authentication code has been sent to your email.</p>
          <form method="post" onSubmit={handleResetPassword}>
            <div
              className={`input-container-L-S iChange ${
                newforgotFocused || newforgotValue ? "focused" : ""
              }`}
            >
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                type="password"
                value={newforgotValue}
                onFocus={() => {
                  setNewforgotFocused(true);
                  changeImage("forgot");
                }}
                onBlur={() => setNewforgotFocused(false)}
                onChange={handleNewPasswordChange}
              />
              <div className="err-mesg">
                <span
                  className={
                    passwordLengthError ? "error-message" : "success-message"
                  }
                >
                  {passwordLengthError ? (
                    <>{"\u2717"} Password must be more than 6 characters long</>
                  ) : (
                    <>{"\u2713"} Password length is valid</>
                  )}
                  <br />
                </span>
                <span
                  className={
                    passwordSpaceError ? "error-message" : "success-message"
                  }
                >
                  {passwordSpaceError ? (
                    <>{"\u2717"} Password must not contain spaces</>
                  ) : (
                    <>{"\u2713"} No spaces in the password</>
                  )}
                  <br />
                </span>
                <span
                  className={
                    passwordSpecialCharError
                      ? "error-message"
                      : "success-message"
                  }
                >
                  {passwordSpecialCharError ? (
                    <>
                      {"\u2717"} Password must contain at least one special
                      character
                    </>
                  ) : (
                    <>{"\u2713"} Contains special character</>
                  )}
                </span>
              </div>
            </div>

            <div
              className={`input-container-L-S iChangeCheck ${
                checkforgotFocused || checkforgotValue ? "focused" : ""
              } ${passwordMatchError ? "error-border" : "success-border"}`}
            >
              <label htmlFor="check-password">Confirm password</label>
              <input
                id="check-password"
                type="password"
                value={checkforgotValue}
                onFocus={() => {
                  setCheckforgotFocused(true);
                  changeImage("forgot");
                }}
                onBlur={() => setCheckforgotFocused(false)}
                onChange={handleCheckPasswordChange}
              />
              {passwordMatchError && (
                <span className="error-message err-mesg">
                  {"\u2717"} Passwords do not match
                </span>
              )}
            </div>

            <p>
              Didn't receive a code?
              <a className="resend-code" href="/login">
                Resend
              </a>
            </p>
            <button
              className="login-btn"
              type="submit"
              disabled={
                passwordLengthError ||
                passwordSpaceError ||
                passwordSpecialCharError ||
                passwordMatchError
              }
            >
              Verify
            </button>
          </form>
        </div>
      </div>
      <div className="right">
        <img src={imageSrc} alt={altText} height="600" width="500" />
      </div>
    </div>
  );
};

export default ChangePasswordForm;
