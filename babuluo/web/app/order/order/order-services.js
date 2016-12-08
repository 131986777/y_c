AndSellMainModule.service('orderFactory', function ($resource, baseURL) {

    //获取一定日期内的订单分析数据
    this.getOrderAnalysisByRange = function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_ORDER",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };

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

    this.scanOrder= function (id) {
        return $resource(baseURL + '/shop/order/scanOrder?SHOP_ORDER.ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    }
});