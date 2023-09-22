// 数据库的连接配置
const db = () => {
    return {
        host: 'localhost', // 数据库主机名
        user: 'root',      // 数据库用户名
        password: 'root',  // 数据库密码
        database: 'todos'  // 数据库名称
    }
}

// 密码私钥，用于加密密码
const pwdPrivateKey = '2308B038-D59A-4A32-95C0-1043940BDF78'

// 密码加盐次数
const saltCount = 15

// 令牌私钥，用于生成和验证令牌
const tokenPrivateKey = '472612ef-9609-45a3-aa09-44a9b7c356a7472612EF-9609-45A3-AA09-44A9B7C356A7'

// 令牌过期时间（以秒为单位）
const tokenExpiresIn = 60 * 60

// 成功状态码
const SUCCESS = 200

// 错误状态码
const ERROR = 400

// 返回结果的数据结构
const resultType = (code, msg, data = null) => {
    return {
        code: code,     // 状态码
        msg: msg,       // 消息
        data: data,     // 数据
    }
}

module.exports = {
    db,
    pwdPrivateKey,
    saltCount,
    ERROR,
    SUCCESS,
    tokenPrivateKey,
    tokenExpiresIn,
    resultType,
}
