const {db} =require('../config/config.default')
const mysql = require('mysql2/promise')

const pool = mysql.createPool(db())

module.exports = pool

const registerSQL = async (userInfo) => {
    const [insert,_] =await pool.execute('INSERT INTO sys_user (name,pwd,phone,email) VALUES (?,?,?,?)',[userInfo.username,userInfo.password,userInfo.phone,userInfo.email])
    return insert.serverStatus
}

const phoneOccupySQL =async (phone) => {
    const [query,_] = await pool.execute(
        'SELECT uid FROM sys_user WHERE phone=?',[phone]
    )
    return query.length !== 0
}

const LoginSQL = async (phone) => {
const [query,_] = await pool.execute(
    'SELECT * FROM sys_user WHERE phone=?',[phone]
)
    return query
}

module.exports = {
    registerSQL,
    phoneOccupySQL,
    LoginSQL
}