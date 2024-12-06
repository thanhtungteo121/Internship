// IndexLogin.js
import React, { useState } from "react";
import LoginForm from "./LoginForm/loginForm.js";
import ForgotPasswordForm from "./LoginForm/forgotpasswordForm.js";
import ChangePasswordForm from "./LoginForm/changepasswordForm.js";
import "./Css/login.css";

const IndexLogin = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [imageSrc, setImageSrc] = useState(require("../assets/img/scc.png"));
  const [altText, setAltText] = useState(
    "Hand holding a smartphone with a security lock and checkmark"
  );

  //đổi hình ảnh qua các thanh input
  const changeImage = (action) => {
    if (action === "email") {
      setImageSrc(require("../assets/img/email.jpg"));
      setAltText("Image 1 description");
    } else if (action === "password") {
      setImageSrc(require("../assets/img/pass.jpg"));
      setAltText("Image 2 description");
    } else if (action === "forgot") {
      setImageSrc(require("../assets/img/scrt.png"));
      setAltText("Image 3 description");
    } else if (action === "enter") {
      setImageSrc(require("../assets/img/scc.png"));
      setAltText("Image 3 description");
    }
  };

  return (
    <div className="container-L-S">
      <div className="left">
        <LoginForm
          onForgotPasswordClick={() => setIsForgotPassword(true)}
          onChangeImage={changeImage}
        />
      </div>
      <div className="right">
        <img src={imageSrc} alt={altText} height="600" width="500" />
      </div>
    </div>
  );
};

export default IndexLogin;
