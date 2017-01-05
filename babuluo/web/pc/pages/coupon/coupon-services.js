AndSellPCMainModule.service('couponFactory', function (http) {

    this.getCouponList = http.post('/coupon/coupon/queryAllData');

    this.addMemberCoupon = http.post('/member/coupon/add');

    this.modCouponLeft = http.post('/coupon/coupon/modLeftNum');

    this.deleteCoupon = http.post('/member/coupon/delById');

    this.useCoupon = http.post('/member/coupon/useCoupon');

});