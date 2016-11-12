AndSellH5MainModule.service('balanceFactory', function ($resource, baseURL) {
    this.queryAll = function (){
        return $resource(baseURL + '/member/balance/getAllBalanceList',null, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.queryAccountByUid = function (form){
        return $resource(baseURL + '/member/account/querySimpleBalanceInfo',form, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.updateFinanceList = function (form){
        return $resource(baseURL + '/member/balance/add',form, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.updateBalanceList = function (){
        return $resource(baseURL + '/member/balance/getAllBalanceList',null, {
            'update': {
                method: 'PUT'
            }
        });
    }
});