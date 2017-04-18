angular.module('AndSell.H5.Main').controller('pages_groupBuy_groupDetail_Controller', function (productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {
    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var currentGbmGgbId = parseInt(getCookie("CURRENT_GBM_GBG_ID"));
        var gbpPrd = getCookie("GBP_PRD");
        var gbmUserInfo = getCookie("GBM_USER_INFO");
        var gbp = getCookie("GBP");
        var gbm = getCookie("GBM");
        $scope.gbp = JSON.parse(gbp);
        $scope.memberInfoList = JSON.parse(gbmUserInfo);
        $scope.gbpPrd = JSON.parse(gbpPrd);
        $scope.gbmList = JSON.parse(gbm);
        $scope.surplusSize = $scope.gbp['GROUP_BUY_PLAN.SUM_COUNT'];
        $scope.endDate = $scope.gbp['GROUP_BUY_PLAN.END_DATETIME'];
        startWorkerByGbm();
        getCurrentGbgUser(currentGbmGgbId)


    }
    $scope.currentGbgUserList = [];
    function getCurrentGbgUser(gbgId) {
        $scope.gbmList.forEach(function (ele) {
            if (ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'] == gbgId) {
                $scope.currentGbgUserList.push(ele);
                $scope.surplusSize -= 1;
            }
        })
    }

    function initDate() {
        var tempDate = $scope.endDate;
        var yMd = tempDate.split(" ")[0].split("-");
        var Hms = tempDate.split(" ")[1].split(":");
        var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + '00').getTime();
        var now = new Date().getTime();
        if (end < now) {
            document.getElementById("gbpHour" + index).innerHTML = '已'
            document.getElementById("gbpMin" + index).innerHTML = '过'
            document.getElementById("gbpSec" + index).innerHTML = '期'
        } else {
            var time = (end - now) / 1000;
            document.getElementById("gbpHour").innerHTML = parseInt(time / 3600);
            document.getElementById("gbpMin").innerHTML = parseInt(time / 60 - parseInt(time / 3600) * 60);
            document.getElementById("gbpSec").innerHTML = parseInt(time - parseInt(time / 3600) * 3600 - parseInt(time / 60 - parseInt(time / 3600) * 60) * 60);
        }
    }

    /**
     * 开启线程
     * 监听回馈
     */
    var gw;

    function startWorkerByGbm() {
        if (typeof(Worker) !== "undefined") {
            if (typeof(gw) == "undefined") {
                gw = new Worker("/AndSell/h5/pages/home/home_worker.js");
            }
            gw.onmessage = function (event) {
                initDate();
            };
        }
    }

    $scope.$on('$destroy', function () {
        if (undefined != gw)
            gw.terminate() //终止一个worker线程v
    })
});
