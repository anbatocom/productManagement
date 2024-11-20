const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller")
const userMiddleware = require("../../middlewares/client/user.middleware")

router.get('/register', controller.register)

router.get('/login', controller.login)

router.post('/register', controller.registerPOST)

router.post('/login', controller.loginPOST)

router.get('/logout', controller.logout)

router.get('/password/forgot', controller.forgotPassword)

router.post('/password/forgot', controller.forgotPasswordPOST)

router.get('/password/otp', controller.otp)

router.post('/password/otpConfirm', controller.otpConfirm)

router.get('/password/reset', controller.resetPassword)

router.post('/password/reset', controller.resetPasswordPOST)

router.get(
  '/profile',
  userMiddleware.requiredAuth,
  controller.profile
)

module.exports = router;