import env from 'dotenv'
import mysql from 'mysql2'

env.config()

const dbConnectionPool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
).promise()


export {dbConnectionPool}