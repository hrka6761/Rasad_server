import joi from "joi";
import { ValidationError } from "../middle_wares/error_handling.js";

export class UserDataValidation {
  static validateDataToInsert(userData) {
    const schema = {
      id: joi.optional(),
      username: joi.string().max(30).required().messages({
        "string.base": "نام کاربری باید از نوع string باشد.",
        "string.max": "نام کاربری باید کمتر از 30 کاراکتر باشد.",
        "any.required":
          "تعیین نام کاربری منحصر به فرد برای شناسایی توسط دیگران الزامی است.",
      }),
      mobile: joi
        .string()
        .length(11)
        .pattern(new RegExp("^09\\d{9}$"))
        .required()
        .messages({
          "string.base": "موبایل باید از نوع string باشد.",
          "string.pattern.base": "فرمت موبایل بایدبه صورت *********09 باشد.",
          "string.length": "موبایل باید 11 کاراکتر باشد.",
          "any.required": "تعیین موبایل برای شناسایی الزامی است.",
        }),
      email: joi.string().max(30).email().allow("").optional().messages({
        "string.base": "ایمیل باید از نوع string باشد.",
        "string.email": "فرمت ایمیل باید به صورت any@any.any باشد.",
        "string.max": "نام کاربری باید کمتر از 30 کاراکتر باشد.",
      }),
    };

    const error = joi.object(schema).validate(userData).error;
    if (error) throw new ValidationError(error.details[0].message, 400);
  }

  static validateDataToEditUsername(userData) {
    const schema = {
      id: joi.string().uuid().required().messages({
        "string.guid": "فرمت آیدی اشتباه است.",
        "any.required": "ارسال آیدی برای شناسایی کاربر الزامی است.",
      }),
      username: joi.string().max(30).required().messages({
        "string.base": "نام کاربری باید از نوع string باشد.",
        "string.max": "نام کاربری باید کمتر از 30 کاراکتر باشد.",
        "any.required":
          "تعیین نام کاربری منحصر به فرد برای شناسایی توسط دیگران الزامی است.",
      }),
      mobile: joi.optional(),
      email: joi.optional(),
    };

    const error = joi.object(schema).validate(userData).error;
    if (error) throw new ValidationError(error.details[0].message, 400);
  }

  static validateDataToEditEmail(userData) {
    const schema = {
      id: joi.string().uuid().required().messages({
        "string.guid": "فرمت آیدی اشتباه است.",
        "any.required": "ارسال آیدی برای شناسایی کاربر الزامی است.",
      }),
      username: joi.optional(),
      mobile: joi.optional(),
      email: joi.string().max(30).email().required().messages({
        "string.base": "ایمیل باید از نوع string باشد.",
        "string.email": "فرمت ایمیل باید به صورت any@any.any باشد.",
        "string.max": "نام کاربری باید کمتر از 30 کاراکتر باشد.",
      }),
    };

    const error = joi.object(schema).validate(userData).error;
    if (error) throw new ValidationError(error.details[0].message, 400);
  }

  static validateDataToLogin(userData) {
    const schema = {
      mobile: joi
        .string()
        .length(11)
        .pattern(new RegExp("^09\\d{9}$"))
        .required()
        .messages({
          "string.base": "موبایل باید از نوع string باشد.",
          "string.pattern.base": "فرمت موبایل بایدبه صورت *********09 باشد.",
          "string.length": "موبایل باید 11 کاراکتر باشد.",
          "any.required": "تعیین موبایل برای شناسایی الزامی است.",
        }),
      otp: joi.string().length(6).regex(/^\d+$/).required().messages({
        "string.base": "رمز موقت باید از نوع string باشد.",
        "string.pattern.base": "رمز موقت تنها شامل عدد است.",
        "string.length": "رمز موقت باید 6 کاراکتر باشد.",
        "any.required": "تعیین رمز موقت برای شناسایی الزامی است.",
      }),
    };

    const error = joi.object(schema).validate(userData).error;
    if (error) throw new ValidationError(error.details[0].message, 400);
  }

  static validateDataToSendOTP(userData) {
    const schema = {
      mobile: joi
        .string()
        .length(11)
        .pattern(new RegExp("^09\\d{9}$"))
        .required()
        .messages({
          "string.base": "موبایل باید از نوع string باشد.",
          "string.pattern.base": "فرمت موبایل بایدبه صورت *********09 باشد.",
          "string.length": "موبایل باید 11 کاراکتر باشد.",
          "any.required": "تعیین موبایل برای شناسایی الزامی است.",
        }),
    };

    const error = joi.object(schema).validate(userData).error;
    if (error) throw new ValidationError(error.details[0].message, 400);
  }

  static validateDataToDelete(id) {
    const schema = {
      id: joi.string().uuid().required().messages({
        "string.guid": "فرمت آیدی اشتباه است.",
        "any.required": "ارسال آیدی برای شناسایی کاربر الزامی است.",
      }),
    };

    const error = joi.object(schema).validate(id).error;
    if (error) throw new ValidationError(error.details[0].message, 400);
  }
}
