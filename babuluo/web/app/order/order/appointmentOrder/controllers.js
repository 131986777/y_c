angular.module('AndSell.Main').controller('order_order_appointmentOrder_Controller', function ($scope, $state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('线上预约单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.filterStateOrder('get');
    }

    $scope.filterStateOrder = function (type) {
        $scope.state = type;
        $scope.orderType = $stateParams.orderType;
        $scope.filter = {'SHOP_ORDER.TYPE': '4'};
        if ($stateParams.keyword != '') {
            $scope.orderFilter = $stateParams.keyword;
            $scope.searchOrder();
        }

        if (type == 'all') {
            //全部订单
        } else if (type == 'end') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1;
        } else if (type == 'pay') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = -1;
            $scope.filter['SHOP_ORDER.NEED_PAY'] = 1;
        } else if (type == 'send') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.NEED_PAY'] = 1;
            $scope.filter['SHOP_ORDER.REC_TYPE'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = -1;
        } else if (type == 'get') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.REC_TYPE'] = 2;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1;
        } else if (type == 'delivery') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.NEED_PAY'] = 1;
            $scope.filter['SHOP_ORDER.REC_TYPE'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1;
        } else if (type == 'comment') {
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_COMMENT'] = -1;
        } else if (type == 'cancel') {
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = -1;
        }

    }

    $scope.getOrder = function (response) {

        var params = {};
        params['SHOP_ORDER.TYPE'] = '4';
        orderFactory.getStateOrders(params, function (response) {
            $scope.orderSizeMap = response.extraData.stateMap;
        });

        $("html,body").animate({scrollTop: 0}, 250);
        $scope.orderList = response.data;
        $scope.orderList.forEach(function (ele) {
            ele['SHOP_ORDER.DATETIME_ADD'] = getDate(ele['SHOP_ORDER.DATETIME_ADD']);
            ele.details = JSON.parse(ele['SHOP_ORDER.ORDER_INFO']);
            ele.details.forEach(function (item) {
                setContentsInfoForOrder(item);
            });
        });
        console.log($scope.orderList);
    }

    //查询订单
    $scope.searchOrder = function () {
        $scope.filter['SHOP_ORDER.FILTER_CONTENT'] = $scope.orderFilter;
    }

    //订单详情跳转
    $scope.toDetail = function (id) {
        orderFactory.scanOrder({'SHOP_ORDER.ID': id}, function (response) {
            console.log(response);
        });
        $state.go('order/order/orderDetail', {ORDER_ID: id});
    }

    //分拣跳转
    $scope.toSort = function (id) {
        orderFactory.scanOrder({'SHOP_ORDER.ID': id}, function (response) {
            console.log(response);
        });
        $state.go('order/order/orderSorting', {ORDER_ID: id});
    }

});