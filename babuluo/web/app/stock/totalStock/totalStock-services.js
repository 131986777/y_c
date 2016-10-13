AndSellMainModule.service('totalStockFactory', function ($resource, baseURL) {

    this.getStockList = function () {
        return $resource(baseURL + '/stock/realtime/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    // this.getShopListByDistrictId = function (form) {
    //     return $resource(baseURL + '/shop/shop/getByDistrictId', form, {
    //         'update': {
    //             method: 'PUT'
    //         }
    //     });
    // };
    //
    // this.modShopListById = function (form) {
    //     return $resource(baseURL + '/shop/shop/modifyById', form, {
    //         'update': {
    //             method: 'PUT'
    //         }
    //     });
    // };
    //
    // this.addShopList = function (form) {
    //     return $resource(baseURL + '/shop/shop/add', form, {
    //         'update': {
    //             method: 'PUT'
    //         }
    //     });
    // };
    // this.delById = function (form) {
    //     return $resource(baseURL + '/shop/shop/closeShop', form, {
    //         'update': {
    //             method: 'PUT'
    //         }
    //     });
    // };
    /*this.addProduct = function (id) {
     return $resource(baseURL
     + '-service/shop/product/comment/getById?shop_product_comment.COMMENT_ID=:COMMENT_ID', {'COMMENT_ID': id}, {
     'update': {
     method: 'PUT'
     }
     });
     };*/

});