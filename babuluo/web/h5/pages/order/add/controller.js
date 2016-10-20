AndSellH5MainModule.controller('H5.OrderAddController', function ($scope, $state,$stateParams,productFactory, modalFactory) {

    modalFactory.setTitle('新增订单');
    modalFactory.setBottom(false);

    $scope.initData= function () {

        $scope.cartInfo = getCookie('cartInfo');
        $scope.cartSize = getCookie('cartSize');
        if ($scope.cartInfo == '') {
            $scope.cartInfo = new Array;
            $scope.cartSize = {};
        } else {
            $scope.cartInfo = JSON.parse($scope.cartInfo);
            $scope.cartSize = JSON.parse($scope.cartSize);
        }

        var SKU_IDS=$stateParams.SKU_IDS;
        var params = {};
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = SKU_IDS;
        productFactory.getProductSkuBySkuIds(params).get({}, function (response) {
            console.log(response);
            $scope.skuList = response.data;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE']=$scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
            });
            $scope.updateCartPrice();
        });
    }

    //计算订单价格  未做优惠促销等逻辑
    $scope.updateCartPrice= function () {
        var price=0;
        $scope.skuList.forEach(function (ele) {
            price+=ele['SHOP_PRODUCT_SKU.REAL_PRICES']*ele['SHOP_PRODUCT_SKU.SIZE'];

        });
        $scope.totalPrice=price;
    }

});
