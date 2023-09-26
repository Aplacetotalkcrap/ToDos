export function delCookie(name){
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//从cookie中获取指定名称的值
export function getCookie(name) {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=')
        if (cookieName === name) {
            return decodeURIComponent(cookieValue)
        }
    }
    return null //如果找不到就返回null
}