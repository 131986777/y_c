AndSellH5MainModule.service('personalFactory', function ($resource, baseURL) {

    this.getMemberCardByUserId = function (form) {
        return $resource(baseURL + '/member/membercard/getByUserId', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getCouponListByUser= function (form) {
        return $resource(baseURL + '/member/coupon/getCouponByUserId', form, {
            'update': {
                method: 'PUT'
            }
        });
    };


});