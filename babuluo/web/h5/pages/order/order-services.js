AndSellH5MainModule.service('orderFactory', function (http) {

    this.addOrder = http.post('/shop/order/filterOrderType');

    this.getOrderById = http.post('/shop/order/getById');

    this.modifyOrderById = http.post('/shop/order/modifyById');

    this.getOrder = http.post('/shop/order/queryAllForAgent');

    this.cancelOrder = http.post('/shop/order/cancelOrder');

    this.payOrder = http.post('/shop/order/payOrder');

    this.deliveryOrder = http.post('/shop/order/deliveryOrder');

    this.acceptOrder = http.post('/shop/order/getOrder');

    this.wxPayUndefinedOrder = http.post('/wx/pay/wxPayUndefinedOrder');

    this.wxPayUndefinedOrderForPC = http.post('/wx/pay/wxPayUndefinedOrderForPC');

    this.queryWXPayResult = http.post('/wx/pay/wxpayCallback');

    this.getOrderStates = http.post('/shop/order/getStateOrdersForAgent')

    this.calculateSale = http.post('/sales/salesplan/calculateSale');

    this.addComments = http.post('/shop/comment/add');

})

AndSellH5MainModule.service('promoFactory', function (http) {

    this.doPromoCalculate = http.post('/promo/promotion/myInterface/doPromoCalculate');

    this.getPromoRole = http.post('/promo/promotion/role/queryAll');

    this.modPromoRole = http.post('/promo/promotion/role/modifyById');

    this.getPromoPlan = http.post('/promo/promotion/plan/queryAll');

    this.getPromoRange = http.post('/promo/promotion/range/myQueryAll');

    this.delPromoRangeDetail = http.post('/promo/promotion/rangeDetail/delByRangeId');

    this.addPromoRangeDetail = http.post('/promo/promotion/rangeDetail/add');

    this.addPromoPlan = http.post('/promo/promotion/plan/add');

    this.modPromoPlan = http.post('/promo/promotion/plan/modifyById');

    this.addPromoRange = http.post('/promo/promotion/range/add');

})
AndSellH5MainModule.service('groupBuyPlanFactory', function (http) {
    this.getByGbpIds = http.post("/group/buy/plan/getByGbpIds");
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
    this.getBySkuIdAndStat = http.post("/group/buy/plan/getBySkuIdAndStat");
});
AndSellH5MainModule.service('groupBuyGroupFactory', function (http) {
    this.getAllGroupByGbpId = http.post("/group/buy/group/getAllByGbpId");
    this.getByGbgIds = http.post("/group/buy/group/getByGbgIds");
    this.add = http.post("/group/buy/group/add");
});
AndSellH5MainModule.service('groupBuyMemberFactory', function (http) {
    this.getAllMemberInGbgIds = http.post("/group/buy/member/getInGbgIds");
    this.getByUserId = http.post("/group/buy/member/getByUserId	");
    this.add = http.post("/group/buy/member/add");
});
AndSellH5MainModule.service('memberFactory', function (http) {
    this.getMemberByUID = http.post('/member/memberData/getById');
});