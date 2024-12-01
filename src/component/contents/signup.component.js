
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserServices from "../../services/UserService";
// import Loading from "../Component/LoadingComponent/Loading";

import "./Css/signup.css";
import * as message from "../MessageComponent/Message";
const IndexSignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setUserFirstName] = useState("");
  const [lastName, setUserLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!firstName) {
      isValid = false;
      formErrors["firstName"] = "User name is required.";
    }else if(firstName.length >= 15){
      isValid = false;
      formErrors["firstName"] = "Vui lòng nhập tên có không quá 15 ký tự";
    }
    if (!lastName) {
      isValid = false;
      formErrors["lastName"] = "User name is required.";
    }else if(lastName.length >= 15){
      isValid = false;
      formErrors["lastName"] = "Vui lòng nhập tên có không quá 15 ký tự";
    }
    if (!email) {
      isValid = false;
      formErrors["email"] = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors["email"] = "Email is invalid.";
    }else if(email.length >= 30){
      isValid = false;
      formErrors["email"] = "Vui lòng nhập không quá 30 ký tự";
    }
    if (!password) {
      isValid = false;
      formErrors["password"] = "Password is required.";
    } else if (password.length < 6) {
      isValid = false;
      formErrors["password"] = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      isValid = false;
      formErrors["password"] = "Password is required.";
    } else if (password.length < 6) {
      isValid = false;
      formErrors["password"] = "Password must be at least 6 characters.";
    }
    if (!phone) {
      isValid = false;
      formErrors["phone"] = "Phone is required.";
    }else if(phone.length >= 13){
      isValid = false;
      formErrors["phone"] = "Vui lòng nhập không quá 13 ký tự";
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailOrname") {
      setEmail(value);
    } else if (name === "firstName") {
      setUserFirstName(value);
    } else if (name === "lastName") {
      setUserLastName(value);
    } else if (name === "phone") {
      setPhone(Number(value));
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "password") {
      setPassword(value);
    }else if (name === "verifyCode") {
      setVerifyCode(value);
    }
    setIsFormValid(name && email && password && confirmPassword && phone && verifyCode); // Update form validity based on input values
  };

  const mutation = useMutationHooks((data) => UserServices.signupUser(data));
  
  const mutationSendCode = useMutationHooks((data) => UserServices.sendVerifyCode(data));
  //nhận các propertis: trong mutaion

  const { data, isError, isSuccess } = mutation;


  //khi người dùng đăng ký thành công
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "Error") {
        message.error(data?.message);
      } else {
        navigate("/login");
        message.success("Đăng ksy tài khoản thành công");
      }
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  useEffect(() => {

    if (mutationSendCode.isSuccess) {
      if (data?.status === "Error") {
        message.error(`${mutationSendCode.data.message}`);
      } else {
        message.success("Gửi mã xác nhận thành công");
      }
    } else if (isError) {
      message.error();
    }
  }, [mutationSendCode.isError, mutationSendCode.isSuccess]);


  const handleSubmitRegister = (e) => {
    const fullName = `${firstName} ${lastName}`;
    console.log("input data", fullName, email, password, confirmPassword, phone, verifyCode);
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({
        name: fullName,
        email,
        password,
        confirmPassword,
        phone,
        verificationCode:verifyCode
      });
    }
  };
  const handleSendCode = (e) => {
    if (validateForm()){
      mutationSendCode.mutate({
        email
      })
    }
  }
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  // States for image handling
  const [imageSrc, setImageSrc] = useState(require("../assets/img/enter.png"));
  const [altText, setAltText] = useState("Default image for signup");

  // Function to change image based on input focus
  const changeImage = (field) => {
    if (field === "firstName") {
      setImageSrc("https://placehold.co/400x600?text=First+Name");
      setAltText("Image for first name");
    } else if (field === "lastName") {
      setImageSrc("https://placehold.co/400x600?text=Last+Name");
      setAltText("Image for last name");
    } else if (field === "email") {
      setImageSrc("https://placehold.co/400x600?text=Email");
      setAltText("Image for email");
    } else if (field === "phone") {
      setImageSrc("https://placehold.co/400x600?text=Phone+Number");
      setAltText("Image for phone number");
    } else if (field === "password") {
      setImageSrc("https://placehold.co/400x600?text=Password");
      setAltText("Image for password");
    } else if (field === "confirmPassword") {
      setImageSrc("https://placehold.co/400x600?text=Confirm+Password");
      setAltText("Image for confirm password");
    }
  };

  return (
    <div className="container-L-S">
      <div className="left-section">
        <img src={imageSrc} alt={altText} height="600" width="500" />
      </div>
      <div className="form-section">
        <div className="logo">
          <img
            src={require(`./image/logo.png`)}
            alt="Your Logo"
            width="290"
            height="70"
          />
        </div>
        <h2>Sign up</h2>
        <p>Let's get you all set up so you can access your personal account.</p>
        <form method="post" onSubmit={handleSubmitRegister}>
        <div className="form-group half-width ip-left">
            <input
              id="first-name"
              placeholder=" "
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              onFocus={() => changeImage("firstName")}
            />
             {errors.firstName && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.firstName}</span>}
            <label htmlFor="first-name">First Name</label>
          </div>
          <div className="form-group half-width">
            <input
              id="last-name"
              placeholder=" "
              type="text"
              name="lastName"
              value={lastName}
              onFocus={() => changeImage("lastName")}
              onChange={handleInputChange}
            />
           {errors.lastName && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.lastName}</span>}
            <label htmlFor="last-name">Last Name</label>
          </div>
          <div className="form-group half-width ip-left">
            <input
              id="email"
              placeholder=" "
              type="email"
              name="emailOrname"
              value={email}
              onChange={handleInputChange}
              onFocus={() => changeImage("email")}
            />
            {errors.email && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group half-width">
            <input
              id="phone"
              placeholder=" "
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              onFocus={() => changeImage("phone")}
            />
             {errors.phone && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.phone}</span>}
            <label htmlFor="phone">Phone Number</label>
          </div>
          <div className="form-group password-toggle">
            <input
              id="password"
              placeholder=" "
              name="password"
              value={password}
              onChange={handleInputChange}
              type={passwordVisible ? "text" : "password"}
              onFocus={() => changeImage("password")}
            />
             {errors.password && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
            <label htmlFor="password">Password</label>
            <i
              className={`fas ${
                passwordVisible ? "fa-eye-slash" : "fa-eye"
              } toggle-icon`}
              onClick={() => togglePasswordVisibility("password")}
            ></i>
          </div>
          <div className="form-group password-toggle">
            <input
              id="confirm-password"
              placeholder=" "
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              type={confirmPasswordVisible ? "text" : "password"}
              onFocus={() => changeImage("confirmPassword")}
            />
             {errors.confirmPassword && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</span>}
            <label htmlFor="confirm-password">Confirm Password</label>
            <i
              className={`fas ${
                confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
              } toggle-icon`}
              onClick={() => togglePasswordVisibility("confirmPassword")}
            ></i>
          </div>
          <div className="form-group password-toggle ">
            <input
              className="verify-code"
              id="confirm-password"
              placeholder=" "
              name="verifyCode"
              value={verifyCode}
              onChange={handleInputChange}
              type={"text"}
              onFocus={() => changeImage("confirmPassword")}
            />
            <label htmlFor="confirm-password">Verify Code</label>
            <button type="button"  className="submit-btn verify-code-btn" onClick={handleSendCode}>
              Send code
            </button>
          </div>

          <div className="form-group terms">
            <input className="terms-input" type="checkbox" />
            <label htmlFor="terms">
              I agree to all the{" "}
              <a className="terms-a" href="#">
                Terms and Privacy Policies
              </a>
            </label>
          </div>
          <div className="form-group">
            <button className="submit-btn" type="submit">
              Create account
            </button>
          </div>
          <div className="form-group login-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
          <div className="signup-container-L-S">
            <div className="divider">Login with</div>
          </div>
          <div className="social-signup">
            <button className="btn-lgw">
              <a href="#" className="button btn-fb">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
            </button>
            <button className="btn-lgw">
              <a href="#" className="button btn-gg">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <i className="fab fa-google"></i> Google
              </a>
            </button>
            <button className="btn-lgw">
              <a href="#" className="button btn-ap">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <i className="fab fa-apple"></i> Apple
              </a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexSignUp;
