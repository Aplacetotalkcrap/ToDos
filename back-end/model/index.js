const {db} = require('../config/config.default')
const mysql = require('mysql2/promise')

// 使用 'config.default' 中的数据库配置创建连接池。
const pool = mysql.createPool(db())

module.exports = pool

// 用于在数据库中注册用户的函数。
const registerSQL = async (userInfo) => {
    // 执行 SQL INSERT 查询以将用户信息添加到 'sys_user' 表中。
    const [insert, _] = await pool.execute('INSERT INTO sys_user (name,pwd,phone,email) VALUES (?,?,?,?)', [userInfo.username, userInfo.password, userInfo.phone, userInfo.email])
    return insert.serverStatus
}

// 用于检查数据库中是否已经存在该手机号的函数。
const phoneOccupySQL = async (phone) => {
    // 执行 SQL SELECT 查询以检查手机号是否存在于 'sys_user' 表中。
    const [query, _] = await pool.execute('SELECT uid FROM sys_user WHERE phone=?', [phone])
    return query.length !== 0
}

// 用于通过手机号检索用户信息（用于登录）的函数。
const loginSQL = async (phone) => {
    // 执行 SQL SELECT 查询以根据手机号检索用户信息。
    const [query, _] = await pool.execute('SELECT * FROM sys_user WHERE phone=?', [phone])
    return query
}

// 用于通过用户 ID 查询用户的待办事项列表的函数。
const queryTodoList = async (userId) => {
    // 执行 SQL SELECT 查询以检索用户的待办事项列表。
    const [query, _] = await pool.execute(
        'SELECT * FROM todo WHERE user_id=?',
        [userId]
    )
    return query
}

// 用于通过用户 ID 查询令牌的函数。
const queryTokenById = async (userId) => {
    // 执行 SQL SELECT 查询以根据用户 ID 查询令牌。
    const [query, _] = await pool.execute(
        'SELECT * FROM sys_token WHERE user_id=?',
        [userId]
    )
    return query
}

// 用于更新用户令牌的函数。
const updateToken = async (userId, token) => {
    // 执行 SQL UPDATE 查询以更新用户的令牌。
    const [update, _] = await pool.execute(
        'UPDATE sys_token SET token=? WHERE user_id=?',
        [token, userId]
    )
    return update
}

// 用于为用户插入新令牌的函数。
const insertToken = async (userId, token) => {
    // 执行 SQL INSERT 查询以为用户插入新令牌。
    const [insert, _] = await pool.execute(
        'INSERT INTO sys_token (user_id, token) VALUES(?,?)',
        [userId, token]
    )
    return insert
}

const queryIdByToken = async token => {
    const [query, _] = await pool.execute(
        'SELECT user_id FROM sys_token WHERE token=?',
        [token]
    )
    return query
}

const addEventTodo = async (userId, todo) => {
    try{
        const [insert, _] = await pool.execute(
            'INSERT INTO todo (user_id,event,complete) VALUES (?,?,?)',
            [userId, todo,0]
        )
        return insert.serverStatus
    }catch{

    }
}

const updateTodo = async (userId, todoId) => {
    // 执行 SQL UPDATE 查询以更新用户的令牌。
    const [update, _] = await pool.execute(
        'UPDATE todo SET complete=? WHERE user_id=? AND id=?',
        [1, userId, todoId]
    )
    return update.serverStatus
}

const deleteTodo = async (userId, todoId) => {
    const [del, _] = await pool.execute(
        'UPDATE todo SET is_delete=? WHERE user_id=? AND id=?',
        [1, userId, todoId]
    )
    return del.serverStatus
}

const addAttentionTime = async (userId) => {
    const [attention, _] = await pool.execute(
        'UPDATE sys_user SET attention_time=attention_time+? WHERE uid=?',
        [1, userId]
    )
    return attention.serverStatus
}

const getAttentionTime = async userId => {
    const [query, _] = await pool.execute(
        'SELECT attention_time FROM sys_user WHERE uid=?',
        [userId]
    )
    return query
};

module.exports = {
    registerSQL,
    phoneOccupySQL,
    loginSQL,
    queryTodoList,
    queryTokenById,
    updateToken,
    insertToken,
    queryIdByToken,
    addEventTodo,
    updateTodo,
    deleteTodo,
    addAttentionTime,
    getAttentionTime
}
