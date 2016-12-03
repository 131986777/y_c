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
    this.getMemberAccountByLoginId = http.post('/member/member/getAccountByLoginID');

    //this. = function (userId) {
    //    console.log(userId);
    //    return $resource(baseURL + '/member/address/getByUserId?member_address.USER_ID=:ID', {'ID': userId}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //};

    //this. = function (userId) {
    //    console.log(userId);
    //    return $resource(baseURL + '/member/memberData/getById?member_info.USER_ID=:ID', {'ID': userId}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //};


    this.modMemberDataById=http.post('/member/memberData/modifyById');
    this.getMembercardInfo=http.post('/member/membercard/getByUserId');
    this.getMembercardType=http.post('/member/cardType/getById');
    this.getMembercardSource=http.post('/member/cardSource/getById');

    //
    //this. = function (userId) {
    //    console.log(userId);
    //    return $resource(baseURL + '/member/membercard/getByUserId?MEMBER_CARD.USER_ID=:ID', {'ID': userId}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //};
    //this.= function (typeId) {
    //    console.log('typeId'+typeId);
    //    return $resource(baseURL + '/member/cardType/getById?MEMBER_CARD_TYPE.ID=:ID', {'ID': typeId}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //};
    //this.= function (sourceId) {
    //    console.log(sourceId);
    //    return $resource(baseURL + '/member/cardSource/getById?MEMBER_CARD_SOURCE.ID=:ID', {'ID':sourceId}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //};
    this.addMemberCoupon=http.post( '/member/coupon/add');
    this.modCouponLeft=http.post('/coupon/coupon/modLeftNum');

});