AndSellMainModule.service('salesFactory', function ($resource, baseURL) {

    this.ModifySalesState= function (form) {
        return $resource(baseURL + '/sales/sales/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.AddSales= function (form) {
        return $resource(baseURL + '/sales/sales/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.querySalesById= function (form) {
        return $resource(baseURL + '/sales/sales/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});
