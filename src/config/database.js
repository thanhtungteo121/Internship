const { Sequelize } = require('sequelize');

require('dotenv').config(); 

// Tạo kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(
  process.env.DB_NAME || '', // Tên database
  process.env.DB_USER || '',          // Tên user
  process.env.DB_PASSWORD || '',          // Mật khẩu
  {
    host: process.env.DB_HOST || '', // Địa chỉ host
    dialect: 'mysql',                         // Loại cơ sở dữ liệu (MySQL)
    logging: false,                           // Tắt log SQL
  }
);

// Kiểm tra kết nối
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL successfully'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));


module.exports = sequelize;
