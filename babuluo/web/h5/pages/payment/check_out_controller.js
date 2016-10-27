AndSellH5MainModule.controller('H5.OrderSuccessController', function ($scope, $state, $stateParams, productFactory, orderFactory, modalFactory, weUI) {

    modalFactory.setTitle('下单成功');
    modalFactory.setBottom(false);

    $scope.initData = function () {
        orderFactory.getById($stateParams.ORDER_ID).get({}, function (response) {
            console.log(response);
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.order = response.data[0];
        });
    }

    //支付
    $scope.payNow = function () {
        $scope.pay['SHOP_ORDER.ID'] = $stateParams.ORDER_ID;
        orderFactory.payOrder($scope.pay).get({}, function (response) {
            console.log(response);
            if (response.code == 0) {
                // 隐藏模态框
                mask.hide().removeClass('weui_fade_toggle');
                weuiActionsheet.removeClass("weui_actionsheet_toggle");
                weUI.toast.ok('支付成功');
                $state.go('order-detail', {ORDER_ID: $stateParams.ORDER_ID});
            } else {
                weUI.toast.error(response.msg);
            }
        });

    }

    var mask = $("#mask");
    var weuiActionsheet = $("#weui_actionsheet");

    //弹出支付
    $scope.payClick = function () {

        // 弹出模态框
        mask.show().addClass('weui_fade_toggle').focus();

        //加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
        weuiActionsheet.addClass("weui_actionsheet_toggle");

        mask.click(function () {
            // 隐藏模态框
            mask.hide().removeClass('weui_fade_toggle');
            weuiActionsheet.removeClass("weui_actionsheet_toggle");
        });

    }

})