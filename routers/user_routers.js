import {
    ADD_USER_END_POINT,
    UPDATE_USER_END_POINT,
    DELETE_USER_END_POINT,
    GET_USER_END_POINT
} from "../utilities/env.js";
import {
    insertNewUser,
    editUserInfo,
    fetchUserByMobile,
    removeUser
} from "../controllers/user_controller.js"
import express from 'express'


const userRouter = express.Router()

userRouter.post(ADD_USER_END_POINT, insertNewUser)
userRouter.put(UPDATE_USER_END_POINT, editUserInfo)
userRouter.get(GET_USER_END_POINT, fetchUserByMobile)
userRouter.delete(DELETE_USER_END_POINT, removeUser)


export {userRouter}