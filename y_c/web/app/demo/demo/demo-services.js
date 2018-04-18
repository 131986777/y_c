AndSellMainModule.service('demoFactory', function ($resource, baseURL) {

    /**
     * 这里配置所有demo业务相关的接口
     **/
    this.getDemo = function () {
        return $resource(baseURL + '/shop/product/tag/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addDemo = function (form) {
        return $resource(baseURL + '/shop/product/tag/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.delDemo = function (id) {
        return $resource(baseURL
            + '/shop/product/tag/delById?shop_tag.tag_id=:tag_id', {'tag_id': id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

});