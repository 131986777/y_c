AndSellH5MainModule.service('personalFactory', function ($resource) {

    this.getMemberCardByUserId = $post($resource,'/member/membercard/getByUserId');

    this.getCouponListByUser = $post($resource,'/member/coupon/getCouponByUserId');

    this.getPhone = $post($resource,'/member/member/getById');
});