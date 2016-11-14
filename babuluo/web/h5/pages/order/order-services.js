AndSellH5MainModule.service('orderFactory', function ($resource) {

    this.addOrder = $post($resource,'/shop/order/addOrderWithDetail');

    this.getOrderById = $post($resource,'/shop/order/getById');

    this.getOrder = $post($resource,'/shop/order/queryAllForAgent');

    this.cancelOrder = $post($resource,'/shop/order/cancelOrder');

    this.payOrder = $post($resource,'/shop/order/payOrder');

    this.deliveryOrder = $post($resource,'/shop/order/deliveryOrder');

    this.acceptOrder = $post($resource,'/shop/order/getOrder');

    this.deleteCoupon = $post($resource,'/member/coupon/delById');

    this.wxPayUndefinedOrder = $post($resource, '/wx/pay/wxPayUndefinedOrder');

    this.queryWXPayResult = $post($resource, '');
})