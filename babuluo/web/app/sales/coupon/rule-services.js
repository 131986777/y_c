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
    };//stopSouponById
    this.stopSouponById = function (form) {
        return $resource(baseURL + '/coupon/rule/modifyIsDel', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delSouponById = function (form) {
        return $resource(baseURL + '/coupon/rule/delById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});