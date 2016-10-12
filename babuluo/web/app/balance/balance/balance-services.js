AndSellMainModule.service('balanceFactory', function ($resource, baseURL) {

    this.modMemberAccount = function (form) {
        return $resource(baseURL + '/member/account/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.addFinanceList= function (form) {
        return $resource(baseURL + '/member/balance/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});