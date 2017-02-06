angular.module('AndSell.H5.Main').controller('pages_shopNavigation_Controller', function ($scope,$state, $stateParams, lbsFactory, modalFactory, weUI) {

    modalFactory.setTitle('门店导航');
    modalFactory.setBottom(false);

    var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [$stateParams.F_LNG, $stateParams.F_LAT],//地图中心点
        zoom: 13 //地图显示的缩放级别
    });
    //步行导航
    var walking = new AMap.Walking({
        map: map
    });
    //根据起终点坐标规划步行路线
    console.log($stateParams);
    walking.search([$stateParams.F_LNG, $stateParams.F_LAT], [$stateParams.T_LNG, $stateParams.T_LAT]);
});