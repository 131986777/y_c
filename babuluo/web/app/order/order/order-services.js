AndSellMainModule.service('orderFactory', function (http) {

    this.addOrder=http.post('/shop/order/addOrderWithDetail');
    this.getById=http.post('/shop/order/getById');
    this.getOrder=http.post('/shop/order/queryAll');
    this.getStateOrders=http.post('/shop/order/getStateOrders');
    this.cancelOrder=http.post('/shop/order/cancelOrder');
    this.outOrder=http.post('/shop/order/outOrder');
    this.sendOrder=http.post('/shop/order/sendOrder');
    this.payOrder=http.post('/shop/order/payOrder');
    this.deliveryOrder=http.post('/shop/order/deliveryOrder');
    this.modifyOrderRemark=http.post('/shop/order/modifyOrderRemark');
    this.scanOrder=http.post('/shop/order/scanOrder');

    this.getWXPayItemByOrderId= http.post('/order/wx/pay/list/getByOrderId');
    this.getFinanceItemByOrderId= http.post('/member/balance/getByOrderId');

});