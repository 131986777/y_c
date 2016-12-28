angular.module('AndSell.H5.Main').controller('pages_coupon_list_Controller', function ($scope, $state, couponFactory, personalFactory, modalFactory, weUI) {

    modalFactory.setTitle('领券中心');
    modalFactory.setBottom(false);
    $scope.couponSumMap = {};

    $scope.initData = function () {
        console.log('初始化数据');
        weUI.toast.showLoading('正在加载');
        couponFactory.getCouponList({}, function (response) {
            $scope.couponList = response.data;
            console.log($scope.couponList);

        });
        $scope.saveCouponNum();
        $scope.canGetCoupon = true;
    };

    $scope.saveCouponNum = function () {
        var member = {};
        personalFactory.getAllStateCouponListByUser(member, function (response) {
            var memberCouponList = response.data;
            console.log(memberCouponList);
            memberCouponList.forEach(function (ele) {
                $scope.couponSumMap[ele['MEMBER_COUPON.COUPON_ID']] = ele['.NUM_COUPON'];  //将客户所拥有的各优惠券的数量存在map中
            });
            console.log($scope.couponSumMap);
            weUI.toast.hideLoading();
        }, function (response) {
            weUI.toast.hideLoading();
            weUI.toast.error(response.msg);
        });
    };

    $scope.initData();

    $scope.detailData = function (data) {

        var str = data.replace(/<br>/g, " ");
        return str;

    }

    $scope.add = {};
    $scope.add['MEMBER_COUPON.COUPON_ID'] = '';
    $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = '';

    /**
     * 领取优惠券
     */
    $scope.addCoupon = function (item) {
        if ( $scope.canGetCoupon) {
            $scope.canGetCoupon = false;
            var sum = $scope.couponSumMap[item['COUPON.ID']];  //客户所拥有的当前优惠券的数量
            var count = item['COUPON.RULE_INFO']['COUPON_RULE.EACH_MEMBER_LIMIT'];  //该优惠券所允许的每人领取的最大数量
            console.log(sum);
            console.log(count);
            if (sum != undefined && sum >= count) {
                weUI.toast.info('该优惠券的领取数量已经达到了上限，换张再领吧！');
            } else {
                $scope.add['MEMBER_COUPON.COUPON_ID'] = item['COUPON.ID'];
                $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = item['COUPON.END_DATETIME'];

                item['COUPON.NUM_LEFT'] = item['COUPON.NUM_LEFT'] - 1;

                couponFactory.addMemberCoupon($scope.add, function (response) {
                    couponFactory.modCouponLeft(item, function (response) {  //修改优惠券剩余数量
                        $scope.canGetCoupon = true;
                        weUI.toast.ok('领取成功!');
                        $scope.initData();
                        $scope.add = '';

                    }, function (response) {
                        weUI.toast.error(response.msg);
                    });
                }, function (response) {
                    weUI.toast.error(response.msg);
                });
            }
        }
    }

    $scope.parseArray = function (data) {
        if (data != undefined) {
            data = data.split(',');
        }
        return data;
    }
});
