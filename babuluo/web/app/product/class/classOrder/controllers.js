angular.module('AndSell.Main').controller('product_class_classOrder_Controller', function ($scope,modalFactory,classFactory) {

    modalFactory.setTitle('商品分类列表');
    modalFactory.setBottom(false);

    $scope.initLoad = function () {
        classFactory.getPrdClassList({}, function (response) {
                //获取数据
                var data={
                    keyName : 'SHOP_PRODUCT_CLASS.CLASS_NAME',
                    keyId : 'SHOP_PRODUCT_CLASS.CLASS_ID',
                    keyPId : 'SHOP_PRODUCT_CLASS.PARENT_CLASS_ID',
                    rootId : 0,
                    lists : response.data
                }
                $scope.tree=data;
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.initLoad();

    $scope.click= function (data) {
        console.log(data);
    }

});
