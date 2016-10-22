AndSellH5MainModule.controller('H5.OrderDetailController', function ($scope, $state,$stateParams,productFactory,orderFactory,modalFactory) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.initData= function () {
        $scope.getOrder($stateParams.ORDER_ID);
    }

    $scope.getOrder= function (id) {
        orderFactory.getById(id).get({}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD']=getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.orderDetailList=JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order=response.data[0];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfo(ele);
                var contents = '';
                if (ele['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
                    contents +=' ';
                    contents += ele['SHOP_ORDER_INFO.SKU_1_NAME'] + " : " + ele['SHOP_ORDER_INFO.SKU_3_VALUE'];
                }
                if (ele['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
                    contents +=' ';
                    contents += ele['SHOP_ORDER_INFO.SKU_2_NAME'] + " : " + ele['SHOP_ORDER_INFO.SKU_3_VALUE'];
                }
                if (ele['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
                    contents +=' ';
                    contents += ele['SHOP_ORDER_INFO.SKU_3_NAME'] + " : " + ele['SHOP_ORDER_INFO.SKU_3_VALUE'];
                }
                ele['SHOP_ORDER_INFO.SKU_CONTENT_INFO'] = contents;
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


})