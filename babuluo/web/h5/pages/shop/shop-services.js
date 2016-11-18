AndSellH5MainModule.service('shopFactory', function (http) {

    this.getShopList = http.post('/shop/shop/queryAllByAgent');

    this.getShopById = http.post('/shop/shop/getById');

    this.getBannerList = http.post('/banner/banner/getAllData');

});