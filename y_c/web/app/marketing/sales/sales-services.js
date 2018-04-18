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

    this.doPromoCalculate=http.post('/promo/promotion/myInterface/doPromoCalculate');

    this.getPromoRole=http.post('/promo/promotion/role/queryAll');

    this.modPromoRole=http.post('/promo/promotion/role/modifyById');

    this.getPromoPlan=http.post('/promo/promotion/plan/queryAll');

    this.getPromoRange=http.post('/promo/promotion/range/myQueryAll');

    this.delPromoRangeDetail=http.post('/promo/promotion/rangeDetail/delByRangeId');

    this.addPromoRangeDetail=http.post('/promo/promotion/rangeDetail/add');

    this.addPromoPlan=http.post('/promo/promotion/plan/add');

    this.modPromoPlan=http.post('/promo/promotion/plan/modifyById');

    this.addPromoRange=http.post('/promo/promotion/range/add');

})

AndSellMainModule.service('eventFactory', function (http) {

    this.addEvent=http.post('/sales/event/add');

    this.modEvent=http.post('/sales/event/modifyById');

    this.delEvent=http.post('/sales/event/delById');

    this.getEvent=http.post('/sales/event/queryAll');

});

AndSellMainModule.service('activityFactory', function (http) {

    this.addTopUp=http.post('/sales/activity/add');

    this.modTopUp=http.post('/sales/activity/modifyById');

    this.delTopUp=http.post('/sales/activity/delById');

    this.getTopUps=http.post('/sales/activity/queryAll');

});
