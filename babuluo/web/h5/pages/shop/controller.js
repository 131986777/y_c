AndSellH5MainModule.controller('H5.ShopController', function ($scope, $state, $stateParams, shopFactory, modalFactory) {

    modalFactory.setTitle('门店列表');
    modalFactory.setBottom(false);

    $scope.districtName = "全部区域";

    $scope.initLoad = function () {
        shopFactory.getShopList().get({}, function (response) {
            $scope.shopList = response.data;
            console.log($scope.shopList);
            $scope.shopListLength = response.data.length;
            console.log($scope.shopListLength);
            $scope.districtList = response.extraData.districtList;
        });
    };
    $scope.initLoad();

    $scope.chooseDistrict = function (districtId, districtName) {
        $scope.districtName = districtName;
        var form = {};
        form['SHOP.DISTRICT_ID'] = districtId;
        shopFactory.getShopListByStrict(form).get({}, function (response) {
            console.log(response);
            $scope.shopList = response.data;
            $scope.shopListLength = response.data.length;
        });
    }
});
