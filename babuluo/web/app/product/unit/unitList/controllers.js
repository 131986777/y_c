angular.module('AndSell.Main').controller('product_unit_unitList_Controller', function ($scope, $stateParams, unitFactory, modalFactory) {

    modalFactory.setTitle('商品单位管理');

    $scope.initLoad = function () {
        unitFactory.getPrdUnitList({}, function (repsonce) {
            $scope.productUnitList = repsonce.data;
        }, null);
    };
    $scope.initLoad();

    $scope.addProductUnit = function () {
        console.log($scope.add);
        $scope.add['SHOP_UNIT.SERVICE_ID'] = 1;
        if ($scope.add['SHOP_UNIT.UNIT_NAME'] == '') {
            modalFactory.showShortAlert("请填写单位名称");
            return;
        }
        unitFactory.addPrdUnit($scope.add, function (response) {
            $("#addUnit").modal('hide');
            modalFactory.showShortAlert('新增成功');
            $scope.initLoad();
            $scope.add['SHOP_UNIT.UNIT_NAME'] = "";
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyUnitNameClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyProductUnit = function () {
        $scope.modify['SHOP_UNIT.SERVICE_ID'] = 1;
        unitFactory.modifyPrdUnit($scope.modify, function (response) {
            $("#modifyUnit").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delProductUnit = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            unitFactory.delPrdUnit({'SHOP_UNIT.UNIT_ID': id}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.initLoad();
                }
            });
        });

    }

});

