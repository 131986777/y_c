angular.module('AndSell.Main').controller('shop_shop_shopList_Controller', function ($scope, shopFactory, districtFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('门店管理');

    modalFactory.setBottom(false);

    $scope.hourList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

    $scope.minList = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

    $scope.shopAdd = {};
    $scope.shopEdited = {};

    $scope.bindData = function (response) {
        $scope.shopList = response.data;
        $scope.districtList = response.extraData.districtList;
        $scope.districtList_bak = response.extraData.districtList;
        $scope.changeShop($scope.filter['SHOP.CITY']);
    };
    
    $scope.changeShop = function(city){
    	var disList = new Array();
    	for(var i=0;i<$scope.districtList_bak.length;i++){
    		var item = $scope.districtList_bak[i];
    		if(item['DISTRICT.CITY'] == city){
    			disList.push(item);
    		}
    	}
    	
    	$scope.cuurDistrictList = disList;
    }
    

    $scope.addShopList = function () {

        if ($scope.shopAdd['SHOP.SHOP_NAME']
            == undefined
            || $scope.shopAdd['SHOP.TELEPHONE']
            == undefined
            || $scope.shopAdd['SHOP.DISTRICT_ID']
            == '-1') {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }

        //目前serviceId都设为1
        $scope.shopAdd['SHOP.SERVICE_ID'] = 1;
        //拼接时间
        $scope.shopAdd['SHOP.OPEN_TIME'] = $scope.open_time_hour + ":" + $scope.open_time_min;
        $scope.shopAdd['SHOP.CLOSE_TIME'] = $scope.close_time_hour + ":" + $scope.close_time_min;
        shopFactory.addShopList($scope.shopAdd, function (response) {
            $("#add").modal('hide');
            $scope.clearForm();
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.getShopListById = function (sl) {
        $scope.shopEdited = clone(sl);
        $scope.edit_open_time_hour = $scope.shopEdited['SHOP.OPEN_TIME'].split(":")[0];
        $scope.edit_open_time_min = $scope.shopEdited['SHOP.OPEN_TIME'].split(":")[1];
        $scope.edit_close_time_hour = $scope.shopEdited['SHOP.CLOSE_TIME'].split(":")[0];
        $scope.edit_close_time_min = $scope.shopEdited['SHOP.CLOSE_TIME'].split(":")[1];
    };

    $scope.commitEdit = function () {
        if ($scope.shopEdited['SHOP.SHOP_NAME']
            == undefined
            || $scope.shopEdited['SHOP.TELEPHONE']
            == undefined
            || $scope.shopEdited['SHOP.DISTRICT_ID']
            == '-1') {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }
        //目前serviceId都设为1
        $scope.shopEdited['SHOP.SERVICE_ID'] = 1;
        $scope.shopEdited['SHOP.OPEN_TIME'] = $scope.edit_open_time_hour
            + ":"
            + $scope.edit_open_time_min;
        $scope.shopEdited['SHOP.CLOSE_TIME'] = $scope.edit_close_time_hour
            + ":"
            + $scope.edit_close_time_min;

        shopFactory.modShopListById($scope.shopEdited, function (response) {
            $('#edit').modal('hide');
            modalFactory.showShortAlert('修改成功');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delShopListById = function (sl) {
        if (sl['SHOP.IS_USE'] == "1") {
            modalFactory.showAlert("确定关停门店：［" + sl['SHOP.SHOP_NAME'] + "］?", function () {
                sl['SHOP.IS_USE'] = "-1";
                shopFactory.delById(sl, function (response) {
                    modalFactory.showShortAlert("关停成功");
                });
            });
        } else {
            sl['SHOP.IS_USE'] = "1";
            shopFactory.delById(sl, function (response) {
                modalFactory.showShortAlert("启用成功");
            });
        }
    };

    /**
     * 快速添加区域
     * @param value
     */
    $scope.addDistrictModal = function (value) {
        if (value == "-100") {
            $('#addDistrict').modal('show');
            $scope.shopAdd['SHOP.DISTRICT_ID'] = "-1";
            $scope.shopEdited['SHOP.DISTRICT_ID'] = "-1";
        }
    };

    $scope.addDistrict = function () {

        if ($scope.add['DISTRICT.DISTRICT_NAME']
            == undefined
            || $scope.add['DISTRICT.DISTRICT_NAME']
            == "") {
            modalFactory.showShortAlert("请填写区域名称");
            return
        }
        $scope.add['DISTRICT.SERVICE_ID'] = 1;
        districtFactory.addDistrict($scope.add, function (response) {
            $("#addDistrict").modal('hide');
            modalFactory.showShortAlert('新增成功');
            $scope.$broadcast('pageBar.reload');
            $scope.add['DISTRICT.DISTRICT_NAME'] = "";
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    //用于清除填写的内容
    $scope.clearForm = function () {
        $scope.shopAdd['SHOP.SHOP_NAME'] = undefined;
        $scope.shopAdd['SHOP.TELEPHONE'] = undefined;
        $scope.shopAdd['SHOP.LONGTUDE'] = undefined;
        $scope.shopAdd['SHOP.LATITUDE'] = undefined;
        $scope.shopAdd['SHOP.DISTRICT_ID'] = "-1";
        $scope.open_time_hour = "0";
        $scope.open_time_min = "00";
        $scope.close_time_hour = "0";
        $scope.close_time_min = "00";
        $scope.shopEdited['SHOP.LONGTUDE'] = undefined;
        $scope.shopEdited['SHOP.LATITUDE'] = undefined;
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
        if (sl['SHOP.LONGTUDE'] == undefined && sl['SHOP.LATITUDE'] == undefined) {
            modalFactory.showShortAlert("暂无地图信息");
            return;
        }
        $('#showMap').modal('show');
        var map1 = new AMap.Map('allmap', {
            resizeEnable: true, center: [sl['SHOP.LONGTUDE'], sl['SHOP.LATITUDE']], zoom: 16
        });
        var marker = new AMap.Marker({
            position: map1.getCenter(), draggable: true, cursor: 'move'
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
        $scope.shopAdd['SHOP.LONGTUDE'] = e.lnglat.getLng();
        $scope.shopAdd['SHOP.LATITUDE'] = e.lnglat.getLat();
        $scope.shopEdited['SHOP.LONGTUDE'] = e.lnglat.getLng();
        $scope.shopEdited['SHOP.LATITUDE'] = e.lnglat.getLat();
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

