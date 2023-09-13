// 引入 express
const express = require('express');
// 导入 logger 日志对象
const {logger} = require('./config/config.default');
// 导入morgan
const morgan = require('morgan');

// 创建 express 对象
const app = express();

// 挂载 morgan
app.use(morgan('dev'));

// 配置和挂载解析body请求体方法
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '20mb'}));

// 配置路由
app.get('/hello', (req, res, next) => {
    res.send("HelloWorld!");
})

// 启动服务
app.listen(4000, () => {
    logger.warn("项目启动成功！端口：4000，http://127.0.0.1:4000");
})