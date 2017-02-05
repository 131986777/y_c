AndSellPCMainModule.service('productFactory', function ($resource, http) {

    this.getProduct = http.post('/shop/product/queryAllForAgent', function (filter) {
        if (filter['SHOP_PRODUCT.ORDER'] == undefined) {
            //filter['SHOP_PRODUCT.ORDER'] = 'ADD_DATETIME DESC';
            filter['SHOP_PRODUCT.ORDER'] = 'HAS_STOCK DESC,SHOP_PRODUCT.CLASS_ID ASC,convert(SHOP_PRODUCT.PRD_NAME using gbk) asc ';
        }
    });

    this.getProductByTag = http.post('/shop/product/getByTagIds');

    this.getCommemtByProIdProSku = http.post('/shop/comment/getById');

    this.querySalesRankingByShopId = http.post('/shop/order/querySalesRankingByShopId');

    this.getProductAllInfoById = http.post('/shop/product/getByIdWithAllInfoForAgent');

    this.getProductSkuBySkuIds = http.post('/shop/product/getBySkuIdWithAllInfoForAgent');

    this.getCommemtByProIdProSku = http.post('/shop/comment/getById');

    this.addAndMod = http.post('/user/collection/addAndMod');

    this.getPresentsBySkuIds = http.post('/shop/product/getBySkuIdWithAllInfo');
});
