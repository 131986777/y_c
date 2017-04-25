angular.module('AndSell.H5.Main').controller('pages_groupBuy_groupDetail_Controller', function (groupBuyPlanFactory, groupBuyMemberFactory, $stateParams, productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {
    $scope.initPage = function () {
        modalFactory.setBottom(false);
        getCurrentGbgUser($stateParams.GBG_ID);
        getGbpEntity($stateParams.GBP_ID);
        getPrdEntity($stateParams.PRD_ID);
        $scope.sumCount = getCookie("SUM_COUNT") == null ? 1 : parseInt(getCookie("SUM_COUNT"));


    }
    $scope.gbpPrd = '';
    function getPrdEntity(prdId) {
        productFactory.getProductSkuBySkuIds({"SHOP_PRODUCT_SKU.SKU_IDS": prdId}, function (response) {
            $scope.gbpPrd = response.data[0];
        })
    }

    $scope.gbp = '';
    function getGbpEntity(gbpId) {
        groupBuyPlanFactory.getByGbpIds({'GROUP_BUY_PLAN.GROUP_BUY_PLAN_IDS': gbpId}, function (response) {
            $scope.gbp = response.data[0];
            $scope.surplusSize = $scope.gbp['GROUP_BUY_PLAN.SUM_COUNT'];
            $scope.endDate = $scope.gbp['GROUP_BUY_PLAN.END_DATETIME'];
            $scope.sumPrice = $scope.gbp['GROUP_BUY_PLAN.GROUP_PRICE'] * $scope.sumCount;
            startWorkerByGbm();
        })
    }

    $scope.currentGbgUserList = [];
    function getCurrentGbgUser(gbgId) {
        groupBuyMemberFactory.getAllMemberInGbgIds({'GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS': gbgId}, function (response) {
            $scope.gbmList = response.data;
            $scope.gbmList.forEach(function (ele) {
                if (ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'] == gbgId) {
                    $scope.currentGbgUserList.push(ele);
                    $scope.surplusSize -= 1;
                }
            })
        })
    }

    function initDate() {
        var tempDate = $scope.endDate;
        var yMd = tempDate.split(" ")[0].split("-");
        var Hms = tempDate.split(" ")[1].split(":");
        var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + ':00').getTime();
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


    $scope.downCount = function () {
        $scope.sumCount -= 1;
        $scope.sumPrice = $scope.sumCount * $scope.gbp['GROUP_BUY_PLAN.GROUP_PRICE'];
        if ($scope.sumCount <= 0) {
            $scope.sumPrice = $scope.gbp['GROUP_BUY_PLAN.GROUP_PRICE'];
            $scope.sumCount = 1;
            setCookieSumCount(1);
        }
    }
    $scope.upCount = function () {
        $scope.sumCount += 1;
        setCookieSumCount($scope.sumCount);
        $scope.sumPrice = $scope.sumCount * $scope.gbp['GROUP_BUY_PLAN.GROUP_PRICE'];
    }

    function setCookieSumCount(count) {
        removeCookie("SUM_COUNT");
        setCookie("SUM_COUNT", count);
    }

    $scope.goGroup = function () {
        if($scope.surplusSize == 0){
            weUI.toast.info("团购已满员。");
            return;
        }
        var param = {
            SKU_ID: $scope.gbp['GROUP_BUY_PLAN.SKU_ID'].toString(),
            SUM_COUNT: $scope.sumCount.toString(),
            GBG_ID: $stateParams.GBG_ID
        }
        $state.go("pages/order/addGroupBuy", param);
    }
});
