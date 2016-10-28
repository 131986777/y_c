AndSellH5MainModule.service('shopFactory', function ($resource, baseURL) {

    this.getShopList = function () {
        return $resource(baseURL + '/shop/shop/queryAll', {}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getShopListByStrict = function (form) {
        return $resource(baseURL + '/shop/shop/getShopByDistrict', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getShopById = function (id) {
        return $resource(baseURL + '/shop/shop/getById?SHOP.SHOP_ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

});