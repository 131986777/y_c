AndSellH5MainModule.service('balanceFactory', function (http) {

    this.queryByUid = http.post('/member/balance/getBalanceByUid');

    this.queryAccountByUid = http.post('/member/account/queryAccountByUid');

});


AndSellH5MainModule.service('eventFactory', function (http) {

    this.getEventByType = http.post('/sales/event/getByType');

    this.queryLucky = http.post('/marketing/luckyDraw/ifLuckMan');

    this.queryPosition = http.post('/marketing/luckyDraw/queryAll');

    this.getCouponInfo = http.post('/coupon/coupon/getById');

});
