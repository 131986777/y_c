angular.module('AndSell.Main').controller('stock_totalStock_totalStockList_Controller', function ($scope, shopFactory, totalStockFactory, modalFactory, $q) {

    modalFactory.setTitle('实时库存');

    $scope.bindData = function (response) {
        $scope.allStockList = response.data;
        $scope.storeQueryList = $scope.allStockList;
        $scope.productMap = response.extraData.prdMap;
    };

    //根据商品id查询
    $scope.queryStockById = function (pName) {
        $scope.roundList = $scope.storeQueryList;
        if (pName == '' || pName == null) {
            $scope.allStockList = $scope.roundList;
        } else {
            var PId = $scope.productMap[pName];
            $scope.allStockList = [];
            for (var i = 0; i < $scope.roundList.length; i++) {
                if ($scope.roundList[i]['STOCK_REALTIME.PID'] == PId) {
                    $scope.allStockList.push($scope.roundList[i]);
                }
            }
        }
    }
    $scope.addStore = function () {
        if ($scope.IS_DEF) {
            $scope.add['STORE.IS_DEF'] = 1;
        } else {
            $scope.add['STORE.IS_DEF'] = -1;
        }
        $scope.add['STORE.IS_DEF'] = 1;
        $scope.add['STORE.ADD_DATETIME'] = new Date();  //add['STORE.IS_DEF']

        totalStockFactory.addStore($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = '';
            $("#addStore").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyStoreClick = function (item) {

        $scope.modify = clone(item);
        $scope.modifyId = item['STORE.ID'];
        //console.log('删除ID为'+modifyId);

    };

    $scope.modifyStore = function () {
        $scope.modify['STORE.ID'] = $scope.modifyId;

        if ($scope.modifyIsDef) {
            $scope.modify['STORE.IS_DEF'] = 1;
        } else {
            $scope.modify['STORE.IS_DEF'] = -1;
        }

        totalStockFactory.modifyStore($scope.modify, function (response) {
            $("#modifyStore").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.deleteStore = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            totalStockFactory.delStoreById({'STORE.ID': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });

    }
});

