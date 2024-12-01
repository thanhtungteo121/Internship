const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');

const { authMiddleware, authUserMiddleware, verifyEmail, sendVerificationCode } = require("../middleware/authMiddleware");

// Route to send verification email
router.post("/send-verification", sendVerificationCode);

router.post('/sign-up',verifyEmail ,userController.createUser)

router.post('/auth/google', userController.googleAuth);

router.post('/logout-user',userController.logoutUser)

router.post('/loggin-user',userController.logginUser)

router.put('/update-user/:_id',authUserMiddleware,userController.updateUser)
//khi chạy pua api delete sẽ chạy qua một midleware để xác nhận các điều kiện cần ddeeer xóa user
router.delete('/delete-user/:_id',authMiddleware,userController.deleteUser)

router.post('/delete-many-user',authMiddleware,userController.deleteManyUser)

router.get('/get-all-user',userController.getAllUser)

router.get('/get-detail-user/:_id' ,userController.getDetailUser)

router.post('/refresh-token',userController.refreshToken)

// Yêu cầu gửi email reset mật khẩu
router.post('/request-password-reset', userController.requestPasswordReset);

// Đặt lại mật khẩu mới sau khi xác nhận
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;