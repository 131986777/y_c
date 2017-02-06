angular.module('AndSell.H5.Main').controller('pages_shopLbs_Controller', function ($scope, lbsFactory, modalFactory, weUI) {

    modalFactory.setTitle('门店地图');
    modalFactory.setBottom(false);

    $scope.shopMarkers = [];

    $scope.initData = function () {

        lbsFactory.getShopList({}, function (response) {
            weUI.toast.showLoading('正在加载');

            response.data.forEach(function (ele) {
                if (ele['SHOP.LONGTUDE'] != undefined && ele['SHOP.LATITUDE'] != undefined) {
                    $scope.shop = {};
                    $scope.shop['icon'] = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
                    $scope.shop['position'] = [ele['SHOP.LONGTUDE'], ele['SHOP.LATITUDE']];
                    $scope.shop['name'] = ele['SHOP.SHOP_NAME'];
                    $scope.shopMarkers.push($scope.shop);
                }
            });
            $scope.loadMap();
            weUI.toast.hideLoading();
        }, function (response) {
            weUI.toast.hideLoading();
            weUI.toast.error(response.msg);
        });
    };

    $scope.loadMap = function () {
        $scope.map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 13
        });
        $scope.map.clearMap();  // 清除地图覆盖物
        var geolocation;
        $scope.map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            $scope.map.addControl(geolocation);
            geolocation.getCurrentPosition();
        });
        if ($scope.shopMarkers.length > 0) {
            var markers = $scope.shopMarkers;
            // 添加点到地图上
            markers.forEach(function (ele) {
                var marker = new AMap.Marker({
                    map: $scope.map,
                    icon: ele.icon,
                    position: [ele.position[0], ele.position[1]],
                    offset: new AMap.Pixel(-12, -36)
                });
                marker.setMap($scope.map);
                marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                    content: ele.name
                });
                // marker.on('click', function (e) {
                // });
            });
        } else {
            weUI.toast.error("暂无门店信息");
        }
        // 添加事件监听, 使地图自适应显示到合适的范围
        AMap.event.addDomListener(document.getElementById('setFitView'), 'click', function () {
            var newCenter = $scope.map.setFitView();
        });
    }
});