AndSellMainModule.service('pointFactory', function (http) {

    this.addPointList= http.post('/member/point/add');
    this.getAllPointList= http.post('/member/point/queryAll');
    
    //积分优惠券
    this.getPointCouponList = http.post('/point/coupon/queryAll');
    this.addCoupon = http.post('/point/coupon/add');
    this.modifyById = http.post('/point/coupon/modifyById');
    this.delCouponById = http.post('/point/coupon/delById');
    
    //兑换记录
    this.getOfflineCoupon = http.post('/offline/coupon/modifyById');
});
