AndSellH5MainModule.service('balanceFactory', function ($resource) {

    this.queryByUid = $post($resource,'/member/balance/getBalanceByUid');

    this.queryAccountByUid = $post($resource,'/member/account/queryAccountByUid');

    this.updateFinanceList = $post($resource,'/member/balance/add');

});