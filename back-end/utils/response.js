// 请求成功
const SUCCESS = 200;
// 请求失败
const FAIL = 400;
// 权限错误
const AUTHORIZATION_ERROR = 401;
// 跨域错误，禁止访问
const CORS_ERROR = 403;
// 服务器错误
const SERVER_ERROR = 500;

const resultType = (code, msg, data) => {
    return {
        code: code,
        msg: msg,
        data: data
    }
}

module.exports = {
    SUCCESS,
    FAIL,
    AUTHORIZATION_ERROR,
    CORS_ERROR,
    SERVER_ERROR,
    resultType
}