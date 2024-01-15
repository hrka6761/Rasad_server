import mysql from 'mysql2'


const dbConnectionPool = mysql.createPool(
    {
        host: 'localhost',
        database: 'rasaddb',
        user: 'root',
        password: 'root'
    }
).promise()


export {dbConnectionPool}