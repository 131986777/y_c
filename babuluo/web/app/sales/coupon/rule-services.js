AndSellMainModule.service('couponFactory', function ($resource, baseURL) {

    this.addCouponRule = function (form) {
        console.log('新增数据');
        console.log(form);
        console.log('新增数');
        return $resource(baseURL + '/coupon/rule/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    // this.getStockList = function (id) {
    //     console.log(123+'---'+id);
    //     return $resource(baseURL + '/stock/realtime/queryAll?STOCK_REALTIME.STORE_ID=:ID', {'ID': id}, {
    //         'update': {
    //             method: 'PUT'
    //         }
    //     });
    // };

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