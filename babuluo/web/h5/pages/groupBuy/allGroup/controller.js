angular.module('AndSell.H5.Main').controller('pages_groupBuy_allGroup_Controller', function (productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {


    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var gbm = getCookie("GBM");
        var gbmUserInfo = getCookie("GBM_USER_INFO");
        var gbmSurpList = getCookie("GBM_SURP_LIST");
        $scope.surplusSize = getCookie("surplusSize");
        $scope.GBP = JSON.parse(getCookie("GBP"));
        $scope.gbmList = JSON.parse(gbm);
        $scope.memberInfoList = JSON.parse(gbmUserInfo);
        $scope.surplusSizeList = JSON.parse(gbmSurpList);
        $scope.showDate = $scope.GBP['GROUP_BUY_PLAN.END_DATETIME'];
        initDate();
    }
    //用户点击去参团
    $scope.goGroupBuy = function (gbm) {
        setCookie("CURRENT_GBM_GBG_ID", gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']);
        $state.go("pages/groupBuy/groupDetail");
    }
    function initDate() {
        var tempDate = $scope.showDate;
        var yMd = tempDate.split(" ")[0].split("-");
        var Hms = tempDate.split(" ")[1].split(":");
        var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + '00').getTime();
        var now = new Date().getTime();
        if (end < now) {
            $scope.showDate = "已";
        } else {
            var time = (end - now) / 1000;
            $scope.showDate = parseInt(time / 3600) + "时" + parseInt(time / 60 - parseInt(time / 3600) * 60) +"分";
        }

    }
});
