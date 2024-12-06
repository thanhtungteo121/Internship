
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserServices from "../../services/UserService";
// import Loading from "../Component/LoadingComponent/Loading";

import "./Css/signup.css";
import * as message from "../MessageComponent/Message";
const IndexSignUp = () => {
  
  const [verifyCode, setVerifyCode] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
  

  // State and logic for countdown timer
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);


// State for form values and error messages
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    console.log("formData handleinput",formData)
    // Validate email live as user types
    if (id === "email") {
      validateEmail(value);
    }
    if (id === "phone") {
      validatePhone(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors; // Xóa lỗi email nếu hợp lệ
        return rest;
      });
    }
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Số điện thoại từ 10 đến 15 chữ số
    if (!phoneRegex.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid (10-15 digits).",
      }));
    } else {
      setErrors((prevErrors) => {
        const { phone, ...rest } = prevErrors; // Xóa lỗi nếu hợp lệ
        return rest;
      });
    }
  };
  
  
  // Validate a field when it loses focus
  const validateField = (field) => {
    if (!formData[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${field} is required.`,
      }));
    } else {
      setErrors((prevErrors) => {
        const { [field]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  // Other states...
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);


  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
    setCheckboxError(false); // Clear error when checked
  };

 

  const [newforgotFocused, setNewforgotFocused] = useState(false);
  const [newforgotValue, setNewforgotValue] = useState("");

  const [checkforgotFocused, setCheckforgotFocused] = useState(false);
  const [checkforgotValue, setCheckforgotValue] = useState("");
 
  //check pass when error 
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordSpaceError, setPasswordSpaceError] = useState(false);
  const [passwordSpecialCharError, setPasswordSpecialCharError] =
    useState(false);
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

  //gộp 2 hàm 0
  const combinedOnChangePW = (e) => {
    handleInputChange(e);
    handleNewPasswordChange(e);
  };

  //gộp 2 hàm 1
  const combinedOnChangeCPW = (e) => {
    handleInputChange(e);
    handleCheckPasswordChange(e);
  };

  const navigate = useNavigate();

  //data: là dữ liệu trả về từ server
  const mutation = useMutationHooks((data) => UserServices.signupUser(data));
  
  const mutationSendCode = useMutationHooks((data) => UserServices.sendVerifyCode(data));
  //nhận các propertis: trong mutaion
  const { data, isError, isSuccess } = mutation;

  console.log("verifyCode !::",verifyCode)
  
 // Validate all fields on submit
 const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};

  // Check checkbox state
  if (!checkboxChecked) {
    setCheckboxError(true);
    return;
  }

  // Check for empty fields
  for (const field in formData) {
    if (!formData[field]) {
      newErrors[field] = `${field} is required.`;
    }
  }

  //check email 
  if (!formData.email) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "Email is required.",
    }));
  } else if (errors.email) {
    alert("Please fix email errors before submitting.");
  } else {
    console.log("Form submitted:", formData);
    setErrors({});
  }
  // check phone number
  if (Object.keys(newErrors).length > 0 || errors.email || errors.phone) {
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    alert("Please fix all errors before submitting.");
    return;
  }
  // Check if passwords match
  if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }
  
  if (Object.keys(newErrors).length === 0 && checkboxChecked) {
    console.log("Form submitted successfully:", formData);
    setIsPopupVisible(true); // Show popup
    setCheckboxChecked(false);
  }

  const {firstName ,lastName,email, password ,confirmPassword} = formData;
  const fullName = `${firstName} ${lastName}`;
  console.log("email, password, confirmPassword, verifyCode",fullName,email, password, confirmPassword, verifyCode)
    mutation.mutate({
      name: fullName,
      email,
      password,
      confirmPassword,
      verificationCode: verifyCode
    });
  setErrors(newErrors);
};
  //khi người dùng đăng ký thành công
  useEffect(() => {
    console.log("data mutation",mutation)
    if (isSuccess) {
      if (data?.status === "Yêu cầu đăng ký thất bại") {
        message.error(data?.message);
      } else {
        navigate("/login");
        message.success("Đăng ký tài khoản thành công");
      }
    } else if (isError) {
      message.error('Yêu cầu đăng ký thất bại');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    console.log("mutationSendCode",mutationSendCode)
    if (mutationSendCode.isSuccess) {
      if (data?.status === "Error") {
        message.error(`Mã xác nhận không thành công`);
      } else {
        message.success("Gửi mã xác nhận thành công");
      }
    } else if (isError) {
      message.error('Không thể gửi mã xác nhận');
    }
  }, [mutationSendCode.isError, mutationSendCode.isSuccess]);


  const handleSendCode = (e) => {
    if (formData !== undefined) {
      mutationSendCode.mutate({
        email: formData.email,
      })
    }
    setCountdown(60); 
  }
  
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
      <h2 className="text-logo-s">Sign up</h2>
      <p className="text-s">Let's get you all set up so you can access your personal account.</p>
      <form onSubmit={handleSubmit}>
      <div className="form-group half-width ip-left">
          <input
            id="firstName"
            placeholder=" "
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            onFocus={() => changeImage("firstName")}
            onBlur={() => validateField("firstName")}
          />
          <label htmlFor="firstName">First Name</label>
          {errors.firstName && (
            <small className="error-message-s">{errors.firstName}</small>
          )}
        </div>
        <div className="form-group half-width">
          <input
            id="lastName"
            placeholder=" "
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            onFocus={() => changeImage("lastName")}
            onBlur={() => validateField("lastName")}
          />
          <label htmlFor="lastName">Last Name</label>
          {errors.lastName && (
            <small className="error-message-s">{errors.lastName}</small>
          )}
        </div>
        <div className="form-group half-width ip-left">
          <input
            id="email"
            placeholder=" "
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => changeImage("email")}
            onBlur={() => validateEmail(formData.email)}
          />
          <label htmlFor="email">Email</label>
          {errors.email && <small className="error-message-s">{errors.email}</small>}
        </div>
        <div className="form-group half-width">
          <input
            id="phone"
            placeholder=" "
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => changeImage("phone")}
            onBlur={() => validatePhone(formData.phone)}
          />
          <label htmlFor="phone">Phone Number</label>
          {errors.phone && <small className="error-message-s">{errors.phone}</small>}
        </div>
        
        <div className="form-group password-toggle">
          <input
            id="password"
            placeholder=" "
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={combinedOnChangePW}
            onFocus={() => changeImage("password")}
            onBlur={() => validateField("password")}
          />
          <label htmlFor="password">Password</label>
          <i
            className={`fas ${
              passwordVisible ? "fa-eye-slash" : "fa-eye"
            } toggle-icon`}
            onClick={() => togglePasswordVisibility("password")}
          ></i>
          {errors.password && (
            <small className="error-message-s">{errors.password}</small>
          )}
        </div>
        <div className="err-mesg-s">
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
              passwordSpecialCharError ? "error-message" : "success-message"
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
        <div className="form-group password-toggle">
          <input
            id="confirmPassword"
            placeholder=" "
            type={confirmPasswordVisible ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={combinedOnChangeCPW}
            onFocus={() => changeImage("confirmPassword")}
            onBlur={() => validateField("confirmPassword")}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <i
            className={`fas ${
              confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
            } toggle-icon`}
            onClick={() => togglePasswordVisibility("confirmPassword")}
          ></i>
          {errors.confirmPassword && (
            <small className="error-message-s">{errors.confirmPassword}</small>
          )}
          {passwordMatchError && (
          <span className="error-message err-mesg">
            {"\u2717"} Passwords do not match
          </span>
        )}
        </div>

        <div className="form-group password-toggle ">
          <input
            className="verify-code"
            id="confirm-password"
            placeholder=" "
            type="text"
            onChange={(e) => setVerifyCode(e.target.value)}
            onFocus={() => changeImage("confirmPassword")}
          />
          <label htmlFor="confirm-password">Verify Code</label>
          <button
            className="submit-btn verify-code-btn"
            type="button"
            onClick={handleSendCode}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Send code"}
          </button>
        </div>

        <div className="form-group terms">
        <input
        className={`terms-input`}
        type="checkbox"
        checked={checkboxChecked}
        onChange={handleCheckboxChange}
      />
          <label htmlFor="terms" className={`${checkboxError ? "error-checkbox" : ""}`} disabled={checkboxError}>
            I agree to all the{" "}
            <a className="terms-a" href="#">
              Terms and Privacy Policies
            </a>
          </label>
          {checkboxError && (
        <small className="error-message-s">
          You must agree to the terms and policies.
        </small>
      )}
        </div>
        <div className="form-group">
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
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
