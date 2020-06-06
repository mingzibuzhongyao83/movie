class Valid {
  constructor() {
    //手机号验证
    this.phone = {
      reg: /^1[3456789]\d{9}$/,
      msg: '请填写正确手机号'
    }

    //用户名验证
    this.nickName = {
      // reg: /^(?=.*[a-zA-Z])[0-9a-zA-Z\u4e00-\u9fa5]{1,8}$/,
      reg: /^[0-9a-zA-Z\u4e00-\u9fa5]{1,8}$/,
      msg: '用户名由数字字母汉字组合'
    }

    //密码验证
    this.password = {
      reg: /^[a-zA-Z][^\u4e00-\u9fa5]{5,15}$/,
      msg: '密码首个字符是字母，不能含汉字，6-16位字符'
    }
    this.oldPassword = {
      reg: /^[a-zA-Z][^\u4e00-\u9fa5]{5,15}$/,
      msg: '密码首个字符是字母，不能含汉字，6-16位字符'
    }
    //邮箱正则表达式
    this.email = {
      reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      msg: '邮箱格式不正确'
    }
  }

  validForm(o, t) {
    for (let key in o) {

      if (!this[key].reg.test(o[key])) {
        t.$toast(this[key].msg)

        //表单验证不通过
        return false;
      }
    }

    //表单验证通过
    return true;
  }
}


export const valid = new Valid();
