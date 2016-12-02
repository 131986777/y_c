AndSellMainModule.service('balanceFactory', function (http) {

    this.addFinanceList = http.post('/member/balance/add');

});