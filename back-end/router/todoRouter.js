// 导入 Express 的 Router 模块
const {Router, query} = require('express')
// 导入模型中的 registerSQL 函数
const {queryTodoList, queryTokenById, queryIdByToken, addEventTodo, updateTodo} = require("../model")
const {resultType,ERROR,SUCCESS} = require("../config/config.default");
// 创建一个新的路由实例
const router = Router()

// 定义一个 GET 路由，用于查询待办事项
router.get('/todos', async (req, res, next) => {
    const userList = await queryIdByToken(req.query.token)//根据token查找id
    // console.log(userList[0].user_id)
    try {
        const todolist = await queryTodoList(userList[0].user_id)
        res.send(resultType(SUCCESS,"添加成功",todolist))
    } catch (err) {}
})

router.post('/saveTodo', async (req, res, next) => {
    try {
        const userList = await queryIdByToken(req.body.token)
        const insertStatus = await addEventTodo(userList[0].user_id, req.body.event)
        if (insertStatus !== 2) {
            res.send(resultType(ERROR, "添加失败"))
            return
        }
        res.send(resultType(SUCCESS, "添加成功"))
    } catch (err) {
        console.log(err)
    }
})

router.post('/modifyToDo', async (req, res, next) => {
    // console.log(req.body)
    const userList = await queryIdByToken(req.body.token)
    const insertStatusArr = []
    for (let completedArrElement of req.body.completedArr) {
        const insertStatus = await updateTodo(userList[0].user_id, completedArrElement)
        insertStatusArr.push(insertStatus)
    }/**/
    if (insertStatusArr.find(item => item !== 2)) {
        //如果任意一个插入不成功回复失败
        res.send(resultType(ERROR, "修改失败"))
        return
    }
    //如果数组当中全部都是2回复成功
    res.send(resultType(SUCCESS, "添加成功"))
})

// 导出路由实例
module.exports = router
