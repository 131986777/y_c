AndSellMainModule.controller('classOrderController', function ($scope,modalFactory,classFactory) {

    modalFactory.setTitle('商品分类列表');
    modalFactory.setBottom(false);

    $scope.initLoad = function () {
        classFactory.getPrdClassList().get({}, function (response) {
            if (response.code == 0) {

                //获取数据
                var data={
                    keyName : 'SHOP_PRODUCT_CLASS.CLASS_NAME',
                    keyId : 'SHOP_PRODUCT_CLASS.CLASS_ID',
                    keyPId : 'SHOP_PRODUCT_CLASS.PARENT_CLASS_ID',
                    rootId : 0,
                    lists : response.data
                }
                $scope.tree=data;

            } else {
                $scope.$broadcast("to-modal", {message: response.msg});
            }
        }, null);
    };

    $scope.initLoad();

    $scope.click= function (data) {
        console.log(data);
    }

});
