AndSellH5MainModule.service('userFactory', function (http) {

    this.newUserReg = http.post('/member/member/reg');

    this.login = http.post('/login/login');

    this.isLogin = http.post('/login/isLogin');

    this.loginOut = http.post('/login/logout');

    this.sendVerificationCode = http.post('/member/member/queryphone');

    this.phoneLogin = http.post('/login/phoneLogin');

    this.phoneSms = http.post('/sys/sms/login');

});