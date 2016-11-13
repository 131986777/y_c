AndSellH5MainModule.service('securityFactory', function ($resource) {

    this.updataMemberInfo = $post($resource,'/member/member/updatePassword');

    this.sendVerificationCode = $post($resource,'/member/member/queryphone');

});
