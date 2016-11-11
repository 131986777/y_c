AndSellH5MainModule.service('balanceFactory', function ($resource, baseURL) {
    this.queryAll = function (){
        return $resource(baseURL + '/member/balance/getAllBalanceList',null, {
            'update': {
                method: 'PUT'
            }
        });
    }
});