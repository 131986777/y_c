AndSellMainModule.controller('productListController', function ($scope, productFactory, modalFactory) {

    modalFactory.setTitle('商品列表');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {

        $scope.productList = response.data;
        $scope.tagList = response.extraData.tagList;
        console.log($scope.productList);

    };

    //改变商品上下架状态
    $scope.changeProductSaleState = function (item) {
        productFactory.setProductState(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    //改变sku上下架状态
    $scope.changeSkuSaleState = function (item) {
        productFactory.setSkuState(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    //删除商品
    $scope.delProduct = function (item) {
        item['SHOP_PRODUCT.IS_DEL'] = 1;
        productFactory.delProduct(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    //删除sku
    $scope.delSku = function (item) {
        item['SHOP_PRODUCT_SKU.IS_DEL'] = 1;
        productFactory.delSku(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    //改价
    $scope.showModifySkuPrice = function (item) {
        console.log(item);
        $scope.modifyProduct = item;
    }

    var changeList=new Array;

    //记录修改的item
    $scope.addToChangeList = function (item) {
        console.log(item);
        item.isChange = true;
        changeList.push(item);
    }

    //修改sku的价格
    $scope.submitModifySkuPrice = function (){
        console.log(changeList);
        var param = {};
        param.skuList=JSON.stringify(changeList);
        productFactory.modifySkuListPrice(param).get({}, function (response) {
            modalFactory.showShortAlert("改价成功");
            $('#modifySkuPrice').modal('hide');
            modalFactory.reload();
        });
    }

});
