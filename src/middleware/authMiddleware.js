const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer"); // Dùng để gửi email reset mật khẩu
const User = require("../model/UserModel");
require('dotenv').config(); 

// này được dùng cho các user isAdmin là true
const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token,"access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authemtication",
        status: "error",
      });
    }

    if (user.isAdmin) {
      // nếu isAdmin trả về bằng true thì sẽ đi tiếp qua api delete
      next();
    } else {
      return res.status(404).json({
        message: "the authemtication",
        status: "error",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Dùng chuẩn 'Authorization' header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is missing or invalid",
      status: "error",
    });
  }

  const token = authHeader.split(" ")[1];
  const userId = req.params.id;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // Dùng biến môi trường
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token",
        status: "error",
      });
    }

    if (user.payload?.isAdmin || user.payload?.id === userId) {
      return next();
    }

    return res.status(403).json({
      message: "You do not have permission to perform this action",
      status: "error",
    });
  });
};


// Temporary storage for verification codes
const verificationCodes = new Map(); // Replace with Redis or a database for scalability

  // Gửi email chứa liên kết reset mật khẩu
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2100003660@nttu.edu.vn", // Email của bạn
      pass: "pvzu lcmf bksg rczu", // Mật khẩu email
    },
  });

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Your verification code is: ${verificationCode}`,
  };
  await transporter.sendMail(mailOptions);
};

const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body.data;
  
    const checkEmail = await User.findOne({
      where: { email: email },
      attributes: ["user_id","name", "email", "password", "authType", "authGoogleID", "isAdmin", "totalDay", "activeDay","inactiveDay","resetPasswordToken","resetPasswordExpires"], 
    })
    
    if (!email) {
      return res.status(400).json({
        status: "Error",
        message: "Email is required",
      });
    }
  
    if (checkEmail) {
      return res.status(404).json({
        status: "Error",
        message: "Email already exists",
      });
    }
  
    // Generate a 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
  
    // Set expiration time (current time + 30 minutes)
    const expiresAt =  Date.now() + 300000; // 30 minutes from now
  
    // Store the code with expiration
    verificationCodes.set(email, { code: verificationCode, expiresAt });
    setTimeout(() => verificationCodes.delete(email), 30 * 60 * 1000); // Auto-delete after 30 minutes
  
    // Send the verification email
    await sendVerificationEmail(email, verificationCode);
    res.status(200).json({
      status: "Ok",
      message: "Verification email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to send verification email",
    });
  }
};

// Helper function to send the verification email
const verifyEmail = async (req, res, next) => {
try{
  const { email, verificationCode} = req.body;
  console.log("req.body", req.body);
  if (!email || !verificationCode) {
    return res.status(400).json({
      status: "Error",
      message: "Email and verification code are required",
    });
  }
  const storedData = verificationCodes.get(email);

  if (!storedData) {
    return res.status(400).json({
      status: "Error",
      message: "Verification code not found or expired",
    });
  }

  const { code, expiresAt } = storedData;

  // Check if the code is expired
  if (Date.now() > expiresAt) {
    verificationCodes.delete(email); // Clean up expired code
    return res.status(400).json({
      status: "Error",
      message: "Verification code has expired",
    });
  }

  // Check if the provided code matches
  if (code !== verificationCode) {
    return res.status(400).json({
      status: "Error",
      message: "Invalid verification code",
    });
  }

  // If valid, proceed to the next middleware
  verificationCodes.delete(email); // Optionally delete the code after successful verification
  next();
}catch(e){
  res.status(500).json({
    status: "Error",
    message: "Failed to verify email",
  });
}
};
module.exports = {
  authMiddleware,authUserMiddleware,verifyEmail,sendVerificationCode
};
