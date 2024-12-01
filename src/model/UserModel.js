const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo bạn đã thiết lập kết nối Sequelize

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Khóa chính
    autoIncrement: true, // Tự động tăng
    field: "user_id",
  },
  // name
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Tương ứng với `required: true`
    field:"username"
  },
  // email
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Thêm unique nếu cần đảm bảo không trùng email
    field:"email"
  },
  // password
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Để sử dụng `authType` khác như Google hoặc Facebook
    field:"password_hash"
  },
  // authType
  authType: {
    type: DataTypes.ENUM('local', 'google', 'facebook'),
    defaultValue: 'local',
    field:"auth_type"
  },
  // authGoogleID
  authGoogleID: {
    type: DataTypes.STRING,
    defaultValue: null,
    field:"google_login"
  },
  // // authFaceBookID
  // authFaceBookID: {
  //   type: DataTypes.STRING,
  //   defaultValue: null,
  //   field:"auth_facebook_id"
  // },
  // isAdmin
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field:"is_admin"
  },
  // access_token
  access_token: {
    type: DataTypes.STRING,
  },
  // refresh_token
  refresh_token: {
    type: DataTypes.STRING,
  },
  // totalDay
  totalDay: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field:"total_days"
  },
  // activeDay
  activeDay: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field:"active_days"
  },
  // inactiveDay
  inactiveDay: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field:"inactive_days"
  },
  // resetPasswordToken
  resetPasswordToken: {
    type: DataTypes.STRING,
    defaultValue: null,
    field:"reset_password_token"
  },
  // resetPasswordExpires
  resetPasswordExpires: {
    type: DataTypes.DATE,
    defaultValue: null,
    field:"reset_password_expires"
  },
}, {
  timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
  tableName: 'users_account', // Tên bảng trong cơ sở dữ liệu
});

module.exports = User;
