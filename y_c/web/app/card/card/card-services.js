AndSellMainModule.service('cardFactory', function (http) {

    this.getMemberCardList = http.post('/member/membercard/queryAll');

    this.addMemberCard = http.post('/member/membercard/add');

    this.getCardSourceList = http.post('/member/cardSource/queryAll');

    this.addCardSource = http.post('/member/cardSource/add');

    this.delCardSource = http.post('/member/cardSource/delById');

    this.modifyCardSourceById = http.post('/member/cardSource/modifyById');

    this.getCardListBySource = http.post('/member/cardType/getBySource');

    this.addCardType = http.post('/member/cardType/add');

    this.delCardType = http.post('/member/cardType/delById');

    this.modifyCardTypeById = http.post('/member/cardType/modifyById');

    this.getUIDByLOGINID = http.post('/member/member/getUIDByLOGINID');

    this.getUIDByMobile = http.post('/member/member/getUIDByMobile');

    this.getMemberInfoByUserId = http.post('/member/memberData/getMemberInfoByUserId');

    this.frezzeCard = http.post('/member/membercard/frezzeCard');

    this.FrozenCard = http.post('/member/membercard/FrozenCard');
    
    this.modifyState = http.post('/member/membercard/modifyCardState');
    //卡号解绑
    this.unwrap = http.post('/member/membercard/unwrap');
    //线上销卡
    this.pinCard=http.post('/member/membercard/pinCard');
    //检查返点的卡是否一致
    this.checkRebatesCard=http.post('/member/balance/checkRebatesCard');
    //销卡之后状态该成完成
    this.modfiyRebatesCard=http.post('/member/balance/modifyById');
});

