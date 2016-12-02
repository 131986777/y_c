angular.module('AndSell.Main').controller('product_class_classList_Controller', function ($scope, $stateParams, classFactory, modalFactory) {

    modalFactory.setTitle('商品分类管理');

    $scope.initLoad = function () {
        classFactory.getPrdClassList({}, function (repsonce) {
            $scope.productClassList = repsonce.data;
        }, null);
    };
    $scope.initLoad();

    $scope.addProductClass = function () {
        console.log($scope.add);
        $scope.add['SHOP_PRODUCT_CLASS.SERVICE_ID'] = 1;
        classFactory.addPrdClass($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.initLoad();
            $scope.add.key = 0;
            $scope.add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'] = 'BASIC';
            $scope.add['SHOP_PRODUCT_CLASS.CLASS_NAME'] = "";
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyClssNameClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyProductClass = function () {
        $scope.modify['SHOP_PRODUCT_CLASS.SERVICE_ID'] = 1;
        classFactory.modifyPrdClass($scope.modify, function (response) {
            $("#modifyClass").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delProductClass = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            classFactory.delPrdClass({'SHOP_PRODUCT_CLASS.CLASS_ID': id}, function (res) {
                modalfactory.showshortalert("删除成功");
                $scope.initload();
            });
        });
    }

});
