// src/routes.js
// import Home from "../page/Home";

import LoginIndex from "../component/views/login.view";
import SignUpIndex from "../component/views/signup.view";
import ForgotPassword from "../component/contents/LoginForm/forgotpasswordForm";
import ChangePassword from "../component/contents/LoginForm/changepasswordForm";
import PruductIndex from "../component/views/product.view";

export const routes = [
  {
    path: '/',
    page: PruductIndex,
    isShowHeader: false
  },
  {
    path: '/login',
    page: LoginIndex,
    isShowHeader: false
  },
  {
    path: '/signup',
    page: SignUpIndex,
    isShowHeader: false
  },
  {
    path: '/forgot-password',
    page: ForgotPassword,
    isShowHeader: false
  },
  {
    path: '/change-password',
    page: ChangePassword,
    isShowHeader: false
  }
];
