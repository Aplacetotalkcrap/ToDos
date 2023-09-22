// 导入 Express 的 Router 模块
const { Router } = require('express')
// 创建一个新的路由实例
const router = Router()
// 导入模型中的数据库操作函数和配置信息
const {
    registerSQL,
    phoneOccupySQL,
    loginSQL,
    queryTokenById,
    updateToken,
    insertToken
} = require('../model')
// 导入 bcrypt 模块，用于密码加密和验证
const bcrypt = require('bcrypt')
// 导入配置文件中的常量和私钥信息
const {
    saltCount,
    pwdPrivateKey,
    tokenPrivateKey,
    tokenExpiresIn,
    SUCCESS,
    ERROR,
    resultType
} = require('../config/config.default')
// 导入 JSON Web Token (JWT) 模块，用于生成和验证令牌
const jwt = require('jsonwebtoken')

// 定义一个简单的路由，用于返回 "HelloWorld!"
router.get('/hello', (req, res, next) => {
    res.send("HelloWorld!");
})

// 定义一个 POST 路由，用于用户注册
router.post('/register', async (req, res, next) => {
    try {
        // 打印请求体数据
        console.log(req.body)
        // 复制请求体数据以进行参数验证
        const body = { ...req.body }
        // 使用 bcrypt 进行密码加密
        body.password = bcrypt.hashSync(body.password + pwdPrivateKey, saltCount)
        // 执行用户注册数据库操作
        const insertStatus = await registerSQL(body)
        // 判断注册状态并发送相应响应
        if (insertStatus !== 2) {
            res.send(resultType(ERROR, "注册失败!"))
            return
        }
        res.send(resultType(SUCCESS, "注册成功!"))
    } catch (err) {
        console.log(err)
    }
})

// 定义一个 POST 路由，用于验证手机号是否已被注册
router.post('/phoneOccupy', async (req, res, next) => {
    try {
        // 验证手机号是否已被注册
        const isOccupy = await phoneOccupySQL(req.body.phone)
        if (isOccupy) {
            res.send(resultType(ERROR, "该手机号已被注册!"))
            return
        }
        res.send(resultType(SUCCESS, "该手机号未被注册!"))
    } catch (e) {
        console.log(e)
    }
})

// 定义一个 POST 路由，用于用户登录
router.post('/login', async (req, res, next) => {
    // 判断参数格式
    const userList = await loginSQL(req.body.phone)
    if (userList.length <= 0) {
        res.send(resultType(ERROR, "用户不存在，请先注册"))
        return
    }
    if (userList.length > 1) {
        // 写日志，并报警
    }
    // 查找匹配的用户
    const MrRight = userList.find(item => bcrypt.compareSync(req.body.password + pwdPrivateKey, item.pwd))
    if (!MrRight) return res.send(resultType(ERROR, "账号或密码错误"))
    // 生成令牌
    const token = jwt.sign(MrRight, tokenPrivateKey, { expiresIn: tokenExpiresIn })
    // 查询数据库中是否已存在令牌记录
    const query = await queryTokenById(MrRight.uid)
    if (query.length > 0) {
        // 修改令牌
        const update = await updateToken(MrRight.uid, token)
        if (update.changedRows === 0) return res.send(resultType(ERROR, "登陆失败"))
    } else {
        // 存入令牌
        const insert = await insertToken(MrRight.uid, token)
        if (insert.serverStatus !== 2) return res.send(resultType(ERROR, "登陆失败"))
    }
    // 删除敏感信息并添加令牌字段
    delete (MrRight.pwd) // 将密码字段删除，+ 手机号和邮箱中间变成****
    //删除用户在数据表里面的id
    delete (MrRight.uid)
    MrRight.token = token
    return res.send(resultType(SUCCESS, "登陆成功", MrRight))

})

// 导出路由实例
module.exports = router
