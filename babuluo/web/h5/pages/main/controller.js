AndSellH5MainModule.controller('H5.MainController', function ($scope, $state, modalFactory,productFactory) {
    $scope.currentPage = 'sy';
    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
        updateWxTitle($scope.title);
    });

    //nav-Bottom 初始化
    $scope.$on('nav-bottom', function (event, data) {
        $scope.navShow = data.OnOffState;
    });

    //低栏
    $scope.$on('currentPage', function (event, data) {
        $scope.currentPage = data;
    });

    //低栏
    $scope.$on('updateCart', function (event, data) {
        $scope.caculCart();
    });

    $scope.toPage = function (page) {
        $scope.currentPage = page;
    }

    $scope.caculCart = function () {
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }
        if(cartInfo.length>0)$scope.getPrdInfo(cartInfo,cartSize);
    }

    $scope.getPrdInfo = function (cartInfo,cartSize) {
        var size = 0;
        var params = {};
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = cartInfo.toString();
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
            response.data.forEach(function (ele) {
                size += cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
            });
            $scope.cartSize = size;
        })
    }

    $scope.caculCart();

});
