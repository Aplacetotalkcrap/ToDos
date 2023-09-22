// 导入 Express 的 Router 模块
const { Router } = require('express')
// 创建一个新的路由实例
const router = Router()
// 导入用户路由模块
const userRouter = require('./userRouter')
// 导入待办事项路由模块
const todoRouter = require('./todoRouter')

// 使用用户路由模块处理以 "/user" 开头的路由
router.use("/user", userRouter)
// 使用待办事项路由模块处理以 "/todo" 开头的路由
router.use("/todo", todoRouter)

// 导出路由实例
module.exports = router
