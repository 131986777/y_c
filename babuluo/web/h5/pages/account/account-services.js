AndSellH5MainModule.service('balanceFactory', function (http) {

    this.queryByUid = http.post('/member/balance/getBalanceByUid');

    this.queryAccountByUid = http.post('/member/account/queryAccountByUid');

});