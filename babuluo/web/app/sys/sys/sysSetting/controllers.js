/**
 * Created by Vam W on 2017/1/5.
 */
angular.module('AndSell.Main').controller('sys_sys_sysSetting_Controller', function ($scope, $state, $stateParams, modalFactory, sysConfigFactory) {

    modalFactory.setTitle('系统设置');
    modalFactory.setBottom(true);

    $scope.initLoad = function () {
        $scope.configMap = new Map();
        sysConfigFactory.getSys({}, function (response) {
            $scope.configMap = response.extraData.configMap;
            //支付设置
            $scope.WX_APP_ID = $scope.configMap["WX_APP_ID"];
            $scope.WX_APP_SECRET = $scope.configMap["WX_APP_SECRET"];
            $scope.WX_MCHID = $scope.configMap["WX_MCHID"];
            $scope.WX_KEY = $scope.configMap["WX_KEY"];
            //库存设置
            $scope.INVENTORY_THRESHOLD = $scope.configMap["INVENTORY_THRESHOLD"];
            //订单设置
            $scope.ORDER_MODE = $scope.configMap["ORDER_MODE"];

        });
    };
    $scope.initLoad();

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        var configList = [];
        configList.push({"SYS_CONFIG.CONFIG_KEY": "WX_APP_ID", "SYS_CONFIG.CONFIG_VALUE": $scope.WX_APP_ID});
        configList.push({"SYS_CONFIG.CONFIG_KEY": "WX_APP_SECRET", "SYS_CONFIG.CONFIG_VALUE": $scope.WX_APP_SECRET});
        configList.push({"SYS_CONFIG.CONFIG_KEY": "WX_MCHID", "SYS_CONFIG.CONFIG_VALUE": $scope.WX_MCHID});
        configList.push({"SYS_CONFIG.CONFIG_KEY": "WX_KEY", "SYS_CONFIG.CONFIG_VALUE": $scope.WX_KEY});
        configList.push({"SYS_CONFIG.CONFIG_KEY": "INVENTORY_THRESHOLD", "SYS_CONFIG.CONFIG_VALUE": $scope.INVENTORY_THRESHOLD});
        configList.push({"SYS_CONFIG.CONFIG_KEY": "ORDER_MODE", "SYS_CONFIG.CONFIG_VALUE": $scope.ORDER_MODE});
        console.log(configList);
        configList.forEach(function (ele) {
            sysConfigFactory.modSysByKey(ele, function (response) {
            });
        });
        modalFactory.showShortAlert("修改成功");
    }, function () {
        //取消事件
        $state.go('order/order/orderList//3');
    });

});

