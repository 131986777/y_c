AndSellMainModule.service('orderFactory', function (http) {

    this.addOrder=http.post('/shop/order/addOrderWithDetail');
    this.getById=http.post('/shop/order/getById');
    this.getOrder=http.post('/shop/order/queryAll');
    this.getStateOrders=http.post('/shop/order/getStateOrders');
    this.cancelOrder=http.post('/shop/order/cancelOrder');
    this.outOrder=http.post('/shop/order/outOrder');
    this.sendOrder=http.post('/shop/order/sendOrder');

    //this.= function (id) {
    //    return $resource(baseURL + '/shop/order/cancelOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //}
    //this.outOrder= function (id) {
    //    return $resource(baseURL + '/shop/order/outOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //}
    //this.sendOrder= function (id) {
    //    return $resource(baseURL + '/shop/order/sendOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //}


    this.payOrder=http.post('/shop/order/payOrder');
    this.deliveryOrder=http.post('/shop/order/deliveryOrder');
    this.modifyOrderRemark=http.post('/shop/order/modifyOrderRemark');
    this.scanOrder=http.post('/shop/order/scanOrder');

    //this.= function (id) {
    //    return $resource(baseURL + '/shop/order/deliveryOrder?=:ID', {ID:id}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //}

    //
    //this.= function (id) {
    //    return $resource(baseURL + '/shop/order/scanOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
    //        'update': {
    //            method: 'PUT'
    //        }
    //    });
    //}
});