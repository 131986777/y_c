AndSellMainModule.service('couponFactory', function ($resource, baseURL) {

    this.addCouponRule = function (form) {
        console.log('新增数据');
        console.log(form);
        console.log('新增数据');
        return $resource(baseURL + '/coupon/rule/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyCoupon = function (form) {
        return $resource(baseURL + '/coupon/rule/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };


});