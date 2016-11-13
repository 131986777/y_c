angular.module('AndSell.H5.Main').controller('pages_coupon_list_Controller', function ($scope, $state, couponFactory, personalFactory, modalFactory) {

    modalFactory.setTitle('领券中心');
    // modalFactory.setBottom(true);
    $scope.couponSumMap = new Map();

    $scope.initData = function () {
        couponFactory.getCouponList({}, function (response) {
            $scope.couponList = response.data;
        });
        $scope.saveCouponNum();

    }

    $scope.saveCouponNum = function () {
        var member = {};
        member['MEMBER_COUPON.USER_ID'] = 1000;
        personalFactory.getCouponListByUser(member, function (response) {
            var memberCouponList = response.data;
            memberCouponList.forEach(function (ele) {
                $scope.couponSumMap.set(ele['MEMBER_COUPON.COUPON_ID'], ele['.NUM_COUPON']);  //将客户所拥有的各优惠券的数量存在map中
            });

        });
    }

    $scope.initData();

    $scope.detailClick = function (item) {
        // $scope.detail = item;
        $scope.detailArray = item.split("<br>");

    }

    $scope.add = {};
    $scope.add['MEMBER_COUPON.COUPON_ID'] = '';
    $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = '';

    /**
     * 领取优惠券
     */
    $scope.addCoupon = function (item) {
        $scope.coupon = item;

        var sum = $scope.couponSumMap.get($scope.coupon['COUPON.ID']);  //客户所拥有的当前优惠券的数量
        var count = $scope.coupon['COUPON.RULE_INFO']['COUPON_RULE.EACH_MEMBER_LIMIT'];  //该优惠券所允许的每人领取的最大数量
        console.log(sum);
        console.log(count);
        if (sum != undefined && sum >= count) {
            weUI.toast.info('该优惠券的领取数量已经达到了上限，换张再领吧！');
        } else {
            $scope.add['MEMBER_COUPON.COUPON_ID'] = $scope.coupon['COUPON.ID'];
            $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = $scope.coupon['COUPON.END_DATETIME'];
            $scope.add['MEMBER_COUPON.USER_ID'] = 1000;

            $scope.coupon['COUPON.NUM_LEFT'] = $scope.coupon['COUPON.NUM_LEFT'] - 1;

            couponFactory.addMemberCoupon($scope.add, function (response) {
                couponFactory.modCouponLeft($scope.coupon, function (response) {  //修改优惠券剩余数量

                    weUI.toast.ok('领取成功!')
                    $scope.initData();
                    $scope.add = '';

                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });

        }
        ;

        $scope.parseArray = function (data) {
            if (data != undefined) {
                data = data.split(',');
            }

            return data;
        }

    }
});
