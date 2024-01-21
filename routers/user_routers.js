import {
    SEND_OTP_END_POINT,
    REGISTER_USER_END_POINT,
    EDIT_USERNAME_END_POINT,
    EDIT_EMAIL_END_POINT,
    EDIT_MOBILE_END_POINT,
    DELETE_ACCOUNT_END_POINT,
    LOGIN_USER_END_POINT
} from "../utilities/env.js";
import {
    sendOTP,
    registerUser,
    editUsername,
    editEmail,
    editMobile,
    loginUser,
    deleteAccount
} from "../controllers/user_controller.js"
import express from 'express'


const userRouter = express.Router()

userRouter.get(SEND_OTP_END_POINT, sendOTP)
userRouter.post(REGISTER_USER_END_POINT, registerUser)
userRouter.put(EDIT_USERNAME_END_POINT, editUsername)
userRouter.put(EDIT_EMAIL_END_POINT, editEmail)
userRouter.put(EDIT_MOBILE_END_POINT, editMobile)
userRouter.get(LOGIN_USER_END_POINT, loginUser)
userRouter.delete(DELETE_ACCOUNT_END_POINT, deleteAccount)


export {userRouter}