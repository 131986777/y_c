AndSellH5MainModule.service('personalFactory', function (http) {

    this.getMemberCardByUserId = http.post('/member/membercard/getByUserId');

    this.getCouponListByUser = http.post('/member/coupon/getCouponByUserId');

    this.getPhone = http.post('/member/member/getById');
    this.getCoupon = http.post('/member/coupon/querySumByUser');
});