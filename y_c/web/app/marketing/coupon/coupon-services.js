AndSellMainModule.service('couponFactory', function (http) {

    this.getCouponList=http.post('/coupon/coupon/queryAll');

    this.addCouponRule=http.post('/coupon/rule/add');

    this.modifyCouponRule=http.post('/coupon/rule/modifyById');

    this.stopCouponRuleById=http.post('/coupon/rule/modifyIsStop');

    this.delCouponRule=http.post('/coupon/rule/modifyIsDel');

    this.addCouponInfo=http.post('/coupon/coupon/add');

    this.modifyCoupon=http.post('/coupon/coupon/modifyById');

    this.deleteCoupon=http.post('/coupon/coupon/modIsDel');

    this.stopCouponById=http.post('/coupon/coupon/modifyIsStop');

});