import joi from "joi";
import {ValidationError} from "../middle_wares/error_handling.js";

class UserDataValidation {

    static validateDataToInsert(userData) {
        const schema = {
            id: joi.optional(),
            username: joi.string().max(60).required().messages({
                'string.base': 'نام کاربری باید از نوع string باشد.',
                'string.max': 'نام کاربری باید کمتر از 60 کاراکتر باشد.',
                'any.required': 'تعیین نام کاربری منحصر به فرد برای شناسایی توسط دیگران الزامی است.'
            }),
            mobile: joi.string().length(11).pattern(new RegExp('^09\\d{9}\$')).required().messages({
                'string.base': 'موبایل باید از نوع string باشد.',
                'string.pattern.base': 'فرمت موبایل بایدبه صورت *********09 باشد.',
                'string.length': 'موبایل باید 11 کاراکتر باشد.',
                'any.required': 'تعیین موبایل برای شناسایی الزامی است.'
            }),
            email: joi.string().max(60).email().messages({
                'string.base': 'ایمیل باید از نوع string باشد.',
                'string.email': 'فرمت ایمیل باید به صورت any@any.any باشد.',
                'string.max': 'نام کاربری باید کمتر از 60 کاراکتر باشد.',
            }),
        }

        const error = joi.object(schema).validate(userData).error
        if (error) throw new ValidationError(error.details[0].message, 400)
    }

    static validateDataToEdit(userData) {
        const schema = {
            id: joi.uuid().required().messages({
                'string.guid': 'فرمت آیدی اشتباه است.',
                'any.required': 'ارسال آیدی برای شناسایی کاربر الزامی است.'
            }),
            username: joi.string().max(60).required().messages({
                'string.base': 'نام کاربری باید از نوع string باشد.',
                'string.max': 'نام کاربری باید کمتر از 60 کاراکتر باشد.',
                'any.required': 'تعیین نام کاربری منحصر به فرد برای شناسایی توسط دیگران الزامی است.'
            }),
            mobile: joi.string().length(11).pattern(new RegExp('^09\\d{9}\$')).required().messages({
                'string.base': 'موبایل باید از نوع string باشد.',
                'string.pattern.base': 'فرمت موبایل بایدبه صورت *********09 باشد.',
                'string.length': 'موبایل باید 11 کاراکتر باشد.',
                'any.required': 'تعیین موبایل برای شناسایی الزامی است.'
            }),
            email: joi.string().max(60).email().messages({
                'string.base': 'ایمیل باید از نوع string باشد.',
                'string.email': 'فرمت ایمیل باید به صورت any@any.any باشد.',
                'string.max': 'نام کاربری باید کمتر از 60 کاراکتر باشد.',
            }),
        }

        const error = joi.object(schema).validate(userData).error
        if (error) throw new ValidationError(error.details[0].message, 400)
    }

    static validateDataToFetch(mobile) {
        const schema = {
            mobile: joi.string().length(11).pattern(new RegExp('^09\\d{9}\$')).required().messages({
                'string.base': 'موبایل باید از نوع string باشد.',
                'string.pattern.base': 'فرمت موبایل بایدبه صورت *********09 باشد.',
                'string.length': 'موبایل باید 11 کاراکتر باشد.',
                'any.required': 'تعیین موبایل برای شناسایی الزامی است.'
            })
        }

        const error = joi.object(schema).validate(mobile).error
        if (error) throw new ValidationError(error.details[0].message, 400)
    }

    static validateDataToDelete(id) {
        const schema = {
            id: joi.string().uuid().required().messages({
                'string.guid': 'فرمت آیدی اشتباه است.',
                'any.required': 'ارسال آیدی برای شناسایی کاربر الزامی است.'
            })
        }

        const error = joi.object(schema).validate(id).error
        if (error) throw new ValidationError(error.details[0].message, 400)
    }
}


export {UserDataValidation}