AndSellH5MainModule.service('orderFactory', function ($resource, baseURL) {

    this.addOrder = function (order) {
        return $resource(baseURL + '/shop/order/addOrderWithDetail', order, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getById= function (id) {
        return $resource(baseURL + '/shop/order/getById?SHOP_ORDER.ID=:ID', {ID:id}, {
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

})