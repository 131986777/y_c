AndSellMainModule.controller('shopListController', function ($scope, shopFactory, districtFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('门店管理');

    modalFactory.setBottom(false);

    $scope.hourList = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8",
        "9", "10", "11", "12", "13", "14", "15", "16",
        "17", "18", "19", "20", "21", "22", "23"
    ];

    $scope.minList = [
        "00", "05", "10", "15",
        "20", "25", "30", "35",
        "40", "45", "50", "55"
    ];

    $scope.shopAdd = {};
    $scope.shopEdited = {};
    $scope.shopFilter = {};

    $scope.initLoad = function () {

        $scope.deferLoad = $q.defer();
        $scope.districtMap = new Map;

        $scope.loadDistrict();
        $scope.loadShopList();

    };

    $scope.loadDistrict = function () {
        var form = {};
        //目前serviceId都设为1
        form['district.service_id'] = 1;

        districtFactory.getDistrictList(form).get({}, function (response) {
            console.log(response);
            $scope.districtList = response.data;
            $scope.districtList.forEach(function (ele) {
                $scope.districtMap.set(ele['district.DISTRICT_ID'], ele['district.DISTRICT_NAME']);
            });
            $scope.deferLoad.resolve(response);
        }, null);
    };

    $scope.loadShopList = function () {
        var form = {};
        //目前serviceId都设为1
        form['shop.SERVICE_ID'] = 1;
        $scope.promiseAll = $q.all([$scope.deferLoad.promise]);

        $scope.promiseAll.then(function () {
            shopFactory.getShopList(form).get({}, function (response) {
                console.log(response);
                $scope.shopList = response.data;
            });
        });
    };

    $scope.initLoad();

    //根据区域筛选门店
    $scope.filterShop = function () {
        if ($scope.shopFilter['shop.DISTRICT_ID'] == "-1") {
            $scope.loadShopList();
            return;
        }
        //目前serviceId都设为1
        $scope.shopFilter['shop.SERVICE_ID'] = 1;
        $scope.promiseAll = $q.all([$scope.deferLoad.promise]);

        $scope.promiseAll.then(function () {
            shopFactory.getShopListByDistrictId($scope.shopFilter).get({}, function (response) {
                console.log(response);
                $scope.shopList = response.data;
            });
        });
    };

    $scope.addShopList = function () {

        if ($scope.shopAdd['shop.SHOP_NAME'] == undefined || $scope.shopAdd['shop.TELEPHONE'] == undefined || $scope.shopAdd['shop.DISTRICT_ID'] == '-1') {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }

        //目前serviceId都设为1
        $scope.shopAdd['shop.SERVICE_ID'] = 1;
        //拼接时间
        $scope.shopAdd['shop.OPEN_TIME'] = $scope.open_time_hour + ":" + $scope.open_time_min;
        $scope.shopAdd['shop.CLOSE_TIME'] = $scope.close_time_hour + ":" + $scope.close_time_min;
        shopFactory.addShopList($scope.shopAdd).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#add").modal('hide');
                $scope.clearForm();
                $scope.initLoad();
            }
        });
    };

    $scope.getShopListById = function (sl) {
        console.log(sl);
        $scope.shopEdited = clone(sl);
        $scope.edit_open_time_hour = $scope.shopEdited['shop.OPEN_TIME'].split(":")[0];
        $scope.edit_open_time_min = $scope.shopEdited['shop.OPEN_TIME'].split(":")[1];
        $scope.edit_close_time_hour = $scope.shopEdited['shop.CLOSE_TIME'].split(":")[0];
        $scope.edit_close_time_min = $scope.shopEdited['shop.CLOSE_TIME'].split(":")[1];
    };

    $scope.commitEdit = function () {
        if ($scope.shopEdited['shop.SHOP_NAME'] == undefined || $scope.shopEdited['shop.TELEPHONE'] == undefined || $scope.shopEdited['shop.DISTRICT_ID'] == '-1') {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }
        //目前serviceId都设为1
        $scope.shopEdited['shop.SERVICE_ID'] = 1;
        $scope.shopEdited['shop.OPEN_TIME'] = $scope.edit_open_time_hour + ":" + $scope.edit_open_time_min;
        $scope.shopEdited['shop.CLOSE_TIME'] = $scope.edit_close_time_hour + ":" + $scope.edit_close_time_min;

        shopFactory.modShopListById($scope.shopEdited).get({}, function (response) {
            if (response.extraData.state == 'true') {
                $('#edit').modal('hide');
                $scope.initLoad();
            } else {
                modalFactory.showShortAlert(response.msg);
            }
        });
    };

    $scope.delShopListById = function (sl) {
        modalFactory.showAlert("确定删除门店：［" + sl['shop.SHOP_NAME'] + "］?", function () {
            shopFactory.delById(sl).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.initLoad();
                }
            });
        });
    };

    /**
     * 快速添加区域
     * @param value
     */
    $scope.addDistrictModal = function (value) {
        if (value == "-100") {
            $('#addDistrict').modal('show');
            $scope.shopAdd['shop.DISTRICT_ID'] = "-1";
            $scope.shopEdited['shop.DISTRICT_ID'] = "-1";
        }
    };

    $scope.addDistrict = function () {

        if ($scope.add['district.DISTRICT_NAME'] == undefined || $scope.add['district.DISTRICT_NAME'] == "") {
            modalFactory.showShortAlert("请填写区域名称");
            return
        }
        $scope.add['district.SERVICE_ID'] = 1;
        districtFactory.addDistrict($scope.add).get({}, function (response) {
            $("#addDistrict").modal('hide');
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.initLoad();
                $scope.add['district.DISTRICT_NAME'] = "";
            }
        });
    };


    //用于清除填写的内容
    $scope.clearForm = function () {
        $scope.shopAdd['shop.SHOP_NAME'] = undefined;
        $scope.shopAdd['shop.TELEPHONE'] = undefined;
        $scope.shopAdd['shop.LONGTUDE'] = undefined;
        $scope.shopAdd['shop.LATITUDE'] = undefined;
        $scope.shopAdd['shop.DISTRICT_ID'] = "-1";
        $scope.open_time_hour = "0";
        $scope.open_time_min = "00";
        $scope.close_time_hour = "0";
        $scope.close_time_min = "00";
        $scope.shopEdited['shop.LONGTUDE'] = undefined;
        $scope.shopEdited['shop.LATITUDE'] = undefined;
    };

    //用于清除地图的内容
    $scope.clearMap = function () {
        document.getElementById("tipinput").value = null;
        document.getElementById("lnglat").value = null;
    };

    // ---------------------------------地图API功能------------------------------------
    /**
     通过数据库中读取的经纬度信息，在地图上显示
     */
    // 用经纬度设置地图中心点
    $scope.showMap = function (sl) {
        if (sl['shop.LONGTUDE'] == undefined && sl['shop.LATITUDE'] == undefined) {
            modalFactory.showShortAlert("暂无地图信息");
            return;
        }
        $('#showMap').modal('show');
        var map1 = new AMap.Map('allmap', {
            resizeEnable: true,
            center: [sl['shop.LONGTUDE'], sl['shop.LATITUDE']],
            zoom: 16
        });
        var marker = new AMap.Marker({
            position: map1.getCenter(),
            draggable: true,
            cursor: 'move'
        });
        marker.setMap(map1);
        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');
    };

    /**
     新增门店时在地图上选点，标记门店的地理位置
     */


    var map = new AMap.Map("container", {
        resizeEnable: true
    });

    //为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on('click', function (e) {
        document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
        $scope.shopAdd['shop.LONGTUDE'] = e.lnglat.getLng();
        $scope.shopAdd['shop.LATITUDE'] = e.lnglat.getLat();
        $scope.shopEdited['shop.LONGTUDE'] = e.lnglat.getLng();
        $scope.shopEdited['shop.LATITUDE'] = e.lnglat.getLat();
    });
    var auto = new AMap.Autocomplete({
        input: "tipinput"
    });

    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
    }

    window.onload = function () {
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
        if (location.href.indexOf('&guide=1') !== -1) {
            map.setStatus({scrollWheel: false})
        }
    };


    $scope.choosePoint = function () {

        $('#choosePoint').modal('show');
    };
});

