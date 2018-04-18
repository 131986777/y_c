AndSellMainModule.service('totalStockFactory', function (http) {

    this.getTotalStockList = http.post('/stock/realtime/queryBySkuId');

});