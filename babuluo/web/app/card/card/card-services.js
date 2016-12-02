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

});


    //this. = function (sourceID) {
    //    return $resource(baseURL + '/member/cardType/getBySource?MEMBER_CARD_TYPE.CARD_SOURCE_ID=:ID', {'ID': sourceID}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //};
