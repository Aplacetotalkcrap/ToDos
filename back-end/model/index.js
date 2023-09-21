const {db} = require('../config/config.default')
const mysql = require('mysql2/promise')

const pool = mysql.createPool(db())

module.exports = pool


const registerSQL = async (userInfo) => {
    const [insert, _] = await pool.execute('INSERT INTO sys_user (name,pwd,phone,email) VALUES (?,?,?,?)', [userInfo.username, userInfo.password, userInfo.phone, userInfo.email])
    return insert.serverStatus
}

const phoneOccupySQL = async (phone) => {
    const [query, _] = await pool.execute('SELECT uid FROM sys_user WHERE phone=?', [phone])
    return query.length !== 0
}

const loginSQL = async (phone) => {
    const [query, _] = await pool.execute('SELECT * FROM sys_user WHERE phone=?', [phone])
    return query
}
const queryTodoList = async (userId) => {
    const [query, _] = await pool.execute(
        'SELECT * FROM todo WHERE user_id=?',
        [userId]
    )
    return query
}

const queryTokenById = async (userId) => {
    const [query, _] = await pool.execute(
        'SELECT * FROM sys_token WHERE user_id=?',
        [userId]
    )
    return query
}

//修改token
const updateToken = async (userId, token) => {
    const [update, _] = await pool.execute(
        'UPDATE sys_token SET token=? WHERE user_id=?',
        [token,userId]
    )
    return update
}

//插入token
const insertToken = async (userId, token) => {
    const [insert,_] = await pool.execute(
        'INSERT INTO sys_token (user_id, token) VALUES(?,?)',
        [userId, token]
    )
    return insert
}

module.exports = {
    registerSQL,
    phoneOccupySQL,
    loginSQL,
    queryTodoList,
    queryTokenById,
    updateToken,
    insertToken
}