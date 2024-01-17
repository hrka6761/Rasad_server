import {USER_TABLE} from "../utilities/env.js";
import {dbConnectionPool} from "../utilities/db_config.js"


class UserModel {

    static insertNewUser = async (user) => {
        const [result] = await dbConnectionPool.query(
            `INSERT INTO ${USER_TABLE} (fullname, mobile, email) VALUE (?,?,?)`,
            [user.fullname, user.mobile, user.email])
        return result.insertId
    }

    static editUserInfo = async (user) => {
        const [result] = await dbConnectionPool.query(
            `UPDATE ${USER_TABLE}
             SET fullname = ?,
                 mobile   = ?,
                 email    = ?
             WHERE id = ?`,
            [user.fullname, user.mobile, user.email, user.id])
        return result.insertId
    }

    static fetchUserByMobile = async (mobile) => {
        const [[result]] = await dbConnectionPool.query(
            `SELECT *
             FROM ${USER_TABLE}
             WHERE mobile = ?`,
            [mobile])
        return result
    }

    static deleteUser = async (id) => {
        const [result] = await dbConnectionPool.query(
            `DELETE
             FROM ${USER_TABLE}
             WHERE id = ?`,
            [id]
        )
        return result.affectedRows
    }
}


export {UserModel}
