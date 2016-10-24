AndSellMainModule.controller('orderListController', function ($scope, $state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('订货单');
    modalFactory.setBottom(false);

    $scope.initData = function () {
        $scope.yy = {
            'background-color': '#31C552'
        };
        $scope.filterStateOrder('all');

    }

    $scope.filterStateOrder = function (type) {
        $scope.state = type;
        $scope.filter = {};
        if (type == 'all') {
            //全部订单
        } else if (type == 'end') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1
        } else if (type == 'pay') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = -1;
        } else if (type == 'get') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1
        } else if (type == 'comment') {
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1
            $scope.filter['SHOP_ORDER.STATE_COMMENT'] = -1;
        }
    }

    $scope.getOrder = function (response) {

        orderFactory.getStateOrders().get({}, function (response) {
            $scope.orderSizeMap=response.extraData.stateMap;
        });

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
        $state.go('order-detail', {ORDER_ID: id});
    }

});
