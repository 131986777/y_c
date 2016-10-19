AndSellMainModule.service('salesFactory', function ($resource, baseURL) {
    this.ModifySalesState= function (form) {
        console.log(form);
        return $resource(baseURL + '/sales/sales/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.AddSales= function (form) {
        console.log(form);
        return $resource(baseURL + '/sales/sales/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});