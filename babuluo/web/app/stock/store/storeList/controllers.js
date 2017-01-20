angular.module('AndSell.Main').controller('stock_store_storeList_Controller', function ($scope, $stateParams, storeFactory, modalFactory) {

    modalFactory.setTitle('仓库列表');

    $scope.bindData = function (response) {
        console.log(response);
        $scope.storeList = response.data;

    };

    $scope.addStore = function () {
        if ($scope.IS_DEF) {
            $scope.add['STORE.IS_DEF'] = 1;
        } else {
            $scope.add['STORE.IS_DEF'] = -1;
        }

        storeFactory.addStore($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = '';
            $scope.IS_DEF = false;
            $("#addStore").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyStoreClick = function (item) {

        $scope.modify = clone(item);
        $scope.modifyId = item['STORE.ID'];

    };

    $scope.modifyStore = function () {
        $scope.modify['STORE.ID'] = $scope.modifyId;

        if ($scope.modifyIsDef) {
            $scope.modify['STORE.IS_DEF'] = 1;
        } else {
            $scope.modify['STORE.IS_DEF'] = -1;
        }
        storeFactory.modifyStore($scope.modify, function (response) {
            $("#modifyStore").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.deleteStore = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            storeFactory.delStoreById({'STORE.ID': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });
    }

});
