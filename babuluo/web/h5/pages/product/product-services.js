AndSellH5MainModule.service('productFactory', function ($resource, baseURL) {

    this.getProduct = function (filter) {
        return $resource(baseURL + '/shop/product/queryAllForAgent', filter, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getProductAllInfoById = function (id) {
        return $resource(baseURL + '/shop/product/getByIdWithAllInfoForAgent?SHOP_PRODUCT.PRD_ID=:PRD_ID', {'PRD_ID': id}, {
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




});