AndSellH5MainModule.service('couponFactory', function ($resource, baseURL) {

    this.getCouponList= function (form) {
        return $resource(baseURL + '/coupon/coupon/queryAllData', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.addMemberCoupon = function (form) {
        return $resource(baseURL + '/member/coupon/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.modCouponLeft= function (form) {
        console.log("数量2为"+form['COUPON.NUM_LEFT']);
        return $resource(baseURL + '/coupon/coupon/modLeftNum', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});