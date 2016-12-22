AndSellMainModule.service('balanceFactory', function (http) {

    this.addFinanceList = http.post('/member/balance/add');
    this.getAllFinanceList = http.post('/member/balance/getAllBalanceList');

    this.getAllUsefulActivity = http.post('/sales/activity/getAllUsefulRechargeActicity');

});