const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto"); // Dùng để tạo token ngẫu nhiên
const clientID = 'Lấy clientID từ Google API Console';
const client = new OAuth2Client(clientID)
const nodemailer = require("nodemailer"); // Dùng để gửi email reset mật khẩu
const { Op } = require("sequelize");

require('dotenv').config(); 

const findUserTitle = async (title, id) => {
  return await User.findOne({
    where: { [title]: id },
    attributes: ["user_id","name", "email", "password", "authType", "authGoogleID", "isAdmin","createdAt","updatedAt", "totalDay", "activeDay","inactiveDay","resetPasswordToken","resetPasswordExpires"], 
  });
}
const findAllUsers = async () => {
  return await User.findAll({
    attributes: ["user_id","name", "email", "password", "authType", "authGoogleID", "isAdmin", "totalDay", "activeDay","inactiveDay"], 
  });
}
const verifyToken= async(token)=>{
  const ticket = await client.verifyIdToken({
    idToken:token,
    audience:clientID
  })
  const payload = ticket.getPayload()
  return payload;
}

  // Gửi email chứa liên kết reset mật khẩu
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:`${process.env.EMAIL_USER}`, // Email của bạn
      pass: `${process.env.EMAIL_PASS}`, // Mật khẩu email
    },
  });


const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newUser;
    try {
      const checkUser = await findUserTitle("email", email);
      if (checkUser) {
        return { status: "Error", message: "The email is already registered" };
      }
      if (checkUser !== null) {
        resolve({
          status: "Error",
          message: "The email is already",
        });
      }
      //mã hóa dữ liệu mật khẩu User
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
      });
      if (createdUser) {
        resolve({
          status: "Ok",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const googleAuth = (tokenUseGoogle) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await verifyToken(tokenUseGoogle);  // Xác minh token
      const { name, email, sub } = payload;
      let account = await findUserTitle('email',email); // Sửa lại thành findOne thay vì find để lấy một kết quả duy nhất
      
      if (!account) {
        account = await User.create({
          name,
          email,
          authType: "google",
          authGoogleID: sub,
        });
        await account.save();
      } if(account?.authType !== "google"){
        resolve({
          status: "Error",
          message: "The user is not loggin with account google",
        })
      }
      const access_token = await genneralAccessToken({
        id: account.user_id,
        isAdmin: account.isAdmin,
      });
      // Tạo refresh_token và gửi về client
      const refresh_token = await genneralRefreshToken({
        id: account.user_id,
        isAdmin: account.isAdmin,
      });

      resolve({
        status: "Ok",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};


const logginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUser = await findUserTitle("email", email);


      if (checkUser?.authType !== "local"){
        resolve({
          status: "Error",
          message: "The user is not loggin with account local",
        });
      }
      if (checkUser == null) {
        resolve({
          status: "Error",
          message: "The user is not defined",
        });
      }
      //kiểm tra xem passwork người nhập với password trong data có đúng hay không
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "Error",
          message: "The password or user is incorrect",
        });
      }
      //sau khi kieermt ra pasword tành công
      const access_token = await genneralAccessToken({
        id: checkUser.user_id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.user_id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "Ok",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await findUserTitle("user_id", _id);

      if (checkUser === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }
      await User.update(data, {where:{ user_id: _id }})
      const updatedUser = await findUserTitle("user_id", _id);

      resolve({
        status: "Ok",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (userIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.destroy({where:{user_id: userIds}});
      resolve({
        status: "Ok",
        message: "delete is SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await findUserTitle("user_id", _id);
      if (checkUser === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }
      await User.destroy({where:{user_id: _id}});
      resolve({
        status: "Ok",
        message: "delete is SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await findAllUsers()
      resolve({
        status: "Ok",
        message: "Get All USer to data",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDetail = await findUserTitle("user_id",_id);
      if (userDetail === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "Ok",
        message: "Get cussess user",
        data: userDetail,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const requestPasswordReset = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm người dùng theo email
      const user = await findUserTitle("email", email);
      if (!user) {
        return resolve({ status: "Error", message: "Email not found" });
      }

      // Tạo token reset mật khẩu
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetPasswordExpires = Date.now() + 36000000; // Token có hiệu lực trong 1 giờ

      // Cập nhật token và thời gian hết hạn vào cơ sở dữ liệu
      await User.update(
        {
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetPasswordExpires,
        },
        { where: { email } } // Điều kiện cập nhật
      );

      const mailOptions = {
        to: user?.email,
        from: "2100003660@nttu.edu.vn",
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/change-password/?token=${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject({ status: "Error", message: "Error sending email" });
        }
        resolve({ status: "Ok", message: "Reset password email sent" });
      });
    } catch (e) {
      reject({ status: "Error", message: e.message });
    }
  });
};


const resetPassword = (token, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm người dùng với token hợp lệ
      const user = await User.findOne({where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }, // Token còn hiệu lực
      },
      attributes: ["user_id","name", "email", "password", "authType", "authGoogleID", "isAdmin","createdAt","updatedAt", "totalDay", "activeDay","inactiveDay","resetPasswordToken","resetPasswordExpires"], 
  });
      if (!user) {
        return resolve({
          status: "Error",
          message: "Password reset token is invalid or has expired",
        });
      }
      const hash = bcrypt.hashSync(newPassword, 10);
      // Mã hóa mật khẩu mới và cập nhật
      const updatePassword = await User.update(
        {
          password: hash, // Mật khẩu mới
          resetPasswordToken: null, // Xóa token
          resetPasswordExpires: null, // Xóa thời hạn
        },
        { where: { user_id: user.user_id } } // Điều kiện xác định người dùng
      );
      resolve({ status: "Ok", message: "Password has been updated",data:updatePassword});
    } catch (e) {
      reject({ status: "Error", message: "Password is not update fail" });
    }
  });
};


module.exports = {
  createUser,
  logginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  deleteManyUser,
  requestPasswordReset,
  resetPassword,
  googleAuth
};
