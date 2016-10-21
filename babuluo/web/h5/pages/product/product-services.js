AndSellH5MainModule.service('productFactory', function ($resource, baseURL) {

    this.getProduct = function () {
        return $resource(baseURL + '/shop/product/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getProductById = function (id) {
        return $resource(baseURL + '/shop/product/getByIdWithSku?SHOP_PRODUCT.PRD_ID=:PRD_ID', {'PRD_ID': id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getProductAllInfoById = function (id) {
        return $resource(baseURL + '/shop/product/getByIdWithAllInfo?SHOP_PRODUCT.PRD_ID=:PRD_ID', {'PRD_ID': id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getAllProductSku = function () {
        return $resource(baseURL + '/shop/product/sku/queryAllWithPrdInfo', {}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getProductSkuBySkuIds = function (form) {
        return $resource(baseURL + '/shop/product/getBySkuIdWithAllInfo', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getSpuCode = function () {
        return $resource(baseURL + '/shop/product/getSpuCode', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addProduct = function (form) {
        return $resource(baseURL + '/shop/product/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyProduct = function (form) {
        return $resource(baseURL + '/shop/product/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.setProductState = function (form) {
        return $resource(baseURL + '/shop/product/setPrdState', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.setSkuState = function (form) {
        return $resource(baseURL + '/shop/product/sku/setSkuState', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delProduct = function (form) {
        return $resource(baseURL + '/shop/product/falseDelete', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.delSku = function (form) {
        return $resource(baseURL + '/shop/product/sku/falseDelete', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifySkuListPrice = function (form) {
        return $resource(baseURL + '/shop/product/sku/modifySkuListPrice', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    /*this.addProduct = function (id) {
     return $resource(baseURL
     + '-service/shop/product/comment/getById?shop_product_comment.COMMENT_ID=:COMMENT_ID', {'COMMENT_ID': id}, {
     'update': {
     method: 'PUT'
     }
     });
     };*/

});