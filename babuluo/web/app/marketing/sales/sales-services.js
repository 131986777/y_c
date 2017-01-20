AndSellMainModule.service('salesFactory', function (http) {

    this.MosdifyAdaptor=http.post('/promo/role/andSell/modifyById');

    this.ModifySalesState=http.post('/sales/sales/modifyById');

    this.AddPromoRoleAdaptor=http.post('/promo/role/andSell/add') ;

    this.QueryPromoRoleAdaptor=http.post('/promo/role/andSell/queryAll') ;

    this.AddSkuInfo=http.post("/sales/sales/queryAll");

    this.AddSalesPlan=http.post('/sales/salesplan/add');

    this.ModifySalesProduct=http.post('/sales/salesplan/modifyById');

    this.delSalePlanById=http.post('/sales/salesplan/modifyById');

    this.stopSalePlanById=http.post('/sales/salesplan/modifyById');

});


AndSellMainModule.service('promoFactory', function (http) {

    this.doPromoCalculate=http.post('/promo/doPromoCalculate');

    this.getPromoRole=http.post('/promo/role/queryAll');

    this.modPromoRole=http.post('/promo/role/modifyById');

    this.getPromoPlan=http.post('/promo/plan/queryAll');

    this.getPromoRange=http.post('/promo/range/myQueryAll');

    this.delPromoRangeDetail=http.post('/promo/rangeDetail/delByRangeId');

    this.addPromoRangeDetail=http.post('/promo/rangeDetail/add');

    this.addPromoPlan=http.post('/promo/plan/add');

    this.modPromoPlan=http.post('/promo/plan/modifyById');

    this.addPromoRange=http.post('/promo/range/add');

})

AndSellMainModule.service('eventFactory', function (http) {

    this.addEvent=http.post('/sales/event/add');

    this.modEvent=http.post('/sales/event/modifyById');

    this.delEvent=http.post('/sales/event/delById');

    this.getEvent=http.post('/sales/event/queryAll');

});
