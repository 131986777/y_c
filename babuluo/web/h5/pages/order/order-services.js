AndSellH5MainModule.service('orderFactory', function ($resource, baseURL) {

    this.addOrder = function (order) {
        return $resource(baseURL + '/shop/order/addOrderWithDetail', order, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getOrderById= function (id) {
        return $resource(baseURL + '/shop/order/getById?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getOrder= function (filter) {
        return $resource(baseURL + '/shop/order/queryAllForAgent', filter , {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.cancelOrder= function (id) {
        return $resource(baseURL + '/shop/order/cancelOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.payOrder= function (id) {
        return $resource(baseURL + '/shop/order/payOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.deliveryOrder= function (id) {
        return $resource(baseURL + '/shop/order/deliveryOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.acceptOrder= function (id) {
        return $resource(baseURL + '/shop/order/getOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.getShop= function (id) {
        return $resource(baseURL + '/shop/shop/queryAll', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.deleteCoupon= function (id) {
        return $resource(baseURL + '/member/coupon/delById?MEMBER_COUPON.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

})