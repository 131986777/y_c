AndSellH5MainModule.service('couponFactory', function ($resource) {

    this.isLogin = $post($resource,'/login/isLogin');

    this.getCouponList = $post($resource,'/coupon/coupon/queryAllData');

    this.addMemberCoupon = $post($resource,'/member/coupon/add');

    this.modCouponLeft = $post($resource,'/coupon/coupon/modLeftNum');

});