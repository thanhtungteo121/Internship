import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  console.log("data", data);
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/loggin-user`,
    data
    ,{
      // tự động lấy cookie của người dùng và truyền xuống backend
      withCredentials: true,
    }
  );
  console.log("res.data", res.data);
  
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/sign-up`,
    data
  );
  console.log("res.data", res.data);
  return res.data;
};

export const sendVerifyCode = async (data) => {
  console.log("data code email",data)
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/send-verification`,
    {
      data
    }
  );
  return res.data;
};


export const getDetaisUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/user/get-detail-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};


export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/refresh-token`,null,
    {
      // tự động lấy cookie của người dùng và truyền xuống backend
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/logout-user`
  );
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_KEY}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/user/getall-user/`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id,access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};


export const deleteManyUser = async (data,access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/user/delete-many-user`, data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const loginUserGoogle = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/auth/google`,
    data
    ,{
      // tự động lấy cookie của người dùng và truyền xuống backend
      withCredentials: true,
    }
  );
  
  return res.data;
};

export const sentTokenResetPassword = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/request-password-reset`,
    data
  )
  
  return res.data;
}


export const resetPassword = async (token, data) => {
  console.log("token data", token ,data);
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/reset-password/${token}`,
    {
      data,
    }
  );
  return res.data;
};