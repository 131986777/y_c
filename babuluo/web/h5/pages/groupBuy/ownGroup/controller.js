angular.module('AndSell.H5.Main').controller('pages_groupBuy_ownGroup_Controller', function (groupBuyPlanFactory, groupBuyGroupFactory, groupBuyMemberFactory, productFactory, $interval, $scope, $state, modalFactory, shopFactory) {
    $scope.initPage = function () {
        //获取用户id
        modalFactory.setTitle('我的团购');
        var userId = getCookie("ANDSELLID");
        getGbmListByUserId(userId);
    }


    //根据用户id查询 用户参与团购信息
    $scope.gbmList = [];
    $scope.gbmState = {};
    function getGbmListByUserId(userId) {
        groupBuyMemberFactory.getByUserId({"GROUP_BUY_MEMBER.UID": userId}, function (response) {
            $scope.gbmList = response.data;
            var gbgIds = "";
            $scope.gbmList.forEach(function (ele) {
                if (gbgIds != "") {
                    gbgIds += ",";
                }
                gbgIds += ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'];
            });
            if (gbgIds != "") {
                getGbgListByGbgIds(gbgIds);
            }
        })
    }

    //根据用户团购表中的团表去查询团信息
    $scope.gbgList = [];
    $scope.gbgState = {};
    function getGbgListByGbgIds(gbgIds) {
        groupBuyGroupFactory.getByGbgIds({"GROUP_BUY_GROUP.GROUP_BUY_GROUP_IDS": gbgIds}, function (response) {
            $scope.gbgList = response.data;
            var gbpIds = "";
            $scope.gbgList.forEach(function (ele) {
                $scope.gbgState[ele['GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID']] = ele['GROUP_BUY_GROUP.STATE'];
                if (gbpIds != "") {
                    gbpIds += ",";
                }
                gbpIds += ele['GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID'];
            });
            if (gbpIds != "") {
                getSurplusList();
                getGbpListByGbpIds(gbpIds);
            }
        });
    }

    //根据团规则ids 查询团规则
    $scope.gbpList = [];
    function getGbpListByGbpIds(gbpIds) {
        groupBuyPlanFactory.getByGbpIds({"GROUP_BUY_PLAN.GROUP_BUY_PLAN_IDS": gbpIds}, function (response) {
            $scope.gbpList = response.data;
            var skuIds = "";
            $scope.gbpList.forEach(function (ele) {
                if (skuIds != "") {
                    skuIds += ",";
                }
                skuIds += ele['GROUP_BUY_PLAN.SKU_ID'];
            });
            if (skuIds != "") {
                getRes();
                getPrdListBySkuIds(skuIds);
            }

        });
    }

    //查询还有多少能够满足团购；
    $scope.gbgSurpSizeList = {};
    function getSurplusList() {
        $scope.gbgList.forEach(function (ele) {
            groupBuyMemberFactory.getAllMemberInGbgIds({"GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS": ele['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID']}, function (response) {
                $scope.gbgSurpSizeList[ele['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID']] = response.data.length;
            })
        });
    }

    //请求商品
    $scope.groupPrdMap = {};
    function getPrdListBySkuIds(skuIds) {
        productFactory.getProductSkuBySkuIds({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            response.data.forEach(function (ele) {
                $scope.groupPrdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
            }, function (response) {
                alert("请求商品失败")
            });
        });
    }

    //拼接团购结果
    $scope.gbmRes = [];
    function getRes() {
        $scope.gbmList.forEach(function (gbm) {
            var gbgId = gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'];
            $scope.gbgList.forEach(function (gbg) {
                var gbpId = gbg['GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID']
                if (gbgId == gbg['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID']) {
                    $scope.gbpList.forEach(function (gbp) {
                        if (gbpId == gbp['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID']) {
                            var param = {};
                            param['GBM_ID'] = gbm['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID'];
                            param['GBG_ID'] = gbg['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID'];
                            param['GBP_ID'] = gbp['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'];
                            param['SKU_ID'] = gbp['GROUP_BUY_PLAN.SKU_ID'];
                            param['SURP_SIZE'] = gbp['GROUP_BUY_PLAN.SUM_COUNT'] - $scope.gbgSurpSizeList[gbg['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID']];
                            param['GBG_STAT'] = gbg['GROUP_BUY_GROUP.STATE'];
                            param['END_DATETIME'] = gbp['GROUP_BUY_PLAN.END_DATETIME'];
                            param['MONEY_STATE'] = gbm['GROUP_BUY_MEMBER.MONEY_STATE'];
                            param['ORDER_ID'] = gbm['GROUP_BUY_MEMBER.ORDER_ID'];
                            param['GROUP_PRICE'] = gbp['GROUP_BUY_PLAN.GROUP_PRICE'];

                            $scope.gbmRes.push(param);
                        }
                    })
                }
            })
        });
        startWorkerByGbp();
        console.log($scope.gbmRes)
        $scope.gbmRes.reverse();
    }

    /**
     * 开启线程
     * 监听回馈
     */
    var gw;

    function startWorkerByGbp() {
        if (typeof(Worker) !== "undefined") {
            if (typeof(gw) == "undefined") {
                gw = new Worker("/AndSell/h5/pages/home/home_worker.js");
            }
            gw.onmessage = function (event) {
                $scope.initDataByGroupBuyPlan();
            };
        }
    }

    $scope.$on('$destroy', function () {
        if (undefined != gw)
            gw.terminate() //终止一个worker线程v
    });
    $scope.initDataByGroupBuyPlan = function () {
        $scope.gbmRes.forEach(function (ele, index) {
            if (ele['MONEY_STATE'] == 'WAIT_PAY' || ele['MONEY_STATE'] == 'HAVE_PAY') {
                var tempDate = ele['END_DATETIME'];
                var yMd = tempDate.split(" ")[0].split("-");
                var Hms = tempDate.split(" ")[1].split(":");
                var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + ':00').getTime();
                var now = new Date().getTime();
                if (end < now) {
                    ele['hour'] = '已';
                    ele['min'] = '过';
                    ele['sec'] = '期';
                } else {
                    var time = (end - now) / 1000;
                    ele['hour'] = parseInt(time / 3600);
                    ele['min'] = parseInt(time / 60 - ele['hour'] * 60);
                    ele['sec'] = parseInt(time - ele['hour'] * 3600 - ele['min'] * 60);
                }
                document.getElementById("gbpHour" + index).innerHTML = ele['hour'];
                document.getElementById("gbpMin" + index).innerHTML = ele['min'];
                document.getElementById("gbpSec" + index).innerHTML = ele['sec'];
            }
        })
    }
});
