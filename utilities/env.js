//Database variables
const DB_HOST = 'localhost'
const DB_PORT = '3306'
const DB_NAME = 'rasaddb'
const DB_USERNAME = 'root'
const DB_PASSWORD = 'root'

//Names of the database tables
const USER_TABLE = 'user'

//Https variables
const HTTPS_PORT = '1367'
const BASE_USER_ROUTER = '/api/user'
const ADD_USER_END_POINT = '/add'
const UPDATE_USER_END_POINT = '/update'
const GET_USER_END_POINT = '/get/:mobile'
const DELETE_USER_END_POINT = '/delete/:id'

export {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    USER_TABLE,
    HTTPS_PORT,
    BASE_USER_ROUTER,
    ADD_USER_END_POINT,
    UPDATE_USER_END_POINT,
    GET_USER_END_POINT,
    DELETE_USER_END_POINT
}