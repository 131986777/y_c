angular.module('AndSell.H5.Main').controller('pages_shop_Controller', function ($scope, $state, $stateParams, shopFactory, modalFactory) {

    modalFactory.setTitle('门店列表');
    modalFactory.setBottom(false);

    $scope.districtName = "全部区域";

    $scope.initLoad = function () {
        $scope.filter = {};
        $scope.getData();
    };

    $scope.getData=function () {
        shopFactory.getShopList($scope.filter, function (response) {
            $scope.shopList = response.data;
            $scope.shopListLength = response.data.length;
            $scope.districtList = response.extraData.districtList;
            var shopMap = new Map();
            $scope.shopList.forEach(function (ele) {
                shopMap.set(ele['SHOP.SHOP_ID'],ele);
            });
            $scope.shopMap=shopMap;
            $scope.getRecentShopList();
        });
    }

    $scope.getRecentShopList = function () {
        var recentShopList=new Array;
        $scope.cookieShopIdList=new Array;
        if(getCookie('recentShopList')!=undefined) {
            $scope.cookieShopIdList = getCookie('recentShopList').split(',');
        }
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

        shopFactory.getShopById({'SHOP.SHOP_ID':shop['SHOP.SHOP_ID']}, function (response) {
            $scope.shopInfo = response.data[0];
            if ($scope.shopInfo != undefined) {
                setCookie('currentShopInfo', JSON.stringify($scope.shopInfo));
            }

            if($stateParams.FROM=='')
                $state.go('pages/home');
            else{
                window.location.href=$stateParams.FROM;
            }
        });
    }

    $scope.chooseDistrict = function (districtId, districtName) {
        $scope.districtName = districtName;
        $scope.filter['SHOP.DISTRICT_ID'] = districtId;
        $scope.getData();
        // shopFactory.getShopList(form, function (response) {
        //     $scope.shopList = response.data;
        //     $scope.shopListLength = response.data.length;
        // });
    };

    $scope.allDistrict = function (districtName) {
        $scope.districtName = districtName;
        $scope.filter['SHOP.DISTRICT_ID'] = '';
        $scope.getData();
    };
});
