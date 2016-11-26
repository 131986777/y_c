AndSellH5MainModule.service('orderFactory', function (http) {

    this.addOrder = http.post('/shop/order/addOrderWithDetail');

    this.getOrderById = http.post('/shop/order/getById');

    this.getOrder = http.post('/shop/order/queryAllForAgent');

    this.cancelOrder = http.post('/shop/order/cancelOrder');

    this.payOrder = http.post('/shop/order/payOrder');

    this.deliveryOrder = http.post('/shop/order/deliveryOrder');

    this.acceptOrder = http.post('/shop/order/getOrder');

    this.deleteCoupon = http.post('/member/coupon/delById');

    this.wxPayUndefinedOrder = http.post('/wx/pay/wxPayUndefinedOrder');

    this.queryWXPayResult = http.post('/wx/pay/wxpayCallback');

    this.getOrderStates = http.post('/shop/order/getStateOrdersForAgent')

    this.calculateSale = http.post('/sales/salesplan/calculateSale');

})