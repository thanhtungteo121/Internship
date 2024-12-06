
const UserSevice = require("../services/UserSevice");
const JwtUserSevice = require("../services/jwtService");

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;  // Lấy token từ req.body
    if (!token) {
      return res.status(400).json({ status: "Error", message: "Token not provided" });
    }
    const resp = await UserSevice.googleAuth(token);
    // Tạo refresh_token và gửi về client
    const {refresh_token, ...data} = resp
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'Strict',
    });
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(500).json({
      status: "Error",
      message: e.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = re.test(email);

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "the input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "Error",
        message: "the input is not email",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "the input is not equal password",
      });
    }
    const resp = await UserSevice.createUser(req.body);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      status: "Error",
      message: "Sign up user is unsuccess",
    });
  }
};

const logginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = re.test(email);
    
    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "Error",
        message: "The input is not a valid email",
      });
    }

    const resp = await UserSevice.logginUser(req.body);
    
    if (resp.status === "Error") {
      // Nếu xảy ra lỗi trong service, trả về lỗi từ service
      return res.status(400).json(resp);
    }

    const { refresh_token, ...newResponse } = resp;
    console.log("refresh_token", refresh_token);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true, // Đặt thành true nếu sử dụng HTTPS
      sameSite: 'Strict',
    });

    return res.status(200).json(newResponse);
  } catch (e) {
    // Nên trả về mã lỗi 500 khi có lỗi server
    return res.status(500).json({
      status: "Error",
      message: "An error occurred on the server.",
      error: e.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "logout ",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params._id;
    const data = req.body;
    if (!userId) {
      return res.status(400).json({
        status: "Error",
        message: "the userID is required",
      });
    }

    const resp = await UserSevice.updateUser(userId, data);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const userIds = req.body.data;
    const token = req.headers;
    if (!userIds) {
      return res.status(400).json({
        status: "Error",
        message: "the userID is required",
      });
    }
    const resp = await UserSevice.deleteManyUser(userIds);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params._id;
    const token = req.headers;
    if (!userId) {
      return res.status(400).json({
        status: "Error",
        message: "the userID is required",
      });
    }
    const resp = await UserSevice.deleteUser(userId);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const resp = await UserSevice.getAllUser();
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const resp = await UserSevice.getDetailUser(userId);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token
    console.log("token refresg cookies",req.cookies)
    console.log("token refresg cookies 1111",token)
    
    if (!token) {
      return res.status(200).json({
        status: "Error",
        message: "the the is requied",
      });
    }
    const resp = await JwtUserSevice.refreshTokenJWTService(token);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "Error",
        message: "Email is required",
      });
    }

    const response = await UserSevice.requestPasswordReset(email);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "Error",
      message: e.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    
    const { newPassword, confirmPassword } = req.body.data;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "All fields are required",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Passwords do not match",
      });
    }

    const response = await UserSevice.resetPassword(token, newPassword);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "Error",
      message: e.message,
    });
  }
};



module.exports = {
  createUser,
  logginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  deleteManyUser,
  requestPasswordReset,
  resetPassword,
  googleAuth,
};
