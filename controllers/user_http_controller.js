import { tryCatchHandler } from "../utilities/try_catch_handler.js";
import { UserModel } from "../models/user_operations.js";
import { TargetsModel } from "../models/targets_operations.js";
import { v4 as uuid } from "uuid";
import { UserDataValidation as udv } from "../utilities/user_data_validation.js";
import pkg from "jsonwebtoken";
import { SIGNATURE, TOKEN_HEADER_KEY } from "../utilities/env.js";

export const sendOTP = tryCatchHandler(async (req, res) => {
  udv.validateDataToSendOTP({ mobile: req.params.mobile });
  const otp = prepareOTPByMobile(req.params.mobile);
  sendOTPForUser(otp, req.params.mobile);
  res.sendStatus(200);
});

export const registerUser = tryCatchHandler(async (req, res) => {
  udv.validateDataToInsert(req.body);
  const result = await UserModel.insertNewUser(prepareDataForInsert(req.body));
  const token = result.token;
  delete result.token;
  res.header(TOKEN_HEADER_KEY, token).status(200).json(result);
});

export const loginUser = tryCatchHandler(async (req, res) => {
  udv.validateDataToLogin({ mobile: req.body.mobile, otp: req.body.otp });
  if (req.body.otp === "111111") {
    const result = await UserModel.fetchUserByMobile(req.body.mobile);
    if (!result) {
      res.status(404).send("حساب کاربری با این شماره موبایل موجود نیست.");
      return;
    }
    const token = result.token;
    delete result.token;
    res.header(TOKEN_HEADER_KEY, token).status(200).json(result);
  } else res.sendStatus(400);
});

export const deleteAccount = tryCatchHandler(async (req, res) => {
  udv.validateDataToDelete({ id: req.params.id });
  const result = await UserModel.removeUser(req.params.id);
  if (!result) {
    res.status(404).send("حساب کاربری با این آیدی موجود نیست.");
    return;
  }
  res.sendStatus(200);
});

export const editUsername = tryCatchHandler(async (req, res) => {
  udv.validateDataToEditUsername(req.body);
  const result = await UserModel.editUserUsername(prepareDataForEdit(req.body));
  res.status(200).json(result);
});

export const editEmail = tryCatchHandler(async (req, res) => {
  udv.validateDataToEditEmail(req.body);
  const result = await UserModel.editUserEmail(prepareDataForEdit(req.body));
  res.status(200).json(result);
});

export const getObservers = tryCatchHandler(async (req, res) => {
  const targets = await TargetsModel.fetchTargets(req.body.username);

  if (targets.length != 0) res.status(200).send(targets);
  else res.sendStatus(404);
});

export const deleteObserver = tryCatchHandler(async (req, res) => {
  const result = await TargetsModel.removeUserTarget(
    req.body.username,
    req.body.target
  );

  if (result === 1) res.sendStatus(200);
  else res.sendStatus(404);
});

export const addObserver = tryCatchHandler(async (req, res) => {
  const isUserExist = await UserModel.fetchUserByUsername(req.body.username);

  if (!isUserExist) {
    res.status(404).send("کاربری با این نام کاربری موجود نیست.");
    return;
  }

  const isAlreadyAdded = await TargetsModel.fetchTarget(
    req.body.username,
    req.body.target
  );

  if (isAlreadyAdded) {
    res
      .status(400)
      .send("شما قبلا اجازه دسترسی را برای این کاربر ثبت کرده اید.");
    return;
  }
  
  const result = await TargetsModel.insertTarget(
    req.body.username,
    req.body.target
  );

  if (result) res.sendStatus(200);
  else res.sendStatus(500);
});

function prepareDataForInsert(user) {
  const id = uuid();
  const username = user.username;
  const mobile = user.mobile;
  const token = createToken(id);
  const email = user.email;

  return { id, username, mobile, token, email };
}

function prepareDataForEdit(user) {
  const id = user.id;
  const username = user.username;
  const mobile = user.mobile;
  const email = user.email;

  return { id, username, mobile, email };
}

function prepareOTPByMobile(mobile) {
  return "111111";
}

function sendOTPForUser(otp, mobile) {}

function createToken(id) {
  return pkg.sign({ id: id }, SIGNATURE);
}
