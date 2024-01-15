import {dbConnectionPool} from "../utilities/db_config.js"


class UserModel {

    static insertNewUser = async (user) => {
        try {
            const [result] = await dbConnectionPool.query(
                `INSERT INTO user (fullname, mobile, email) VALUE (?,?,?)`,
                [user.fullname, user.mobile, user.email])
            return result.insertId
        } catch (error) {
            return error
        }
    }

    static editUserInfo = async (user) => {
        try {
            const [result] = await dbConnectionPool.query(
                `UPDATE user
                 SET fullname = ?,
                     mobile   = ?,
                     email    = ?
                 WHERE id = ?`,
                [user.fullname, user.mobile, user.email, user.id])
            return result.insertId
        } catch (error) {
            return error
        }
    }

    static fetchUserByMobile = async (mobile) => {
        const [[result]] = await dbConnectionPool.query(
            `SELECT *
             FROM user
             WHERE mobile = ?`,
            [mobile])
        return result
    }

    static deleteUser = async (id) => {
        const [result] = await dbConnectionPool.query(
            `DELETE
             FROM user
             WHERE id = ?`,
            [id]
        )
        return result.affectedRows
    }
}


export {UserModel}
