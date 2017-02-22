angular.module('AndSell.Main').controller('marketing_sales_event_Controller', function ($scope, $stateParams, eventFactory, modalFactory) {

    modalFactory.setTitle('事件管理');

    $scope.initLoad = function () {
        eventFactory.getEvent({}, function (repsonce) {
            $scope.eventList = repsonce.data;
        });
    };
    $scope.initLoad();

    $scope.addEvent = function () {
        if ($scope.add['EVENT_CONFIG.NAME'] == '') {
            modalFactory.showShortAlert("请填写名称");
            return;
        }
        var on = true;
        $scope.eventList.forEach(function (ele) {
            if (ele['EVENT_CONFIG.NAME'].trim() == $scope.add['EVENT_CONFIG.NAME'].trim()) {
                modalFactory.showShortAlert("已存在相同事件！");
                on = false;
            }
        });
        if (on) {
            $scope.add['EVENT_CONFIG.SHOP_ID_LIST'] = $scope.choicedShopID;
            eventFactory.addEvent($scope.add, function (response) {
                $("#add").modal('hide');
                modalFactory.showShortAlert('新增成功');
                $scope.initLoad();
                $scope.add = {};
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    };

    $scope.modifyEventClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyEvent = function () {
        $scope.modify['EVENT_CONFIG.SHOP_ID_LIST'] = $scope.choicedShopID;
        $scope.modify['EVENT_CONFIG.SHOP_ID_LIST'] = setNullValue($scope.modify['EVENT_CONFIG.SHOP_ID_LIST']);
        eventFactory.modEvent($scope.modify, function (response) {
            $("#modify").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyEventState = function (item, state) {
        modalFactory.showAlert("确定" + (state == -1 ? "停用" : "启用") + "该事件?", function () {
            item['EVENT_CONFIG.STATE'] = state;
            eventFactory.modEvent(item, function (response) {
                modalFactory.showShortAlert((state == -1 ? "停用" : "启用") + "成功");
                $scope.initLoad();
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });
    };

    $scope.delEvent = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            eventFactory.delEvent(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });
    };

    $scope.choicedShopID = '';

    $scope.shopSwitch = function (data) {
        $scope.choicedShopID = '';
        data.forEach(function (ele) {
            $scope.choicedShopID = $scope.choicedShopID + "," + ele['SHOP.SHOP_ID'];
        });
        if ($scope.choicedShopID.length > 0) {
            $scope.choicedShopID = $scope.choicedShopID.substring(1);
        }
        modalFactory.showShortAlert("参与门店配置成功");
    }

});