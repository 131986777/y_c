angular.module('AndSell.H5.Main').controller('pages_account_lucky_Controller', function ($scope, $state, $stateParams, eventFactory, modalFactory, weUI) {

    modalFactory.setTitle('抽奖');
    modalFactory.setBottom(false);

    var lotteryPlugin = (function ($) {
        var lottery = {
            index: -1, //当前转动到哪个位置，起点位置
            count: 0, //总共有多少个位置
            timer: 0, //setTimeout的ID，用clearTimeout清除
            speed: 10, //初始转动速度
            times: 0, //转动次数
            cycle: 5, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1, //中奖位置
            click: true,
            circleFlag: undefined,
            init: function (id) {
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    var self = this == lottery ? this : lottery;
                    $lottery = $("#" + id);
                    $units = $lottery.find(".lottery-unit");
                    self.obj = $lottery;
                    self.count = $units.length;
                    $lottery.find(".lottery-unit-" + this.index).addClass("active");
                }
                ;
            },
            roll: function () {
                var self = this == lottery ? this : lottery;
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                ;
                $(lottery).find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            },
            stop: function (index, callback) {
                var self = this == lottery ? this : lottery;
                self.prize = index;
                self.stopCallBack = callback;
                return false;
            },
            stopCallBack: null,
        };

        function roll() {
            lottery.times += 1;
            lottery.timer = setInterval(function () {
                if (lottery.prize >= 0) {
                    //                    lottery.prize = -1;
                    lottery.roll();
                    if (lottery.index + 1 === lottery.prize) {
                        lottery.circleFlag = !lottery.circleFlag;
                    }
                    if (lottery.circleFlag === false) {
                        clearInterval(lottery.timer);
                        lottery.times = 0;
                        lottery.click = true;
                        lottery.prize = -1;
                        lottery.circleFlag = undefined;
                        if (lottery.stopCallBack) {
                            lottery.stopCallBack();
                        }
                    }
                } else {
                    lottery.roll();
                    lottery.times++;

                }
            }, lottery.speed);
            return false;
        }

        function start() {
            if (!lottery.click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                return false;
            } else {
                lottery.speed = 80;
                lottery.click = false; //一次抽奖完成后，设置click为true，可继续抽奖
                roll(); //转圈过程不响应click事件，会将click置为false
                $scope.queryLucky();
                return false;
            }
        }

        return {
            init: lottery.init,
            start: start,
            stop: lottery.stop,
        }
    })(jQuery);

    lotteryPlugin.init('lottery');
    $("#lottery a").click(function () {
        lotteryPlugin.start();
        //
    });

    //$scope.start= function () {
    //    lotteryPlugin.start();
    //}
    //

    $scope.initData = function () {
        //没有中奖的区域
        $scope.unLuckyPosition = [1, 2, 3, 4, 5, 6, 7, 8];
        $scope.couponIdList = [];
        $scope.couponMap = Map();
        eventFactory.queryPosition({}, function (response) {
            console.log(response.data);
            $scope.luckListAll = response.data;
            response.data.forEach(function (ele) {
                $scope.unLuckyPosition.remove(Number(ele['LUCKY_DRAW.LOCATION']));
                $scope.couponIdList.push(ele['LUCKY_DRAW.PRIZE_ID']);
            });
            $scope.couponIdList = unique($scope.couponIdList);
            eventFactory.getCouponInfo({'COUPON.ID': $scope.couponIdList}, function (response) {
                response.data.forEach(function (ele) {
                    $scope.couponMap.set(ele['COUPON.ID'], ele);
                });
            });
        });
        console.log($scope.couponMap);
    };

    $scope.getInfo = function (i) {
        //得到优惠券信息
        $scope.couponMap.get($scope.luckListAll[i]['LUCKY_DRAW.PRIZE_ID']);
    };

    $scope.queryLucky = function () {
        eventFactory.queryLucky({'USER_ID': getCookie('ANDSELLID')}, function (response) {
            if (response.code == 0 && response.msg == "ok") {
                var position = response.extraData.POSI;
                if (position != 0) {
                    $scope.stop(Number(position));
                    setTimeout(function () {
                        alert("恭喜您中奖了！奖品为：" + $scope.luckListAll[position]['LUCKY_DRAW.INTRO'] + "！");
                    }, 2500);
                } else {
                    var random = getRandom($scope.unLuckyPosition);
                    $scope.stop(random);
                    setTimeout(function () {
                        alert("很遗憾您没有中奖。");
                    }, 2500);
                }
            }
        });
    };

    $scope.stop = function (position) {
        setTimeout(function () {
            lotteryPlugin.stop(position, function () {
                console.log("停在了" + position);
            });
        }, 1000);
    }

    function getRandom(array) {
        var n = Math.floor(Math.random() * array.length + 1) - 1;
        return array[n];
    }

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

