AndSellH5MainModule.service('userFactory', function ($resource) {

    this.newUserReg = $post($resource,'/member/member/reg');

    this.login = $post($resource,'/login/login');

    this.isLogin = $post($resource,'/login/isLogin');

    this.loginOut = $post($resource,'/login/logout');

    this.sendVerificationCode = $post($resource,'/sys/sms/reg');

});