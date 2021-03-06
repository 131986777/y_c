AndSellH5MainModule.service('productFactory', function ($resource, http) {

    this.getProduct = http.post('/shop/product/queryAllForAgent', function (filter) {
        if (filter['SHOP_PRODUCT.ORDER'] == undefined) {
            //filter['SHOP_PRODUCT.ORDER'] = 'ADD_DATETIME DESC';
            filter['SHOP_PRODUCT.ORDER'] = 'HAS_STOCK DESC,SHOP_PRODUCT.CLASS_ID ASC,convert(SHOP_PRODUCT.PRD_NAME using gbk) asc ';
        }
    });

    this.getProductByTag = http.post('/shop/product/getByTagIds');

    this.getProductAllInfoById = http.post('/shop/product/getByIdWithAllInfoForAgent');

    this.getProductSkuBySkuIds = http.post('/shop/product/getBySkuIdWithAllInfoForAgent');

    this.getCommemtByProIdProSku = http.post('/shop/comment/getById');

    this.getPresentsBySkuIds = http.post('/shop/product/getBySkuIdWithAllInfo');

    this.addAndMod = http.post('/user/collection/addAndMod');

    this.getRecentSearch = http.post('/search/history/getRecent');

    this.getHotSearch = http.post('/search/history/getHotHistory');

    this.isInCollection = http.post('/user/collection/queryByUserIdAndPrdSku');

    this.clearSearchHistory = http.post('/search/history/clearHistoryByUserID');

});

AndSellH5MainModule.service('appointmentFactory', function (http) {
    this.queryAll = http.post('/shop/product/appointment/queryAll');
})
