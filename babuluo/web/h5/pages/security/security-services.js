AndSellH5MainModule.service('securityFactory', function ($resource, baseURL) {

    this.updataMemberInfo = function (form) {
        return $resource(baseURL + '/member/member/updatePassword',form, {
            'update': {
                method: 'PUT'
            }
        });
    }
    this.sendVerificationCode = function (form) {
        return $resource(baseURL + '/member/member/queryphone', form, {
            'update': {
                method: 'PUT'
            }
        });
    }
});
