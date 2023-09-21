const {Router} = require('express')
const {registerSQL, phoneOccupySQL, loginSQL, queryTokenById, updateToken, insertToken} = require('../model')
const router = Router()
const bcrypt = require('bcrypt')
const {saltCount, pwdPrivateKey, tokenPrivateKey, tokenExpiresIn} = require('../config/config.default')
const {SUCCESS, ERROR, resultType} = require('../config/config.default')
//导入token
const jwt = require('jsonwebtoken')


router.get('/hello', (req, res, next) => {
    res.send("HelloWorld!");
})

router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body)
        //参数验证
        const body = {...req.body}
        body.password = bcrypt.hashSync(body.password + pwdPrivateKey, saltCount)
        const insertStatus = await registerSQL(body)
        if (insertStatus !== 2) {
            res.send(resultType(ERROR, "注册失败!"))
            return
        }
        res.send(resultType(SUCCESS, "注册成功!"))
    } catch (err) {
        console.log(err)
    }

})

router.post('/phoneOccupy', async (req, res, next) => {
    try {
        //验证手机号
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

router.post('/login', async (req, res, next) => {
    // console.log(req.body)
    // 判断参数格式
    const userList = await loginSQL(req.body.phone)
    if (userList.length <= 0) {
        res.send(resultType(ERROR, "用户不存在，请先注册"))
        return
    }
    if (userList.length > 1) {
        //写日志，并报警
    }
    const MrRight = userList.find(item => bcrypt.compareSync(req.body.password + pwdPrivateKey, item.pwd))
    // console.log(MrRight)
    if (!MrRight) return res.send(resultType(ERROR, "账号或密码错误"))
    const token = jwt.sign(MrRight, tokenPrivateKey, {expiresIn: tokenExpiresIn})
    const query = await queryTokenById(MrRight.uid)
    if (query.length > 0) {
        //修改token
        const update = await updateToken(MrRight.uid, token)
        if (update.changedRows === 0) return res.send(resultType(ERROR, "登陆失败"))
    }else{
        //存入token
        const insert = await insertToken(MrRight.uid, token)
        if (insert.serverStatus !== 2) return res.send(resultType(ERROR, "登陆失败"))
    }
    delete (MrRight.pwd)   //  +  手机号和邮箱中间变成****
    MrRight.token = token
    return res.send(resultType(SUCCESS, "登陆成功", MrRight))
})

module.exports = router