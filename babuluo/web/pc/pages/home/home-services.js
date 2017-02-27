AndSellPCMainModule.service('seckillFactory', function (http) {
    this.queryByStateAndTime=http.post('/promo/seckill/myInterface/indexQuerySeckill');

    this.goSeckill=http.post('/promo/seckill/myInterface/goSeckill');

    this.backspaceSeckill=http.post('/promo/seckill/myInterface/backspaceOrder');

})