const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError)
        res.status(error.errorCode).send(error.message)
    else if (error.sql) {
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.sqlMessage.includes('user.mobile_UNIQUE'))
                res.status(409).send("این موبایل قبلا ثبت شده است.")
            else if (error.sqlMessage.includes('user.username_UNIQUE'))
                res.status(409).send("این نام کاربری قبلا ثبت شده است.")
        } else
            res.status(500).send("خطای غیر منتظره !!!")
    } else
        res.status(500).send("خطای غیر منتظره !!!")
}


class ValidationError extends Error {

    constructor(message, errorCode) {
        super(message);
        this.message = message
        this.errorCode = errorCode
    }
}


export {errorHandler, ValidationError}