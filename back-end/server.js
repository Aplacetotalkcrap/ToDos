// 导入 Express 框架
const express = require('express');
// 导入自定义的路由模块
const router = require('./router');
// 创建 Express 应用实例
const app = express();

// 使用 JSON 解析中间件，以支持请求体的 JSON 数据解析
app.use(express.json())
// 使用 URL 编码解析中间件，以支持表单数据解析
app.use(express.urlencoded({ extended: false }))

// 使用自定义路由模块处理以 "/api" 开头的路由
app.use('/api', router);

// 启动 Express 应用，监听端口 4000
app.listen(4000, () => {
    console.log("server running at post 4000")
})
