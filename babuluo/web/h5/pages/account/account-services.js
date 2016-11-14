AndSellH5MainModule.service('balanceFactory', function ($resource) {

    this.queryAll = $post($resource,'/member/balance/getAllBalanceList');

    this.queryAccountByUid = $post($resource,'/member/account/querySimpleBalanceInfo');

    this.updateFinanceList = $post($resource,'/member/balance/add');

});