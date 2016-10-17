AndSellMainModule.service('salesFactory', function ($resource, baseURL) {
    this.ModifySalesState= function (form) {
        console.log(form);
        return $resource(baseURL + '/sales/sales/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});
