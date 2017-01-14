AndSellPCMainModule.controller('PC.MainController', function ($scope, $state, modalFactory, productFactory) {

    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
    });

    $scope.$on('header-bar', function (event, data) {
        $scope.showMenuBar = data.OnOffState;
        $scope.showControllerBar = data.OnOffState;
        $scope.showGoodsCategoriesBar = data.OnOffState;
    });
    $scope.$on('header-showMenu', function (event, data) {
        $scope.showMenuBar = data.OnOffState;
    });
    $scope.$on('leftMenu', function (event, data) {
        $scope.showLeftMenu = data.OnOffState;
    });
    $scope.$on('header-tab', function (event, data) {
        $scope.showControllerBar = data.OnOffState;
    });

    $scope.$on('categories-bar', function (event, data) {
        $scope.showGoodsCategoriesBar = data.OnOffState;
    });

    //nav-Bottom 初始化
    $scope.$on('side-bar', function (event, data) {
        $scope.showSideBar = data.OnOffState;
    });

    //低栏
    $scope.$on('updateShop', function (event, data) {
        $$scope.updateShop();
    });

    //低栏
    $scope.$on('updateCart', function (event, data) {
        $scope.caculCart();
    });

    $scope.toPage = function (page) {
        $scope.currentPage = page;
    }

    $scope.updateShop= function () {
        $scope.shop=JSON.parse(getCookie('currentShopInfo'));
    }

    $scope.caculCart = function () {
        $scope.cartSize = 0;
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }
        if (cartInfo.length > 0)$scope.getPrdInfo(cartInfo, cartSize);
    }
    $scope.getPrdInfo = function (cartInfo, cartSize) {
        var size = 0;
        var params = {};
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = cartInfo.toString();
        if (getCookie('currentShopInfo')
            != ''
            && getCookie('currentShopInfo')
            != undefined
            && getCookie('currentShopInfo')
            != null) {
            if (JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'] != undefined) {
                params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
                productFactory.getProductSkuBySkuIds(params, function (response) {
                    response.data.forEach(function (ele) {
                        size += cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                    });
                    $scope.cartSize = size;
                })
            }
        }
    }

    $scope.caculCart();

    $scope.updateShop();

});
