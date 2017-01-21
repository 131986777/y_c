angular.module('AndSell.Main').controller('marketing_lucky_lucky_Controller', function ($scope, $state, $stateParams, sysConfigFactory, luckyFactory, modalFactory) {

    modalFactory.setTitle('抽奖');

    modalFactory.setBottom(true);

    // var lotteryPlugin = (function ($) {
    //     var lottery = {
    //         index: -1, //当前转动到哪个位置，起点位置
    //         count: 0, //总共有多少个位置
    //         timer: 0, //setTimeout的ID，用clearTimeout清除
    //         speed: 10, //初始转动速度
    //         times: 0, //转动次数
    //         cycle: 5, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    //         prize: -1, //中奖位置
    //         click: true,
    //         circleFlag: undefined,
    //         init: function (id) {
    //             if ($("#" + id).find(".lottery-unit").length > 0) {
    //                 var self = this == lottery ? this : lottery;
    //                 $lottery = $("#" + id);
    //                 $units = $lottery.find(".lottery-unit");
    //                 self.obj = $lottery;
    //                 self.count = $units.length;
    //                 $lottery.find(".lottery-unit-" + this.index).addClass("active");
    //             }
    //             ;
    //         },
    //         roll: function () {
    //             var self = this == lottery ? this : lottery;
    //             var index = this.index;
    //             var count = this.count;
    //             var lottery = this.obj;
    //             $(lottery).find(".lottery-unit-" + index).removeClass("active");
    //             index += 1;
    //             if (index > count - 1) {
    //                 index = 0;
    //             }
    //             ;
    //             $(lottery).find(".lottery-unit-" + index).addClass("active");
    //             this.index = index;
    //             return false;
    //         },
    //         stop: function (index, callback) {
    //             var self = this == lottery ? this : lottery;
    //             self.prize = index;
    //             self.stopCallBack = callback;
    //             return false;
    //         },
    //         stopCallBack: null,
    //     };
    //
    //     function roll() {
    //         lottery.times += 1;
    //         lottery.timer = setInterval(function () {
    //             if (lottery.prize >= 0) {
    //                 //                    lottery.prize = -1;
    //                 lottery.roll();
    //                 if (lottery.index + 1 === lottery.prize) {
    //                     lottery.circleFlag = !lottery.circleFlag;
    //                 }
    //                 if (lottery.circleFlag === false) {
    //                     clearInterval(lottery.timer);
    //                     lottery.times = 0;
    //                     lottery.click = true;
    //                     lottery.prize = -1;
    //                     lottery.circleFlag = undefined;
    //                     if (lottery.stopCallBack) {
    //                         lottery.stopCallBack();
    //                     }
    //                 }
    //             } else {
    //                 lottery.roll();
    //                 lottery.times++;
    //
    //             }
    //         }, lottery.speed);
    //         return false;
    //     }
    //
    //     function start() {
    //         if (!lottery.click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
    //             return false;
    //         } else {
    //             lottery.speed = 80;
    //             lottery.click = false; //一次抽奖完成后，设置click为true，可继续抽奖
    //             roll(); //转圈过程不响应click事件，会将click置为false
    //             $scope.queryLucky();
    //             return false;
    //         }
    //     }
    //
    //     return {
    //         init: lottery.init,
    //         start: start,
    //         stop: lottery.stop,
    //     }
    // })(jQuery);
    //
    // lotteryPlugin.init('lottery');
    // $("#lottery a").click(function () {
    //     lotteryPlugin.start();
    //     //
    // });
    //
    // $scope.start= function () {
    //    lotteryPlugin.start();
    // }

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
            $scope.luckListAll = response.data;
            console.log($scope.luckListAll);
            response.data.forEach(function (ele) {
                if (ele['LUCKY_DRAW.PRIZE_ID'] != undefined) {
                    $scope.couponIdList.push(ele['LUCKY_DRAW.PRIZE_ID']);
                }
            });
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
        if (item != undefined) {
            $scope.choiceCoupon = $scope.couponMap.get($scope.luckListAll[index - 1]['LUCKY_DRAW.PRIZE_ID']);
            $scope.INTRO = $scope.luckListAll[index - 1]['LUCKY_DRAW.INTRO'];
            $scope.NUM = $scope.luckListAll[index - 1]['LUCKY_DRAW.TOTAL_NUM'];
            $scope.PRO = Number($scope.luckListAll[index - 1]['LUCKY_DRAW.PROBILITY']).toFixed(2);
        } else {
            $scope.choiceCoupon = undefined;
            $scope.INTRO = undefined;
            $scope.NUM = undefined;
            $scope.PRO = undefined;
        }
    };

    $scope.couponItemSwitch = function (data) {
        $scope.choiceCoupon = data;
    };

    $scope.setPrize = function (index) {
        if ($scope.choiceCoupon==undefined){
            modalFactory.showShortAlert("请选择优惠券");
            return;
        }
        if ($scope.INTRO==undefined){
            modalFactory.showShortAlert("请输入说明");
            return;
        }
        if ($scope.NUM==undefined){
            modalFactory.showShortAlert("请输入优惠券总数");
            return;
        }
        if ($scope.PRO==undefined){
            modalFactory.showShortAlert("请输入该位置的中奖概率");
            return;
        }
        if ($scope.PRO<0||$scope.PRO>1){
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
        $scope.INTRO = undefined;
        $scope.NUM = undefined;
        $scope.PRO = undefined;
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
            });
        });
        modalFactory.showShortAlert("修改成功");
        $scope.initData();
    }, function () {
        //取消事件
        $state.go('order/order/orderList//3');
    });


    //数组去重
    function unique(arr) {
        var result = [],
            hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
});

