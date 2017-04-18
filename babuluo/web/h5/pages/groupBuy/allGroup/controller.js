angular.module('AndSell.H5.Main').controller('pages_groupBuy_allGroup_Controller', function (productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {


    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var gbm = getCookie("GBM");
        var gbmUserInfo = getCookie("GBM_USER_INFO");
        var gbmSurpList = getCookie("GBM_SURP_LIST");
        $scope.surplusSize = getCookie("surplusSize");
        $scope.gbmList = JSON.parse(gbm);
        $scope.memberInfoList = JSON.parse(gbmUserInfo);
        $scope.surplusSizeList = JSON.parse(gbmSurpList);
    }
    //用户点击去参团
    $scope.goGroupBuy = function (gbm) {
        setCookie("CURRENT_GBM_GBG_ID", gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']);
        $state.go("pages/groupBuy/groupDetail");
    }
});
