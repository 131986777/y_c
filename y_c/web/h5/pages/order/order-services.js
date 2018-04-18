AndSellH5MainModule.service('orderFactory', function (http) {

    this.addOrder = http.post('/shop/order/filterOrderType');

    this.getOrderById = http.post('/shop/order/getById');

    this.modifyOrderById = http.post('/shop/order/modifyById');

    this.getOrder = http.post('/shop/order/queryAllForAgent');

    this.cancelOrder = http.post('/shop/order/cancelOrder');
    //取消订单佣金回退
    this.cancelOrder_dist = http.post('../../../dist/bubu/dist/income/cancelorder');

    this.payOrder = http.post('/shop/order/payOrder');

    this.deliveryOrder = http.post('/shop/order/deliveryOrder');

    this.acceptOrder = http.post('/shop/order/getOrder');

    this.wxPayUndefinedOrder = http.post('/wx/pay/wxPayUndefinedOrder');

    this.wxPayUndefinedOrderForPC = http.post('/wx/pay/wxPayUndefinedOrderForPC');

    this.queryWXPayResult = http.post('/wx/pay/wxpayCallback');

    this.getOrderStates = http.post('/shop/order/getStateOrdersForAgent')

    this.calculateSale = http.post('/sales/salesplan/calculateSale');

    this.addComments = http.post('/shop/comment/add');
    
    this.findUserShopOrderWithSku = http.post('/shop/order/findUserShopOrderWithSku');

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

});
