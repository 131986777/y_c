AndSellH5MainModule.service('productFactory', function ($resource,http) {

    this.getProduct = http.post('/shop/product/queryAllForAgent' ,function (filter) {
        if (filter['SHOP_PRODUCT.ORDER'] == undefined) {
            filter['SHOP_PRODUCT.ORDER'] = 'ADD_DATETIME DESC';
        }
    });

    this.getProductByTag = http.post('/shop/product/getByTagIds');

    this.getProductAllInfoById = http.post('/shop/product/getByIdWithAllInfoForAgent');

    this.getProductSkuBySkuIds = http.post('/shop/product/getBySkuIdWithAllInfoForAgent');

});
