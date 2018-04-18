AndSellMainModule.service('balanceFactory', function (http) {

    this.addFinanceList = http.post('/member/balance/add');

    this.getAllFinanceList = http.post('/member/balance/getAllBalanceList');

    this.getAllUsefulActivity = http.post('/sales/activity/getAllUsefulRechargeActivityForOwn');
    //检查需要退的卡号
    this.checkRebatesCard=http.post('/member/balance/checkRebatesCard');
    //退无忧卡返黄卡里面的钱
    this.backYellowCard=http.post('/member/balance/backYellowCard');
});