// ForgotPasswordForm.js
import React, { useEffect, useState } from "react";
import { useMutationHooks } from "../../../hooks/useMutationHooks";
import { useNavigate } from "react-router-dom";
import * as UserServices from "../../../services/UserService";
import { message } from "antd";
const ForgotPasswordForm = ({ onBackToLoginClick, onClick, onChangeImage }) => {
  // States for Forgot Password form
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [imageSrc, setImageSrc] = useState(require("../../assets/img/scc.png"));
  const [altText, setAltText] = useState(
    "Hand holding a smartphone with a security lock and checkmark"
  );

  const [forgotEmailFocused, setForgotEmailFocused] = useState(false);
  const [forgotEmailValue, setForgotEmailValue] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    if (!forgotEmailValue) {
      isValid = false;
      formErrors["forgotEmail"] = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(forgotEmailValue)) {
      isValid = false;
      formErrors["forgotEmail"] = "Email is invalid.";
    } else if (forgotEmailValue.length >= 30) {
      isValid = false;
      formErrors["forgotEmail"] = "Vui lòng nhập không quá 30 ký tự";
    }
    setErrors(formErrors);
    return isValid;
  };

  const mutation = useMutationHooks((data) => UserServices.sentTokenResetPassword(data)); 

  const { data, isError, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if(data.status == 'Error'){
        message.error(data.message);
      }else{
        message.success("Đã gửi mã xác nhận thành công");
      }
    }
  },[isError, isSuccess]);

  const handleSubmitToken = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({
        email: forgotEmailValue
      });
    }
  };
  return (
    <div className="container-L-S">
      <div className="left">
        <div className="fotgotpass">
          <div
            className="back-to-login"
            onClick={onBackToLoginClick}
            onFocus={() => onChangeImage("enter")}
          >
            <i className="fas fa-arrow-left"></i> Back to login
          </div>
          <h2 >Forgot your password?</h2>
          <p>Enter your email below to recover your password</p>
          <form method='post' onSubmit={handleSubmitToken}>
            <div
              className={`input-container-L-S ${
                forgotEmailFocused || forgotEmailValue ? "focused" : ""
              }`}
            >
              <label htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                name="forgotEmail"
                value={forgotEmailValue}
                onFocus={() => {
                  setForgotEmailFocused(true);
                }}
                onBlur={() => setForgotEmailFocused(false)}
                onChange={(e) => setForgotEmailValue(e.target.value)}
              />
              {errors.email && <small className="error-message-l">{errors.email}</small>} 
            </div>
            <div>
              <button className="login-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <img src={imageSrc} alt={altText} height="600" width="500" />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
