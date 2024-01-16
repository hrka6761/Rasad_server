import {DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} from './env.js'
import mysql from 'mysql2'


const dbConnectionPool = mysql.createPool(
    {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        user: DB_USERNAME,
        password: DB_PASSWORD
    }
).promise()


export {dbConnectionPool}