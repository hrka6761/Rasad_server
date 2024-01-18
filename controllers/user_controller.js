import {tryCatchHandler} from "../utilities/try_catch_handler.js";
import {UserModel} from "../models/user_operations.js";
import {v4 as uuid} from 'uuid'
import {UserDataValidation as udv} from "../utilities/user_data_validation.js";


const registerUser = tryCatchHandler(async (req, res) => {
    udv.validateDataToInsert(req.body)
    const result = await UserModel.insertNewUser(prepareDataForInsert(req.body))
    res.status(200).json(result)
})

const editUsername = tryCatchHandler(async (req, res) => {
    udv.validateDataToEdit(req.body)
    const result = await UserModel.editUserUsername(prepareDataForEdit(req.body))
    res.status(200).json(result)
})

const editEmail = tryCatchHandler(async (req, res) => {
    udv.validateDataToEdit(req.body)
    const result = await UserModel.editUserEmail(prepareDataForEdit(req.body))
    res.status(200).json(result)
})

const editMobile = tryCatchHandler(async (req, res) => {
    udv.validateDataToEdit(req.body)
    const result = await UserModel.editUserMobile(prepareDataForEdit(req.body))
    res.status(200).json(result)
})

const loginUser = tryCatchHandler(async (req, res) => {
    udv.validateDataToFetch({mobile: req.params.mobile})
    const result = await UserModel.fetchUserByMobile(req.params.mobile)
    if (!result) {
        res.status(404).send('حساب کاربری با این شماره موبایل موجود نیست.')
        return
    }
    res.status(200).json(result)
})

const deleteAccount = tryCatchHandler(async (req, res) => {
    udv.validateDataToDelete({id: req.params.id})
    const result = await UserModel.removeUser(req.params.id)
    if (!result) {
        res.status(404).send('حساب کاربری با این آیدی موجود نیست.')
        return
    }
    res.sendStatus(200)
})


function prepareDataForInsert(user) {
    const id = uuid()
    const username = user.username
    const mobile = user.mobile
    const email = user.email

    return {id, username, mobile, email}
}

function prepareDataForEdit(user) {
    const id = user.id
    const username = user.username
    const mobile = user.mobile
    const email = user.email

    return {id, username, mobile, email}
}


export {
    registerUser,
    editUsername,
    editEmail,
    editMobile,
    loginUser,
    deleteAccount
}