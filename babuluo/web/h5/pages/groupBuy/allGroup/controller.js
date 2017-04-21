angular.module('AndSell.H5.Main').controller('pages_groupBuy_allGroup_Controller', function (groupBuyGroupFactory, groupBuyMemberFactory, productFactory, $interval, $scope, $state, weUI, modalFactory) {


    $scope.initPage = function () {
        modalFactory.setBottom(false);
        $scope.GBP = JSON.parse(getCookie("GBP"));
        $scope.surplusSize = $scope.GBP['GROUP_BUY_PLAN.SUM_COUNT'];
        $scope.showDate = $scope.GBP['GROUP_BUY_PLAN.END_DATETIME'];
        getGbgList($scope.GBP['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID']);
        initDate();
    }
    //用户点击去参团
    $scope.goGroupBuy = function (gbm) {
        $state.go("pages/groupBuy/groupDetail", {GBG_ID: gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']});
    }
    $scope.gbgList = [];
    function getGbgList(gbpId) {
        groupBuyGroupFactory.getAllGroupByGbpId({"GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID": gbpId}, function (response) {
            $scope.gbgList = response.data;
            var ids = "";
            $scope.gbgList.forEach(function (ele) {
                if (ids != "") {
                    ids += ",";
                }

                ids += ele['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID'];
            })
            if (ids != "") {
                getGbmList(ids);
            }
        });
    }

    $scope.gbmList = [];
    function getGbmList(gbpIds) {
        groupBuyMemberFactory.getAllMemberInGbgIds({"GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS": gbpIds}, function (response) {
            $scope.gbmList = response.data;
            getSurplusSizeList();
        })
    }

    //获取各个团剩余参团人数
    $scope.surplusSizeList = {};
    function getSurplusSizeList() {
        $scope.gbmList.forEach(function (ele) {
            if ($scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] == undefined) {
                $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] = 1;
            } else {
                $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] += 1;
            }
        });
    }

    function initDate() {
        var tempDate = $scope.showDate;
        var yMd = tempDate.split(" ")[0].split("-");
        var Hms = tempDate.split(" ")[1].split(":");
        var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + ':00').getTime();
        var now = new Date().getTime();
        if (end < now) {
            $scope.showDate = "已";
        } else {
            var time = (end - now) / 1000;
            $scope.showDate = parseInt(time / 3600) + "时" + parseInt(time / 60 - parseInt(time / 3600) * 60) + "分";
        }

    }
});
