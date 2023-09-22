// 请求成功的状态码
const SUCCESS = 200;
// 请求失败的状态码
const FAIL = 400;
// 权限错误的状态码
const AUTHORIZATION_ERROR = 401;
// 跨域错误，禁止访问的状态码
const CORS_ERROR = 403;
// 服务器错误的状态码
const SERVER_ERROR = 500;

// 定义一个函数，用于返回带有状态码、消息和数据的结果对象
const resultType = (code, msg, data) => {
    return {
        code: code,  // 状态码
        msg: msg,    // 消息
        data: data   // 数据
    }
}

// 导出常量和函数
module.exports = {
    SUCCESS,
    FAIL,
    AUTHORIZATION_ERROR,
    CORS_ERROR,
    SERVER_ERROR,
    resultType
}
