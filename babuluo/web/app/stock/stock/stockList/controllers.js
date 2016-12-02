angular.module('AndSell.Main').controller('stock_stock_stockList_Controller', function ($scope, stockFactory, modalFactory, $q) {

    modalFactory.setTitle('实时库存');

    $scope.bindData = function (response) {
        $scope.stockList = response.data;
        $scope.storeQueryList = $scope.stockList;
        $scope.storeMap = response.extraData.storeMap;
        $scope.storeList = response.extraData.storeList;
        $scope.productMap = response.extraData.prdMap;
    };

    //根据商品查询
    $scope.queryStockById = function (pName) {
        $scope.filter['SHOP_PRODUCT.PRD_NAME'] = pName;
    };

    $scope.modify = {};
    $scope.modifyStockClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyStock = function () {

        stockFactory.modStockOnLine($scope.modify, function (response) {
            $("#modifyStock").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

});

