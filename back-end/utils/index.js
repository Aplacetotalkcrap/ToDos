/**
 * 验证电话号码格式是否正确
 * @param str
 * @returns {boolean}
 */
const phoneCharacter = (str) => {
    return !phoneRegExp.test(str)
}