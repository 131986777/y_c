AndSellH5MainModule.controller('H5.HomeController', function ($scope, $state, weUI, modalFactory, shopFactory) {

    modalFactory.setTitle('主页');
    modalFactory.setBottom(true);

    //商品搜索
    $scope.searchPrd = function () {
        $state.go('prd-List', {keyword: $scope.prdKeyword});
    }

    $scope.initData = function () {
        var id = getCookie('currentShop');
        console.log(id);
        if (id == undefined || id.trim() == '') {
            weUI.toast.info('请先选择门店');
            $state.go('shopList');
        } else {
            $scope.lastShop = getCookie('currentShopInfo');
            if ($scope.lastShop != undefined && $scope.lastShop['SHOP.SHOP_ID'] == id) {
                $scope.shopInfo = $scope.lastShop;
            } else {
                shopFactory.getShopById(id).get({}, function (response) {
                    $scope.shopInfo = response.data[0];
                    if ($scope.shopInfo != undefined) {
                        setCookie('currentShopInfo', $scope.shopInfo);
                    }
                });
            }
        }
    }

});
