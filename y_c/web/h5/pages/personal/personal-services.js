AndSellH5MainModule.service('personalFactory', function (http) {

    this.getMemberCardByUserId = http.post('/member/membercard/getByUserId');

    this.getCouponListByUser = http.post('/member/coupon/getCouponByUserId');

    this.getAllStateCouponListByUser = http.post('/member/coupon/queryAllStateSumByUser');

    this.getPhone = http.post('/member/member/getById');

    this.getCoupon = http.post('/member/coupon/querySumByUser');

    this.modifyMember = http.post('/member/member/modifyMemberInMobile');

    this.addAdvice = http.post('/guestbook/guestbook/add');

    this.getMyAdvice = http.post('/guestbook/guestbook/getGuestbookByUserId');
    
    this.getGift = http.post('/gift/gift/queryAll');
});