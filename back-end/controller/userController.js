// '/hello' 路由
const hello = (req, res, next) => {
    res.send('HelloWorld!');
}

/**
 * 电话号码查重
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const phoneOccupy = async (req, res, next) => {
    try {
        // 1.获取请求体数据
        const body = req.body;
        // 2.数据验证
        // 判断是否为空
        if (!body.phone) return res.send(resultType(FAIL, "电话号码为空"));
        // 判断是否含有非法字符
        // 判断电话号码格式是否正确
        if (phoneCharacter(body.phone)) return res.send(resultType(FAIL, "电话号码格式错误！"));
        // 3.验证通过，通过查找数据库判断是否重复
        if (await occupySQL('phone', body.phone)) return res.send(resultType(FAIL, "电话号码重复!"));
        // 4.发送成功响应
        res.send(resultType(SUCCESS, "可以使用"));
    } catch (err) {
        next(err);
    }
};

// 抛出控制器
module.exports = {
    hello
}