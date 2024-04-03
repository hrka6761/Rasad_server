//Database variables
export const DB_HOST = "62.60.201.8";
export const DB_PORT = "3306";
export const DB_NAME = "srprasad_db";
export const DB_USERNAME = "srprasad_hrka6761";
export const DB_PASSWORD = "S68UpudD)PIX";

//Names of the database tables
export const USER_TABLE = "user";
export const TARGETS_TABLE = "user_targets";

//Https variables
export const HTTPS_PORT = "30001";
export const WEB_SOCKET_PORT = "30002";
export const BASE_USER_ROUTER = "/api/user";
export const SEND_OTP_END_POINT = "/otp/:mobile";
export const REGISTER_USER_END_POINT = "/register";
export const EDIT_USERNAME_END_POINT = "/edit/username";
export const EDIT_EMAIL_END_POINT = "/edit/email";
export const LOGIN_USER_END_POINT = "/login";
export const DELETE_ACCOUNT_END_POINT = "/delete_account/:id";
export const GET_OBSERVERS_END_POINT = "/get_observers";
export const DELETE_OBSERVER_END_POINT = "/delete_observer";
export const ADD_OBSERVER_END_POINT = "/add_observer";

//Token signature
export const SIGNATURE =
  "rasad_signaling_server_signature_author_HAMIDREZA_KARAMI_1367_0010520661";
export const TOKEN_HEADER_KEY = "Authorization";
