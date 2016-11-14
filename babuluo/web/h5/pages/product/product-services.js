AndSellH5MainModule.service('productFactory', function ($resource) {

    this.getProduct = $post($resource,'/shop/product/queryAllForAgent' ,function (filter) {
        console.log(filter['SHOP_PRODUCT.ORDER']);
        if (filter['SHOP_PRODUCT.ORDER'] == undefined) {
            filter['SHOP_PRODUCT.ORDER'] = 'ADD_DATETIME DESC';
        }
    });

    this.getProductByTag = $post($resource,'/shop/product/getByTagIds');

    this.getProductAllInfoById = $post($resource,'/shop/product/getByIdWithAllInfoForAgent');

    this.getProductSkuBySkuIds = $post($resource,'/shop/product/getBySkuIdWithAllInfoForAgent');

});
