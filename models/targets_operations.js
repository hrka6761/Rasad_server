import { TARGETS_TABLE } from "../utilities/env.js";
import { dbConnectionPool } from "../utilities/db_config.js";

export class TargetsModel {
  static insertTarget = async (username, target) => {
    await dbConnectionPool.query(
      `INSERT INTO ${TARGETS_TABLE} (username, target) VALUE (?,?)`,
      [username, target]
    );
  };

  static fetchTarget = async (username, target) => {
    const [[result]] = await dbConnectionPool.query(
      `SELECT * FROM ${TARGETS_TABLE} WHERE username = ? AND target = ?`,
      [username, target]
    );
    return result;
  };

  static fetchTargets = async (username) => {
    const [result] = await dbConnectionPool.query(
      `SELECT * FROM ${TARGETS_TABLE} WHERE username = ?`,
      [username]
    );
    return result;
  };

  static removeUserTarget = async (username, target) => {
    const [result] = await dbConnectionPool.query(
      `DELETE FROM ${TARGETS_TABLE} WHERE username = ? AND target = ?`,
      [username, target]
    );
    return result.affectedRows;
  };

  static removeAllUserTargets = async (username) => {
    const [result] = await dbConnectionPool.query(
      `DELETE FROM ${TARGETS_TABLE} WHERE username = ?`,
      [username]
    );
    return result.affectedRows;
  };
}
