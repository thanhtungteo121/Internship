import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from "../../../services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import * as message from "../../MessageComponent/Message";
import { updateUser } from "../../../redux/slide/userSlide";
import { useMutationHooks } from "../../../hooks/useMutationHooks";

import axios from "axios";
const LoginForm = ({ onChangeImage }) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const googleLoginRef = useRef(null);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();

  const  user = useSelector((state) => state.user);
  const mutation = useMutationHooks((data) => UserServices.loginUser(data));

  const { data , isError, isSuccess } = mutation;
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!emailValue) {
      isValid = false;
      formErrors["email"] = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      isValid = false;
      formErrors["email"] = "Email không hợp lệ.";
    }

    if (!passwordValue) {
      isValid = false;
      formErrors["password"] = "Vui lòng nhập mật khẩu.";
    } else if (passwordValue.length < 6) {
      isValid = false;
      formErrors["password"] = "Mật khẩu phải trên 6 ký tự.";
    }

    setErrors(formErrors);
    return isValid;
  };

  useEffect(()=>{
    //lấy dữ liệu từu http để lưu trữ và quay lại trang cữ khi cso yêu cầu đăng nhập
    if (isSuccess) {
      message.success("Đăng nhập thành công");
      if(location?.state){
        navigate(location?.state)
      }else{
        navigate('/')
      }
      if (data?.status === "Error") {
        message.error("Đăng nhập thất bại");
      } else {
        message.success();
        if (data?.access_token) {
          localStorage.setItem('access_token', JSON.stringify(data?.access_token));
          console.log("data?.access_token", data?.access_token);
          const decode = jwtDecode(data?.access_token);
          console.log("decode", decode);
          if (decode?.user_id) {
            handleGetDetailsUser(decode?.user_id, data?.access_token);
          }
        } else {
          message.error();
        }
      }
    } else if (isError) {
      message.error();
    }
   }
   ,[isSuccess,isError]) 


  const handleGetDetailsUser = async(id, token)=>{
    const res = await UserServices.getDetaisUser(id, token)
    console.log("data resp user",res.data.name)
    dispatch(updateUser({...res?.data, access_token: token}))
   }
  const mutationGoogle = useMutationHooks((data) => UserServices.loginUserGoogle(data));

  console.log("mutationGoogle", mutationGoogle);
   useEffect(() => {
     if (mutationGoogle.isSuccess) {
       if (mutationGoogle.data.status === "Error") {
         message.error("Đăng nhập thất bại");
       } else {
         message.success("Đăng nhập thành công");
         if (mutationGoogle.data?.access_token) {
           localStorage.setItem(
             "access_token",
             JSON.stringify(mutationGoogle.data?.access_token)
           );
           const decode = jwtDecode(mutationGoogle.data?.access_token);
           console.log("decode", decode);
           if (decode?.id) {
             handleGetDetailsUser(
               decode?.id,
               mutationGoogle.data?.access_token
             );
           }
         } else {
           message.error();
         }
       }
     }
   }, [mutationGoogle.isSuccess, mutationGoogle.isError]);

  const handleCredentialResponse = async (response) => {
    try {
      mutationGoogle.mutate({
        token: response.credential
      })
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };
  
  

  const handleSubmitRegisterLoggin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({
        email: emailValue,
        password: passwordValue,
      });
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div>
      <div className="logo-login">
        <img
          src={require(`../image/logo.png`)}
          alt="Your Logo"
          width="290"
          height="70"
        />
        <a href="/product">
          <button type="">Go To Product List</button>
        </a>
      </div>
      <h2>Login</h2>
      <p>Login to access your travelwise account</p>
      <form  onSubmit={handleSubmitRegisterLoggin}>
        <div
          className={`input-container-L-S ${
            emailFocused || emailValue ? "focused" : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={emailValue}
            name="email"
            onFocus={() => {
              setEmailFocused(true);
              onChangeImage("email");
            }}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
       {errors.email && <small className="error-message-l">{errors.email}</small>}
        <div
          className={`input-container-L-S ${
            passwordFocused || passwordValue ? "focused" : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={passwordValue}
            name="password"
            onFocus={() => {
              setPasswordFocused(true);
              onChangeImage("password");
            }}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
             {errors.password && <small className="error-message-l">{errors.password}</small>}
        </div>
        <div className="remember-me">
          <input id="remember" type="checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a
          className="forgot-password"
          href="#"
          onClick={()=>{navigate('/forgot-password')}}
          onFocus={() => onChangeImage("forgot")}
        >
          Forgot Password?
        </a>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>

      <div className="signup">
        Don't have an account?<a href="/signup">Sign up</a>
      </div>
      <div className="login-container-L-S">
        <div className="divider">Login with</div>
      </div>
      <div className="social-login">
      <GoogleLogin
          text="signin"
          onSuccess={handleCredentialResponse}
          onError={() => {
            console.log('Login Failed');
          }}
        />
    
      </div>
    </div>
  );
};

export default LoginForm;
