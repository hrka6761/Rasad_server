import {
    SEND_OTP_END_POINT,
    REGISTER_USER_END_POINT,
    EDIT_USERNAME_END_POINT,
    EDIT_EMAIL_END_POINT,
    DELETE_ACCOUNT_END_POINT,
    LOGIN_USER_END_POINT
} from "../utilities/env.js";
import {
    sendOTP,
    registerUser,
    editUsername,
    editEmail,
    loginUser,
    deleteAccount
} from "../controllers/user_http_controller.js"
import express from 'express'
import authorization from "../middle_wares/user_http_req_authorization.js";


const userRouter = express.Router()

userRouter.get(SEND_OTP_END_POINT, sendOTP)
userRouter.post(REGISTER_USER_END_POINT, registerUser)
userRouter.put(EDIT_USERNAME_END_POINT, authorization, editUsername)
userRouter.put(EDIT_EMAIL_END_POINT, authorization, editEmail)
userRouter.post(LOGIN_USER_END_POINT, loginUser)
userRouter.delete(DELETE_ACCOUNT_END_POINT, authorization, deleteAccount)


export {userRouter}