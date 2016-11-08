angular.module('AndSell.Main').controller('order_order_orderDetail_Controller', function ($scope, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN=FILE_SERVER_DOMAIN;

    $scope.initData= function () {
        $scope.modify={};
        $scope.getOrder($stateParams.ORDER_ID);
    }

    $scope.getOrder= function (id) {
        orderFactory.getById(id).get({}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD']=getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            response.data[0]['SHOP_ORDER.DATETIME_PAY']=getDate(response.data[0]['SHOP_ORDER.DATETIME_PAY']);
            response.data[0]['SHOP_ORDER.DATETIME_DELIVERY']=getDate(response.data[0]['SHOP_ORDER.DATETIME_DELIVERY']);
            response.data[0]['SHOP_ORDER.DATETIME_COMMENT']=getDate(response.data[0]['SHOP_ORDER.DATETIME_COMMENT']);
            $scope.orderDetailList=JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order=response.data[0];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
            console.log($scope.orderDetailList);
        });
    }

    //取消订单
    $scope.cancelOrder= function () {
        orderFactory.cancelOrder($scope.order['SHOP_ORDER.ID']).get({}, function () {
            alert('取消订单成功');
            $scope.getOrder($scope.order['SHOP_ORDER.ID']);
        });
    }

    //确认提货
    $scope.getPrdNow= function () {
        orderFactory.deliveryOrder($scope.order['SHOP_ORDER.ID']).get({}, function () {
            alert('提货成功');
            $scope.getOrder($scope.order['SHOP_ORDER.ID']);
        });
    }

    //立即支付
    $scope.payNow= function () {
        orderFactory.payOrder($scope.order['SHOP_ORDER.ID']).get({}, function () {
            alert('支付成功');
            $scope.getOrder($scope.order['SHOP_ORDER.ID']);
        });
    }

    $scope.remarkModifyClick= function () {
        $scope.modify['SHOP_ORDER.ID']=$scope.order['SHOP_ORDER.ID'];
        $scope.modify['SHOP_ORDER.REMARK']=$scope.order['SHOP_ORDER.REMARK'];
    }

    //备注修改
    $scope.modifyOrderRemark= function () {
        orderFactory.modifyOrderRemark($scope.modify).get({}, function (response) {
            $scope.order['SHOP_ORDER.REMARK']=$scope.modify['SHOP_ORDER.REMARK'];
            $('#modifyRemark').modal('hide');
        });
    }


});
