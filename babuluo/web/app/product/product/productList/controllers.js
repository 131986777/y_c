AndSellMainModule.controller('productListController', function ($scope, productFactory, modalFactory) {

    modalFactory.setTitle('商品列表');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {

        $scope.productList = response.data;
        console.log( $scope.productList);

    };

    $scope.changeProductSaleState = function (item) {
        productFactory.setProductState(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    $scope.changeSkuSaleState = function (item) {
        productFactory.setSkuState(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    $scope.delProduct= function (item) {
        item['SHOP_PRODUCT.IS_DEL']=1;
        productFactory.delProduct(item).get({},function(){
            $scope.$broadcast('pageBar.reload');
        });
    }

    $scope.delSku= function (item) {
        item['SHOP_PRODUCT_SKU.IS_DEL']=1;
        productFactory.delSku(item).get({},function(){
            $scope.$broadcast('pageBar.reload');
        });
    }

});
