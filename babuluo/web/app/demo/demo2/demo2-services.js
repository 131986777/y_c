AndSellMainModule.service('demo2Factory', function ($resource, baseURL) {

    /**
     * 这里配置所有demo业务相关的接口
     **/

    this.getAllDemo = function () {
        return $resource(baseURL + '/shop/product/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.addDemo = function (form) {
        return $resource(baseURL + '/shop/product/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getDemoById = function (id) {
        return $resource(baseURL+'/shop/product/getById?shop_product.prd_id=:param_id', {'param_id': id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

});