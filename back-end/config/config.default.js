// 数据库的连接配置
const db = () =>{
    return {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'todos'
    }
}

const pwdPrivateKey = '2308B038-D59A-4A32-95C0-1043940BDF78'
const saltCount = 15

const tokenPrivateKey = '472612ef-9609-45a3-aa09-44a9b7c356a7472612EF-9609-45A3-AA09-44A9B7C356A7'

const tokenExpiresIn = 60

const SUCCESS = 200
const ERROR = 400

const resultType = (code,msg,data = null) =>{
    return {
        code: code,
        msg: msg,
        data: data,
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