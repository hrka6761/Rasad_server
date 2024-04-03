import { USER_TABLE } from "../utilities/env.js";
import { dbConnectionPool } from "../utilities/db_config.js";

export class UserModel {
  static insertNewUser = async (user) => {
    await dbConnectionPool.query(
      `INSERT INTO ${USER_TABLE} (id, username, mobile, token, email) VALUE (?,?,?,?,?)`,
      [user.id, user.username, user.mobile, user.token, user.email]
    );
    return user;
  };

  static fetchUserByMobile = async (mobile) => {
    const [[result]] = await dbConnectionPool.query(
      `SELECT * FROM ${USER_TABLE}  WHERE mobile = ?`,
      [mobile]
    );
    return result;
  };

  static fetchUserByUsername = async (username) => {
    const [[result]] = await dbConnectionPool.query(
      `SELECT * FROM ${USER_TABLE} WHERE username = ?`,
      [username]
    );
    return result;
  };

  static removeUser = async (id) => {
    const [result] = await dbConnectionPool.query(
      `DELETE FROM ${USER_TABLE} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  };

  static editUserUsername = async (user) => {
    await dbConnectionPool.query(
      `UPDATE ${USER_TABLE} SET username = ? WHERE id = ?`,
      [user.username, user.id]
    );
    return user;
  };

  static editUserEmail = async (user) => {
    await dbConnectionPool.query(
      `UPDATE ${USER_TABLE} SET email = ? WHERE id = ?`,
      [user.email, user.id]
    );
    return user;
  };
}
