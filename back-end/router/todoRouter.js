// 导入 Express 的 Router 模块
const {Router, query} = require('express')
// 导入模型中的 registerSQL函数
const {queryTodoList} = require("../model")
// 创建一个新的路由实例
const router = Router()

router.get('/queryTodo', async (req, res, next) => {
    console.log(req.query)
try {
    const todolist = await queryTodoList(req.query.userId)
    console.log(todolist)
    const newTodoList = todolist.filter(todo => todo.complete ===0)
    console.log(newTodoList)
    res.send(newTodoList)
} catch (err) {
}
})

module.exports = router

