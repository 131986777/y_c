AndSellMainModule.service('orderFactory', function (http) {

    this.addOrder=http.post('/shop/order/filterOrderType');
    this.getById=http.post('/shop/order/getById');
    this.getOrder=http.post('/shop/order/queryAll');
    this.getStateOrders=http.post('/shop/order/getStateOrders');
    this.cancelOrder=http.post('/shop/order/cancelOrder');
    this.outOrder=http.post('/shop/order/outOrder');
    this.sendOrder=http.post('/shop/order/sendOrder');
    this.payOrder=http.post('/shop/order/payOrder');
    this.deliveryOrder=http.post('/shop/order/deliveryOrder');
    this.modifyOrderRemark=http.post('/shop/order/modifyOrderRemark');
    this.modifyOrderLogistics=http.post('/shop/order/modifyOrderLogistics');
    this.scanOrder=http.post('/shop/order/scanOrder');
    this.modifyOrderById = http.post("/shop/order/modifyById");

    this.getWXPayItemByOrderId= http.post('/order/wx/pay/list/getByOrderId');
    this.getFinanceItemByOrderId= http.post('/member/balance/getByOrderId');

    this.getGift = http.post('/gift/gift/queryAll');
    this.getRefundOrder = http.post('/shop/order/refund/queryAll');
    this.refundOrder = http.post('/shop/order/refund/refundOrder');
    this.RemarkRefundOrder = http.post('/shop/order/refund/remarkOrder');

    this.getBySkuId = http.post('/shop/product/getBySkuIdWithAllInfo');

    this.modifyBySortComplete = http.post('/shop/order/modifyBySortComplete');
    this.getOffGift=http.post('/gift/gift/modifyById');

});
