AndSellMainModule.service('orderFactory', function ($resource, baseURL) {

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

    this.getOrder= function (filter) {
        console.log(filter);
        return $resource(baseURL + '/shop/order/queryAll', filter , {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.getStateOrders= function (params) {
        return $resource(baseURL + '/shop/order/getStateOrders', params , {
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

    this.outOrder= function (id) {
        return $resource(baseURL + '/shop/order/outOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.sendOrder= function (id) {
        return $resource(baseURL + '/shop/order/sendOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.payOrder= function (params) {
        return $resource(baseURL + '/shop/order/payOrder',params, {
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

    this.modifyOrderRemark= function (form) {
        return $resource(baseURL + '/shop/order/modifyOrderRemark', form, {
            'update': {
                method: 'PUT'
            }
        });
    }
});