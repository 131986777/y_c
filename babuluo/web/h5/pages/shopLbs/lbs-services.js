AndSellH5MainModule.service('lbsFactory', function (http) {

    this.getShopList = http.post('/shop/shop/queryAllByAgent');

});