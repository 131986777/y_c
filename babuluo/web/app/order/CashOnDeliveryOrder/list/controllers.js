angular.module('AndSell.Main').controller('order_CashOnDeliveryOrder_list_Controller', function ($scope, $state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('预定单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.filterStateOrder('out');
    }

    $scope.filterStateOrder = function (type) {
        $scope.state = type;
        $scope.filter = {};
        $scope.filter['SHOP_ORDER.TYPE'] = 4;
        if ($stateParams.keyword != '') {
            $scope.orderFilter = $stateParams.keyword;
            $scope.searchOrder();
        }

        if (type == 'all') {
            //全部订单
        } else if (type == 'end') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
        } else if (type == 'pay') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = -1;
        } else if (type == 'get') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1
        } else if (type == 'out') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = -1
        } else if (type == 'send') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = -1
        } else if (type == 'accept') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = 1;
            $scope.filter['SHOP_ORDER.STATE_ACCEPT'] = -1;
        } else if (type == 'cancel') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = -1;
        } else if (type == 'comment') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_COMMENT'] = -1;
        }
    }

    $scope.getOrder = function (response) {

        var params = {};
        params['SHOP_ORDER.TYPE'] = 4;
        orderFactory.getStateOrders(params, function (response) {
            $scope.orderSizeMap = response.extraData.stateMap;
        });

        $scope.orderList = response.data;
        $scope.orderList.forEach(function (ele) {
            ele['SHOP_ORDER.DATETIME_ADD'] = getDate(ele['SHOP_ORDER.DATETIME_ADD']);
            ele.details = JSON.parse(ele['SHOP_ORDER.ORDER_INFO']);
            ele.details.forEach(function (item) {
                setContentsInfoForOrder(item);
            });
        });

    }

    //查询订单
    $scope.searchOrder = function () {
        $scope.filter['SHOP_ORDER.FILTER_CONTENT'] = $scope.orderFilter;
    }

    //订单详情跳转
    $scope.toDetail = function (id) {
        orderFactory.scanOrder({'SHOP_ORDER.ID':id}, function (response) {
            console.log(response);
        });
        $state.go('order/CashOnDeliveryOrder/orderDetail', {ORDER_ID: id});
    }

});
