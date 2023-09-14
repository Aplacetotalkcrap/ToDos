// 引入 express
const express = require('express');
// 导入 logger 日志对象
const {logger} = require('./config/config.default');
// 导入morgan
const morgan = require('morgan');
//导入router
const router = require('./router');

// 创建 express 对象
const server = express();

// 挂载 morgan
server.use(morgan('dev'));

// 配置和挂载解析body请求体方法
server.use(express.json());
server.use(express.urlencoded({extended: false, limit: '20mb'}));

server.use("/api",router)

// 启动服务
server.listen(4000, () => {
    console.log("项目启动成功！端口：4000，http://127.0.0.1:4000");
})