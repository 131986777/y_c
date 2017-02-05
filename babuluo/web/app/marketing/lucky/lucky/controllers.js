angular.module('AndSell.Main').controller('marketing_lucky_lucky_Controller', function ($scope, $state, $stateParams, sysConfigFactory, luckyFactory, modalFactory) {

    modalFactory.setTitle('抽奖');

    modalFactory.setBottom(true);

    $scope.initData = function () {

        $scope.ischoose = false;

        $scope.configMap = new Map();
        sysConfigFactory.getSys({}, function (response) {
            $scope.configMap = response.extraData.configMap;
            //单次积分消耗
            $scope.LUCKY_DRAW_POINT_CONSUME = $scope.configMap["LUCKY_DRAW_POINT_CONSUME"];
            //活动状态
            $scope.LUCKY_DRAW_STATE = $scope.configMap["LUCKY_DRAW_STATE"] == 1;
        });

        $scope.show = false;
        $scope.couponIdList = [];
        $scope.couponMap = new Map();
        luckyFactory.queryPosition({}, function (response) {

            //index对不上
            var luckyMap = {}
            response.data.forEach(function (ele, index) {
                if (ele['LUCKY_DRAW.PRIZE_ID'] != undefined) {
                    $scope.couponIdList.push(ele['LUCKY_DRAW.PRIZE_ID']);
                }
                luckyMap[ele['LUCKY_DRAW.LOCATION'] - 1] = ele;
            });
            $scope.luckListAll = new Array;

            for (var i = 0; i < 8; i++) {
                if (luckyMap[i] != undefined) {
                    luckyMap[i]['IS_PRIZE'] = true;
                    $scope.luckListAll.push(luckyMap[i]);
                } else {
                    $scope.luckListAll.push({'IS_PRIZE': false});
                }
            }
            console.log($scope.luckListAll);

            luckyFactory.getCouponInfo({'COUPON.ID': $scope.couponIdList.toString()}, function (response) {
                response.data.forEach(function (ele) {
                    $scope.couponMap.set(ele['COUPON.ID'], ele);
                });
                $scope.show = true;
            });
        });
    };

    $scope.showSettingModel = function (index) {
        $("#add").modal('show');
        $scope.index = index;
        var item = $scope.luckListAll[index - 1];
        if (item['IS_PRIZE'] != false) {
            $scope.choiceCoupon = $scope.couponMap.get($scope.luckListAll[index
            - 1]['LUCKY_DRAW.PRIZE_ID']);
            $scope.INTRO = $scope.luckListAll[index - 1]['LUCKY_DRAW.INTRO'];
            $scope.NUM = $scope.luckListAll[index - 1]['LUCKY_DRAW.TOTAL_NUM'];
            $scope.PRO = Number($scope.luckListAll[index - 1]['LUCKY_DRAW.PROBILITY']).toFixed(2);
        } else {
            $scope.choiceCoupon = undefined;
            $scope.INTRO = '';
            $scope.NUM = 0;
            $scope.PRO = 0;
        }
    };

    $scope.couponItemSwitch = function (data) {
        $scope.choiceCoupon = data;
    };

    $scope.setPrize = function (index) {
        if ($scope.choiceCoupon == undefined) {
            modalFactory.showShortAlert("请选择优惠券");
            return;
        }
        if ($scope.INTRO == undefined) {
            modalFactory.showShortAlert("请输入说明");
            return;
        }
        if ($scope.NUM == undefined) {
            modalFactory.showShortAlert("请输入优惠券总数");
            return;
        }
        if ($scope.PRO == undefined) {
            modalFactory.showShortAlert("请输入该位置的中奖概率");
            return;
        }
        if ($scope.PRO < 0 || $scope.PRO > 1) {
            modalFactory.showShortAlert("请输入0~1之间 的中奖概率");
            return;
        }
        var form = {};
        form["LUCKY_DRAW.LOCATION"] = index;
        form["LUCKY_DRAW.INTRO"] = $scope.INTRO;
        form["LUCKY_DRAW.PRIZE_ID"] = $scope.choiceCoupon['COUPON.ID'];
        form["LUCKY_DRAW.TOTAL_NUM"] = $scope.NUM;
        form["LUCKY_DRAW.PROBILITY"] = $scope.PRO;
        luckyFactory.setLuckyByLocation(form, function (response) {
            if (response.code == 0 && response.msg == "ok") {
                modalFactory.showShortAlert("配置成功");
                $("#add").modal('hide');
                $scope.initData();
                $scope.clear();
            } else {
                modalFactory.showShortAlert(response.msg);
            }
        });
    };

    $scope.clearPrize = function (index) {
        modalFactory.showAlert("确定将此位置奖品置空？", function () {
            luckyFactory.delLuckyByLocation({"LUCKY_DRAW.LOCATION": index}, function (response) {
                if (response.code == 0 && response.msg == "ok") {
                    modalFactory.showShortAlert("置空成功");
                    $("#add").modal('hide');
                    $scope.initData();
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    $scope.clear = function () {
        $scope.choiceCoupon = undefined;
        $scope.INTRO = '';
        $scope.NUM = 0;
        $scope.PRO = 0;
    }
    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        var configList = [];
        configList.push({
            "SYS_CONFIG.CONFIG_KEY": "LUCKY_DRAW_POINT_CONSUME",
            "SYS_CONFIG.CONFIG_VALUE": $scope.LUCKY_DRAW_POINT_CONSUME
        });
        configList.push({
            "SYS_CONFIG.CONFIG_KEY": "LUCKY_DRAW_STATE",
            "SYS_CONFIG.CONFIG_VALUE": $scope.LUCKY_DRAW_STATE
        });
        configList.forEach(function (ele) {
            sysConfigFactory.modSysByKey(ele, function (response) {
                modalFactory.showShortAlert("修改成功");
                $scope.initData();
            });
        });

    }, function () {
        //取消事件
        $state.go('order/order/orderList//3');
    });

    //数组去重
    function unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
});

