AndSellMainModule.service('stockFactory', function ($resource, baseURL) {




    this.modStockOnLine= function (form) {
        return $resource(baseURL + '/stock/realtime/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };



});