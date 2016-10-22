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

    this.modifyCouponRule = function (form) {
        return $resource(baseURL + '/coupon/rule/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };//stopSouponById
    this.stopCouponRuleById = function (form) {
        console.log(123);
        console.log(form);
        return $resource(baseURL + '/coupon/rule/modifyIsStop', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delCouponRule = function (form) {
        return $resource(baseURL + '/coupon/rule/modifyIsDel', form, {
            'update': {
                method: 'PUT'
            }
        });

    };
    this.addCouponInfo = function (form) {
        //console.log('新增数据');
        console.log(form);
        //console.log('新增数据');
        return $resource(baseURL + '/coupon/coupon/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.modifyCoupon = function (form) {
        return $resource(baseURL + '/coupon/coupon/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });

    };
    this.deleteCoupon = function (form) {
        return $resource(baseURL + '/coupon/coupon/modIsDel', form, {
            'update': {
                method: 'PUT'
            }
        });

    };

});