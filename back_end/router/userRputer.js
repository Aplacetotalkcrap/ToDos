const {Router} = require('express')
const router = Router()
const {registerSQL, phoneOccupySQL, LoginSQL} = require('../model')
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
});

router.post('/phoneOccupy', async (req, res, next) => {
    try {
        //验证手机号参数格式
        //用正则判断电话号码的格式 -》false->400电话号码格式错误
        const isOccupy = await phoneOccupySQL(req.body.phone)
        if (isOccupy) {
            res.send(resultType(ERROR, "此手机号已被注册"))
            return
        }
        res.send(resultType(SUCCESS, "此电话号码可用"))
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res, next) => {
    console.log(req.body)
    //判断参数格式
    const userList = await LoginSQL(req.body.phone)
    if (userList.length <= 0) {
        res.send(resultType(ERROR, "用户不存在，请先注册"))
        return
    }
    if (userList.length > 1) {
        //写日志，并报警
    }
    const MrRight = userList.find(item => bcrypt.compareSync(req.body.password + pwdPrivateKey, item.pwd))
    console.log(MrRight)
    delete(MrRight.pwd)
    console.log(MrRight)
    res.send(resultType(SUCCESS, "登陆成功",MrRight))

})
module.exports = router