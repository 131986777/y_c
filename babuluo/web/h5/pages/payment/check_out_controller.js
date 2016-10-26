AndSellH5MainModule.controller('H5.OrderSuccessController', function ($scope, $state,$stateParams,productFactory,orderFactory,modalFactory) {

    modalFactory.setTitle('下单成功');
    modalFactory.setBottom(false);

    $scope.initData= function () {
        orderFactory.getById($stateParams.ORDER_ID).get({}, function (response) {
            console.log(response);
            response.data[0]['SHOP_ORDER.DATETIME_ADD']=getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.order=response.data[0];
        });
    }

    //支付
    $scope.payNow= function () {

    }




})