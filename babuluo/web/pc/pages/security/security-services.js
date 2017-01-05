AndSellPCMainModule.service('securityFactory', function ($resource,http) {

    this.updataMemberInfo = http.post('/member/member/updatePassword');

    this.sendVerificationCode = http.post('/member/member/queryphone');

});
