AndSellMainModule.service('memberFactory', function (http) {

    this.getMemberList=http.post('/member/member/queryAll');
    this.getMemberListById=http.post('/member/member/getById');
    this.modMemberListById=http.post('/member/member/modifyById');
    this.resetPwd=http.post('/member/member/resetPWD');
    this.addMemberList=http.post('/member/member/add');
    this.loadMemberAccount=http.post('/member/account/getById');
    this.modMemberAccount=http.post('/member/account/modifyById');
    this.delById=http.post('/member/member/delById');
    this.getMemberAddress=http.post('/member/address/getByUserId');
    this.getMemberData=http.post('/member/memberData/getById');
    this.getUIDByLOGINID = http.post('/member/member/getUIDByLOGINID')
    this.getCardByLoginId = http.post('/member/membercard/getCardByLoginId');
    this.getMemberAccountByLoginId = http.post('/member/member/getAccountByLoginID');

    this.modMemberDataById=http.post('/member/memberData/modifyById');
    this.getMembercardInfo=http.post('/member/membercard/getByUserId');
    this.getMembercardType=http.post('/member/cardType/getById');
    this.getMembercardSource=http.post('/member/cardSource/getById');

    this.addMemberCoupon=http.post( '/member/coupon/add');
    this.modCouponLeft=http.post('/coupon/coupon/modLeftNum');

});