// 导入 Express 的 Router 模块
const {Router} = require('express')
// 导入模型中的 registerSQL 函数
const {queryIdByToken, addAttentionTime,getAttentionTime, queryTodoList} = require("../model")
const {resultType,ERROR,SUCCESS} = require("../config/config.default");
const jwt = require('jsonwebtoken')
// 创建一个新的路由实例
const router = Router()

// 定义一个 GET 路由，用于查询待办事项
router.get('/setIntent', async (req, res, next) => {
    const userList = await queryIdByToken(req.query.token)//根据token查找id
    await addAttentionTime (userList[0].user_id)
})

router.get('/getIntent', async (req, res, next) => {
    // console.log(req.query.token)
    const userList = await queryIdByToken(req.query.token)//根据token查找id
    console.log(userList)
    const attentionTimer = await getAttentionTime(userList[0].user_id)
    console.log(attentionTimer)
    res.send({ attentionTimer});

})

// 导出路由实例
module.exports = router
