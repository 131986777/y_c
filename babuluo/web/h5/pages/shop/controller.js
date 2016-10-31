AndSellH5MainModule.controller('H5.ShopController', function ($scope, $state, $stateParams, shopFactory, modalFactory) {

    modalFactory.setTitle('门店列表');
    modalFactory.setBottom(false);

    $scope.districtName = "全部区域";

    $scope.initLoad = function () {
        shopFactory.getShopList().get({}, function (response) {
            $scope.shopList = response.data;
            $scope.shopListLength = response.data.length;
            $scope.districtList = response.extraData.districtList;

           var shopMap = new Map;
            $scope.shopList.forEach(function (ele) {
                shopMap.set(ele['SHOP.SHOP_ID'],ele);
            });
            $scope.shopMap=shopMap;
            $scope.getRecentShopList();
        });
    };

    $scope.getRecentShopList = function () {
        var recentShopList=new Array;
        $scope.cookieShopIdList=getCookie('recentShopList').split(',');
        $scope.cookieShopIdList.forEach(function (ele) {
            if($scope.shopMap.get(ele)!=undefined){
                recentShopList.push($scope.shopMap.get(ele));
            }
        });
        $scope.recentShopList=recentShopList.reverse();
    }

    $scope.initLoad();

    $scope.shopSelect= function (shop) {
        setCookie('currentShop',shop['SHOP.SHOP_ID']);
        if($scope.cookieShopIdList.indexOf(shop['SHOP.SHOP_ID'])>0){
            $scope.cookieShopIdList.remove(shop['SHOP.SHOP_ID']);
        }
        if($scope.cookieShopIdList.length>=3){
            $scope.cookieShopIdList.splice(0,1);
        }
        $scope.cookieShopIdList.push(shop['SHOP.SHOP_ID']);
        setCookie('recentShopList',$scope.cookieShopIdList.toString());
        $state.go('home');
    }

    $scope.chooseDistrict = function (districtId, districtName) {
        $scope.districtName = districtName;
        var form = {};
        form['SHOP.DISTRICT_ID'] = districtId;
        shopFactory.getShopListByStrict(form).get({}, function (response) {
            $scope.shopList = response.data;
            $scope.shopListLength = response.data.length;
        });
    };

    $scope.allDistrict = function (districtName) {
        $scope.districtName = districtName;
        $scope.initLoad();
    };
});
