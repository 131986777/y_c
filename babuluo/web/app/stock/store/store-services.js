AndSellMainModule.service('storeFactory', function ($resource, baseURL) {

    this.addStore = function (form) {
        return $resource(baseURL + '/store/store/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delStoreById = function (form) {
        return $resource(baseURL + '/store/store/delById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyStore = function (form) {
        return $resource(baseURL + '/store/store/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getStoreList = function () {
        return $resource(baseURL + '/store/store/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

  /*  this.getShopListByDistrictId = function (form) {
        return $resource(baseURL + '/shop/shop/getByDistrictId', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modShopListById = function (form) {
        return $resource(baseURL + '/shop/shop/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addShopList = function (form) {
        return $resource(baseURL + '/shop/shop/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delById = function (form) {
        return $resource(baseURL + '/shop/shop/closeShop', form, {
            'update': {
                method: 'PUT'
            }
        });
    };*/
    /*this.addProduct = function (id) {
     return $resource(baseURL
     + '-service/shop/product/comment/getById?shop_product_comment.COMMENT_ID=:COMMENT_ID', {'COMMENT_ID': id}, {
     'update': {
     method: 'PUT'
     }
     });
     };*/

});