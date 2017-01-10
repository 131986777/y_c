angular.module('AndSell.H5.Main').controller('pages_shop_Controller', function ($scope, $state, $stateParams, shopFactory, modalFactory, weUI) {

    modalFactory.setTitle('门店列表');
    modalFactory.setBottom(false);

    $scope.districtName = "全部区域";
    $scope.currentDistrictName = '全部区域';
    $scope.initLoad = function () {
        $scope.filter = {};
        $scope.getData();
    };

    $scope.getData = function () {
        weUI.toast.showLoading('正在加载');
        shopFactory.getShopList($scope.filter, function (response) {
            var list = new Array;
            response.data.forEach(function (ele) {
                if (ele['SHOP.SHOP_ID'] != '100002' && ele['SHOP.SHOP_ID'] != '111111' && ele['SHOP.SHOP_ID'] != '0') {
                    list.push(ele);
                }
            });
            $scope.shopListLength = response.data.length;
            $scope.districtList = response.extraData.districtList;
            var shopMap = new Map();
            list.forEach(function (ele) {
                shopMap.set(ele['SHOP.SHOP_ID'], ele);
            });
            $scope.shopList = sorting(list);
            $scope.shopMap = shopMap;
            $scope.getRecentShopList();
            weUI.toast.hideLoading();
        }, function (response) {
            weUI.toast.hideLoading();
            weUI.toast.error(response.msg);
        });

    };

    $scope.getRecentShopList = function () {
        var recentShopList = new Array;
        $scope.cookieShopIdList = new Array;
        if (getCookie('recentShopList') != undefined) {
            $scope.cookieShopIdList = getCookie('recentShopList').split(',');
        }
        $scope.cookieShopIdList.forEach(function (ele) {
            if ($scope.shopMap.get(ele) != undefined) {
                recentShopList.push($scope.shopMap.get(ele));
            }
        });
        $scope.recentShopList = recentShopList.reverse();
    }

    $scope.initLoad();

    $scope.shopSelect = function (shop) {
        setCookie('currentShop', shop['SHOP.SHOP_ID']);
        if ($scope.cookieShopIdList.indexOf(shop['SHOP.SHOP_ID']) >= 0) {
            $scope.cookieShopIdList.remove(shop['SHOP.SHOP_ID']);
        }
        if ($scope.cookieShopIdList.length >= 3) {
            $scope.cookieShopIdList.splice(0, 1);
        }
        $scope.cookieShopIdList.push(shop['SHOP.SHOP_ID']);
        setCookie('recentShopList', $scope.cookieShopIdList.toString());

        shopFactory.getShopById({'SHOP.SHOP_ID': shop['SHOP.SHOP_ID']}, function (response) {
            $scope.shopInfo = response.data[0];
            if ($scope.shopInfo != undefined) {
                setCookie('currentShopInfo', JSON.stringify($scope.shopInfo));
            }

            if ($stateParams.FROM == '') {
                $state.go('pages/home');
            } else {
                window.location.href = $stateParams.FROM;
            }
        });
    }

    $scope.chooseDistrict = function (districtId, districtName) {
        $scope.districtName = districtName;
        $scope.filter['SHOP.DISTRICT_ID'] = districtId;
        $scope.getData();
        $scope.currentDistrictName = districtName;
        // shopFactory.getShopList(form, function (response) {
        //     $scope.shopList = response.data;
        //     $scope.shopListLength = response.data.length;
        // });
    };

    $scope.allDistrict = function (districtName) {
        $scope.currentDistrictName = '全部区域';
        $scope.districtName = districtName;
        $scope.filter['SHOP.DISTRICT_ID'] = '';
        $scope.getData();
    };

    /**
     * approx distance between two points on earth ellipsoid
     * @param {Object} lat1
     * @param {Object} lng1
     * @param {Object} lat2
     * @param {Object} lng2
     */
    $scope.getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2)
            * Math.sin(dLat / 2)
            + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat2))
            * Math.sin(dLon / 2)
            * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d.toFixed(2);
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    var options = {
        enableHighAccuracy: true, timeout: 5000, maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
        $scope.coord = crd;
    };

    function error(err) {
        console.log('ERROR(' + err.code + '): ' + err.message);
    };

    //调用方法获取地理位置的信息
    navigator.geolocation.getCurrentPosition(success, error, options);

    //排序方法
    function sorting(arr) {
        var arr1 = [];
        var arr2 = [];
        var i = 0;
        var j = 0;
        arr.forEach(function (ele) {
            if (ele['SHOP.LATITUDE'] == null && ele['SHOP.LONGTUDE'] == null) {
                arr2.push(ele);
            } else {
                arr1.push(ele);
            }
        });

        return quickSort(arr1).concat(arr2);
    }

    var i = 1;

    //快速排序
    var quickSort = function (arr) {
        if (arr.length <= 1) {
            return arr;
        }

        var pivotIndex = Math.floor(arr.length / 2);
        var pivot = arr.splice(pivotIndex, 1);//基准量
        var left = [];//左子集
        var right = [];//右子集
        if ($scope.coord != undefined) {
            arr.forEach(function (ele) {
                eles = $scope.getDistanceFromLatLonInKm($scope.coord.latitude, $scope.coord.longitude, ele['SHOP.LATITUDE'], ele['SHOP.LONGTUDE']);
                temp = $scope.getDistanceFromLatLonInKm($scope.coord.latitude, $scope.coord.longitude, pivot[0]['SHOP.LATITUDE'], pivot[0]['SHOP.LONGTUDE']);
                if (eval(eles) < eval(temp)) {
                    left.push(ele);
                } else {
                    right.push(ele);
                }
            });
            i++;
        }
        return quickSort(left).concat(pivot, quickSort(right));
    };
});