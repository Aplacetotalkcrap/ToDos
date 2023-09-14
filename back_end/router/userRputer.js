const {Router} = require('express')
const router = Router()
const {registerSQL} = require('../model')
const bcrypt = require('bcrypt')
const {saltCount, pwdPrivateKey} = require('../config/config.default')
const {SUCCESS, ERROR, resultType} = require('../config/config.default')

// 配置路由
router.get('/hello', (req, res, next) => {
    res.send("HelloWorld!");
})

router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body)
        //参数验证
        const body = req.body
        body.password = bcrypt.hashSync(body.password + pwdPrivateKey, saltCount)
        const insertStatus = await registerSQL(body)
        if (insertStatus !== 2) {
            res.send(resultType(ERROR, "注册失败"))
            return
        }
        res.send(resultType(SUCCESS, "注册成功"))
    } catch (err) {
        console.log(err)
    }
})

module.exports = router