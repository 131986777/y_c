angular.module('AndSell.H5.Main').controller('pages_order_detail_Controller', function ($scope, $state, $stateParams, weUI, productFactory, orderFactory, modalFactory) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN=FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.getOrderById($stateParams.ORDER_ID);
        $scope.shop = getCookie('currentShopInfo');
    }

    $scope.getOrder = function (id) {
        orderFactory.getOrderById(id).get({}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.orderDetailList = JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order = response.data[0];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
            console.log($scope.orderDetailList);
        });
    }

    //取消订单
    $scope.cancelOrder = function () {
        orderFactory.cancelOrder($scope.order['SHOP_ORDER.ID']).get({}, function () {
            weUI.toast.ok('取消订单成功');
            $scope.getOrderById($scope.order['SHOP_ORDER.ID']);
        });
    }

    //确认提货
    $scope.getPrdNow = function () {
        orderFactory.acceptOrder($scope.order['SHOP_ORDER.ID']).get({}, function () {
            weUI.toast.ok('收货成功');
            $scope.getOrderById($scope.order['SHOP_ORDER.ID']);
        });
    }

    //立即支付
    $scope.payNow = function () {
        orderFactory.payOrder($scope.order['SHOP_ORDER.ID']).get({}, function () {
            weUI.toast.ok('支付成功');
            $scope.getOrderById($scope.order['SHOP_ORDER.ID']);
        });
    }

    //评价订单
    $scope.commentOrder = function () {

    }


})