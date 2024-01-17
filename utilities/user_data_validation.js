import joi from "joi";

class UserDataValidation {

    static validateDataToInsert(userData) {
        const schema = {
            id: joi.optional(),
            username: joi.string().max(45).required(),
            mobile: joi.string().length(11).pattern(new RegExp('^09\\d{9}\$')).required(),
            email: joi.string().max(45).email(),
        }

        const error = joi.object(schema).validate(userData).error
        if (error) throw error
    }

    static validateDataToEdit(userData) {
        const schema = {
            id: joi.string().uuid().required(),
            username: joi.string().max(45).required(),
            mobile: joi.string().length(11).pattern(new RegExp('^09\\d{9}\$')).required(),
            email: joi.string().max(45).email(),
        }

        const error = joi.object(schema).validate(userData).error
        if (error) throw error
    }

    static validateDataToFetch(mobile) {
        const schema = {
            mobile: joi.string().length(11).pattern(new RegExp('^09\\d{9}\$')).required()
        }

        const error = joi.object(schema).validate(mobile).error
        if (error) throw error
    }

    static validateDataToDelete(id) {
        const schema = {
            id: joi.string().uuid().required()
        }

        const error = joi.object(schema).validate(id).error
        if (error) throw error
    }
}


export {UserDataValidation}