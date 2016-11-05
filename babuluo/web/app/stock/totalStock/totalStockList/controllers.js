AndSellMainModule.controller('totalStockController', function ($scope, shopFactory, totalStockFactory, modalFactory, $q) {

    modalFactory.setTitle('实时库存');


    // $scope.initLoad = function () {
    //
    //     totalStockFactory.getTotalStockList().get({}, function (response) {
    //         console.log(response);
    //         $scope.allStockList = response.data;
    //
    //     }, null);
    //
    //
    //   //  console.log($scope.storeMap.get('1'));
    // };

    $scope.bindData = function (response) {

        console.log(response);
        $scope.allStockList = response.data;
        $scope.storeQueryList = $scope.allStockList;
        $scope.productMap=response.extraData.prdMap;
    };

    //根据商品id查询
    $scope.queryStockById = function (pName) {
        //alert(PId);
        $scope.roundList = $scope.storeQueryList;
        if (pName == '' || pName == null) {
            $scope.allStockList = $scope.roundList;
        } else {
            var PId=$scope.productMap[pName];
            console.log('PID为'+PId);
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
        console.log($scope.add);

        totalStockFactory.addStore($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add = '';
                $("#addStore").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
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

        totalStockFactory.modifyStore($scope.modify).get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyStore").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.$broadcast('pageBar.reload');

            }
        });
    };

    $scope.deleteStore = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            totalStockFactory.delStoreById(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");

                    $scope.$broadcast('pageBar.reload');
                }
            });
        });

    }
});

