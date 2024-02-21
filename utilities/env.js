//Database variables
const DB_HOST = 'localhost'
const DB_PORT = '3306'
const DB_NAME = 'rasaddb'
const DB_USERNAME = 'root'
const DB_PASSWORD = 'root'

//Names of the database tables
const USER_TABLE = 'user'
const TARGETS_TABLE = 'user_targets'

//Https variables
const HTTPS_PORT = '1367'
const SIGNALING_PORT = '13676'
const WEB_SOCKET_PORT = '11066'
const BASE_USER_ROUTER = '/api/user'
const SEND_OTP_END_POINT = '/otp/:mobile'
const REGISTER_USER_END_POINT = '/register'
const EDIT_USERNAME_END_POINT = '/edit/username'
const EDIT_EMAIL_END_POINT = '/edit/email'
const LOGIN_USER_END_POINT = '/login'
const DELETE_ACCOUNT_END_POINT = '/delete_account/:id'

//Token signature
const SIGNATURE = "rasad_signaling_server_signature_author_HAMIDREZA_KARAMI_1367_0010520661"
const TOKEN_HEADER_KEY = 'Authorization'

export {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    USER_TABLE,
    TARGETS_TABLE,
    HTTPS_PORT,
    SIGNALING_PORT,
    WEB_SOCKET_PORT,
    BASE_USER_ROUTER,
    SEND_OTP_END_POINT,
    REGISTER_USER_END_POINT,
    EDIT_USERNAME_END_POINT,
    EDIT_EMAIL_END_POINT,
    LOGIN_USER_END_POINT,
    DELETE_ACCOUNT_END_POINT,
    SIGNATURE,
    TOKEN_HEADER_KEY
}