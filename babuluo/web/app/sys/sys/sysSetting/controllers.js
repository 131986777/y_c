/**
 * Created by Vam W on 2017/1/5.
 */
angular.module('AndSell.Main').controller('sys_sys_sysSetting_Controller', function ($scope, $stateParams, modalFactory, sysConfigFactory) {

    modalFactory.setTitle('系统设置');
    modalFactory.setBottom(true);

    $scope.initLoad = function () {

        sysConfigFactory.getSys({}, function (response) {
            $scope.sysList = response.data;
            console.log($scope.sysList);
            $scope.sysList.forEach(function (ele) {
                //支付设置
                if (ele['SYS_CONFIG.CONFIG_KEY'] == "WX_APP_ID") {
                    $scope.WX_APP_ID = ele['SYS_CONFIG.CONFIG_VALUE'];
                }
                if (ele['SYS_CONFIG.CONFIG_KEY'] == "WX_APP_SECRET") {
                    $scope.WX_APP_SECRET = ele['SYS_CONFIG.CONFIG_VALUE'];
                }
                if (ele['SYS_CONFIG.CONFIG_KEY'] == "WX_MCHID") {
                    $scope.WX_MCHID = ele['SYS_CONFIG.CONFIG_VALUE'];
                }
                if (ele['SYS_CONFIG.CONFIG_KEY'] == "WX_KEY") {
                    $scope.WX_KEY = ele['SYS_CONFIG.CONFIG_VALUE'];
                }

                //库存设置
                if (ele['SYS_CONFIG.CONFIG_KEY'] == "INVENTORY_THRESHOLD") {
                    $scope.INVENTORY_THRESHOLD = ele['SYS_CONFIG.CONFIG_VALUE'];
                }

                //订单设置
                if (ele['SYS_CONFIG.CONFIG_KEY'] == "ORDER_MODE") {
                    $scope.ORDER_MODE = ele['SYS_CONFIG.CONFIG_VALUE'];
                }
            });
        });
    };
    $scope.initLoad();


    //modalFactory.showShortAlert("请输入0-100之间的正整数");
    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        console.log($scope.WX_APP_ID);
        console.log($scope.WX_APP_SECRET);
        console.log($scope.WX_MCHID);
        console.log($scope.WX_KEY);
        console.log($scope.INVENTORY_THRESHOLD);
        console.log($scope.ORDER_MODE);
        // memberFactory.modMemberListById($scope.member, function (response) {
        //     modalFactory.showShortAlert("保存成功");
        //     $scope.initLoad();
        // }, function (response) {
        //     modalFactory.showShortAlert(response.msg);
        // });
    }, function () {
        //取消事件
        $state.go('order/order/orderList//3');
    });

});

