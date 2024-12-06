const express = require("express");
const mysql = require('mysql2/promise'); // Sử dụng mysql2 với promise
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const session = require('express-session');
const path = require("path");

// Đảm bảo dotenv được cấu hình chính xác
require('dotenv').config(); 

const port = process.env.PORT || '';
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const db_host = process.env.DB_HOST ; // Sử dụng trực tiếp process.env mà không cần `${}`
console.log("db_host:", db_host);

// Nhận API mặc định khi kết nối server
app.get("/", (req, res) => {
  return res.send("Success connect with Port");
});

// Cấu hình session
app.use(session({
  secret:'yourSecretKey', // Sử dụng giá trị từ .env nếu có
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Đặt thành true nếu sử dụng HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // Cookie tồn tại trong 1 ngày
  }
}));

// Kết nối MySQL
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host:  process.env.DB_HOST  || 'localhost',
      user: process.env.DB_USER || 'root',
      password:  process.env.DB_PASSWORD || '',
      database:   process.env.DB_NAME||'dailydictation',
    });
    console.log('Connected to MySQL database successfully!');
    return connection;
  } catch (err) {
    console.error('Failed to connect to MySQL:', err);
    process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
  }
};

// Sử dụng middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Định tuyến
routes(app);

// Khởi chạy server
app.listen(port, async () => {
  await connectToDatabase(); // Kết nối đến cơ sở dữ liệu khi khởi chạy server
  console.log("Server is running on port", port);
});
