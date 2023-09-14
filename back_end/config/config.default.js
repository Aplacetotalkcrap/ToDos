//数据库链接
const db = ()=>{
    return{
        host: 'localhost',
        user:'root',
        password:'root',
        database:'todos',
    }
}

const pwdPrivateKey = 'bb870e67-021f-446b-9a22-8a99a18e6eabBB870E67-021F-446B-9A22-8A99A18E6EAB'
const saltCount = 15

const SUCCESS = 200
const ERROR = 400

const resultType = (code,msg,data=null)=>{
    return{
        code:code,
        msg:msg,
        data:data
    }
}

module.exports = {
    db,
    pwdPrivateKey,
    saltCount,
    resultType,
    SUCCESS,
    ERROR
};