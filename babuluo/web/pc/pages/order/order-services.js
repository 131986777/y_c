AndSellPCMainModule.service('orderFactory', function (http) {

    this.addOrder = http.post('/shop/order/filterOrderType');

    this.getOrderById = http.post('/shop/order/getById');

    this.getOrder = http.post('/shop/order/queryAllForAgent');

    this.cancelOrder = http.post('/shop/order/cancelOrder');

    this.payOrder = http.post('/shop/order/payOrder');

    this.deliveryOrder = http.post('/shop/order/deliveryOrder');

    this.acceptOrder = http.post('/shop/order/getOrder');

    this.wxPayUndefinedOrder = http.post('/wx/pay/wxPayUndefinedOrder');

    this.wxPayUndefinedOrderForPC = http.post('/wx/pay/wxPayUndefinedOrderForPC');

    this.aliPayUndefinedOrderForPC = http.post('/ali/pay/aliPayUndefined');

    this.queryWXPayResult = http.post('/wx/pay/wxpayCallback');

    this.queryWXPayOrder = http.post('/wx/pay/wxPayQueryOrder');

    this.getOrderStates = http.post('/shop/order/getStateOrdersForAgent')

    this.calculateSale = http.post('/sales/salesplan/calculateSale');

    this.addComments = http.post('/shop/comment/add');

})


AndSellPCMainModule.service('promoFactory', function (http) {

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

