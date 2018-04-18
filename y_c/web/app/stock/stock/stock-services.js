AndSellMainModule.service('stockFactory', function (http) {

    this.modStockOnLine= http.post('/stock/realtime/modifyByOnLine');

});