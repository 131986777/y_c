AndSellPCMainModule.service('balanceFactory', function (http) {

    this.queryByUid = http.post('/member/balance/getBalanceByUid');

    this.queryAccountByUid = http.post('/member/account/queryAccountByUid');

});


AndSellPCMainModule.service('eventFactory', function (http) {

    this.getEventByType=http.post('/sales/event/getByType');

});
