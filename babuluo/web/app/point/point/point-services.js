AndSellMainModule.service('pointFactory', function ($resource, baseURL) {
    this.modMemberAccount = function (form) {
        console.log(form);
        return $resource(baseURL + '/member/account/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addFinanceList= function (form) {
        return $resource(baseURL + '/member/point/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});
