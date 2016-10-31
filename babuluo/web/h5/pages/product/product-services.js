AndSellH5MainModule.service('productFactory', function ($resource, baseURL) {

    this.getProduct = function (filter) {
        return $resource(baseURL + '/shop/product/queryAllForAgent', filter, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getProductAllInfoById = function (form) {
        return $resource(baseURL + '/shop/product/getByIdWithAllInfoForAgent', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getProductSkuBySkuIds = function (form) {
        return $resource(baseURL + '/shop/product/getBySkuIdWithAllInfoForAgent', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.queryByStoreAndSkus = function (form) {
        return $resource(baseURL + '/stock/realtime/queryByStoreAndSku', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});