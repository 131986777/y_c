angular.module('AndSell.Main').controller('order_order_orderDetail_Controller', function ($scope, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN=FILE_SERVER_DOMAIN;

    $scope.initData= function () {
        $scope.modify={};
        $scope.getOrder($stateParams.ORDER_ID);
    }

    $scope.getOrder= function (id) {
        orderFactory.getById({'SHOP_ORDER.ID':id}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD']=getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            response.data[0]['SHOP_ORDER.DATETIME_PAY']=getDate(response.data[0]['SHOP_ORDER.DATETIME_PAY']);
            response.data[0]['SHOP_ORDER.DATETIME_OUT']=getDate(response.data[0]['SHOP_ORDER.DATETIME_OUT']);
            response.data[0]['SHOP_ORDER.DATETIME_SEND']=getDate(response.data[0]['SHOP_ORDER.DATETIME_SEND']);
            response.data[0]['SHOP_ORDER.DATETIME_DELIVERY']=getDate(response.data[0]['SHOP_ORDER.DATETIME_DELIVERY']);
            response.data[0]['SHOP_ORDER.DATETIME_COMMENT']=getDate(response.data[0]['SHOP_ORDER.DATETIME_COMMENT']);
            response.data[0]['SHOP_ORDER.DATETIME_ACCEPT']=getDate(response.data[0]['SHOP_ORDER.DATETIME_ACCEPT']);
            $scope.orderDetailList=JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order=response.data[0];
            if($scope.order['SHOP_ORDER.ERP_REMARK']!=undefined&&$scope.order['SHOP_ORDER.ERP_REMARK']!='') {
                $scope.order['SHOP_ORDER.ERP_NUM'] = JSON.parse($scope.order['SHOP_ORDER.ERP_REMARK']).orderCode;
            }
            $scope.orderType = $scope.order['SHOP_ORDER.TYPE'];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
        });
    }

    //取消订单
    $scope.cancelOrder= function () {
        modalFactory.showAlert("确定取消该订单嘛？", function () {
            orderFactory.cancelOrder({'SHOP_ORDER.ID':$scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('取消订单成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    //出库订单
    $scope.outOrder= function () {
        modalFactory.showAlert("所有商品均已经出库？", function () {
            orderFactory.outOrder({'SHOP_ORDER.ID':$scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('订单出库成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

   //发货订单
    $scope.sendOrder= function () {
        modalFactory.showAlert("确定取消该订单嘛？", function () {
            orderFactory.sendOrder({'SHOP_ORDER.ID':$scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('订单发货成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    //确认提货
    $scope.deliveryOrder= function () {
        modalFactory.showAlert("确定客户已经拿走所有商品嘛？", function () {
            orderFactory.deliveryOrder({'SHOP_ORDER.ID':$scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('提货成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    //立即支付
    $scope.payNow= function () {
        modalFactory.showAlert("确定支付该订单嘛？", function () {
            orderFactory.payOrder({'SHOP_ORDER.ID':$scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('支付成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    $scope.remarkModifyClick= function () {
        $scope.modify['SHOP_ORDER.ID']=$scope.order['SHOP_ORDER.ID'];
        $scope.modify['SHOP_ORDER.REMARK']=$scope.order['SHOP_ORDER.REMARK'];
    }

    //备注修改
    $scope.modifyOrderRemark= function () {
        orderFactory.modifyOrderRemark($scope.modify, function (response) {
            $scope.order['SHOP_ORDER.REMARK']=$scope.modify['SHOP_ORDER.REMARK'];
            $('#modifyRemark').modal('hide');
        });
    }

});
