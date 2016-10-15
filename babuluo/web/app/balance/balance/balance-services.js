AndSellMainModule.service('balanceFactory', function ($resource, baseURL) {
    this.addFinanceList= function (form) {
        return $resource(baseURL + '/member/balance/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});