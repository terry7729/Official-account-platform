/**
 * 验证类
 */
export default {
    //正整数
    int: (num) => {
        let reg = /^[1-9]\d*$/
        return reg.test(num)
    },

    //浮点数(包括正整数)
    float: (num) => {
        let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/g
        return reg.test(num)
    },

    //手机号
    phone: (num) => {
        let reg = /^1[3456789]\d{9}$/
        return reg.test(num)
    },

    //密码
    pwd: (pwd) => {
        let reg = /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:|]{8,16}$/  //字母、数字或者英文符号，8-16位，区分大小写
        return reg.test(pwd)
    },
}
