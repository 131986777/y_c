AndSellMainModule.service('pointFactory', function ($resource, baseURL) {
    this.addFinanceList= function (form) {
        return $resource(baseURL + '/member/point/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});
