AndSellMainModule.controller('productListController', function ($scope, productFactory, modalFactory) {

    modalFactory.setTitle('商品列表');

    $scope.initLoad = function () {
        productFactory.getProduct().get({}, function (response) {
            console.log(response);
            modalFactory.showShortAlert("jaja");
        });
    };
    //$scope.initLoad();

    $scope.bindData = function (response) {
        $scope.productSpuSizeMap = new Map;
        $scope.productMap = new Map;
        $scope.productOrderList = [];
        $scope.productResultList = [];
        $scope.checkedSpu = [];
        $scope.checkedSku = [];
        $scope.checkAllProduct = false;

        filterTableFromList(response.data, "shop_product");
        $scope.productList = response.data;

        $scope.productList.forEach(function (element) {
            var size = $scope.productSpuSizeMap.get(element.PRD_SPU);
            if (size == undefined) {
                $scope.productSpuSizeMap.set(element.PRD_SPU, 1);
                $scope.productOrderList.push(element);
            } else {
                $scope.productSpuSizeMap.set(element.PRD_SPU, 1 + parseInt(size));
            }
        });

        $scope.productMap = $scope.listToMap($scope.productList);

        $scope.productOrderList.forEach(function (element, index, arr) {
            if (element.isSku == 1) {  //TODO 如果是sku属性 暂时默认都是
                var parent = angular.copy(element);
                parent.isParent = true;
                parent.hasSku = true;
                parent.hasTag = $scope.checkHasTag(parent);
                parent.showChildSku = false;
                $scope.productResultList.push(parent);
                var tmpList = $scope.productMap.get(element.prdSpu);

                if (tmpList.length == undefined || tmpList.length < 1) {
                    tmpList.isParent = false;
                    tmpList.hasSku = true;
                    tmpList.parent = parent;
                    $scope.productResultList.push(tmpList);
                } else {
                    tmpList.forEach(function (ele, index, arr) {
                        ele.isParent = false;
                        ele.hasSku = true;
                        ele.parent = parent;
                        $scope.productResultList.push(ele);
                    });
                }
            } else {
                element.isParent = true;
                element.hasSku = false;
                element.hasTag = $scope.checkHasTag(element);
                $scope.productResultList.push(element);
            }
        });

    };

    $scope.listToMap = function (productList) {
        var map = new Map;
        productList.forEach(function (element, index, arr) {
            var childList = map.get(element.prdSpu);
            if (childList == undefined) {
                childList = [];
                map.set(element.prdSpu, childList);
            }
            childList.push(element);
        });

        return map;
    };

    $scope.checkHasTag = function (product) {
        var tags = product.tag1 + product.tag2 + product.tag3 + product.tag4 + product.tag5;
        return tags != "";
    };


});
