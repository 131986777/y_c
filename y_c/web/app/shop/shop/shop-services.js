AndSellMainModule.service('shopFactory', function (http) {

    this.getShopList=http.post('/shop/shop/queryAll');
    this.modShopListById=http.post('/shop/shop/modifyById');
    this.addShopList=http.post('/shop/shop/add');
    this.delById=http.post('/shop/shop/closeShop');

});