AndSellH5MainModule.service('seckillFactory', function (http) {
    this.queryByStateAndTime=http.post('/promo/seckill/myInterface/indexQuerySeckill');

    this.goSeckill=http.post('/promo/seckill/myInterface/goSeckill');

    this.backspaceSeckill=http.post('/promo/seckill/myInterface/backspaceOrder');
});

AndSellH5MainModule.service('groupBuyPlanFactory', function (http) {
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
    this.getByGbpIds = http.post("/group/buy/plan/getByGbpIds");
});