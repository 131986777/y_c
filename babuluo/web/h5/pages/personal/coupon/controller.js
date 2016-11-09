angular.module('AndSell.H5.Main').controller('pages_personal_coupon_Controller', function ($scope, $state,  personalFactory, modalFactory) {

    modalFactory.setTitle('我的优惠券');
    // modalFactory.setBottom(true);


    $scope.initData = function () {
        console.log('初始化数据');

        var member={};
        member['MEMBER_COUPON.USER_ID'] =1000;
        personalFactory.getCouponListByUser(member).get({}, function (response) {
            $scope.memberCouponList = response.data;
            console.log($scope.memberCouponList);
        });
        }

    $scope.initData();

    $scope.detailClick = function (item) {
        // $scope.detail = item;
        $scope.detailArray=item.split("<br>");

    }

   /* $scope.add = {};
    $scope.add['MEMBER_COUPON.COUPON_ID'] = '';
    $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = '';

    /!**
     * 领取优惠券
     *!/
    $scope.addCoupon = function (item) {
        $scope.coupon =item;

        $scope.add['MEMBER_COUPON.COUPON_ID'] = $scope.coupon['COUPON.ID'];
        $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = $scope.coupon['COUPON.END_DATETIME'];
        $scope.add['MEMBER_COUPON.USER_ID'] =1000;

        $scope.coupon['COUPON.NUM_LEFT'] = $scope.coupon['COUPON.NUM_LEFT'] - 1;


        couponFactory.addMemberCoupon($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);

            } else if (response.extraData.state == 'true') {

                couponFactory.modCouponLeft($scope.coupon).get({}, function (response) {  //修改优惠券剩余数量
                    if (response.code == 400) {
                        modalFactory.showShortAlert(response.msg);

                    } else if (response.extraData.state == 'true') {
                        alert('领取成功!')
                        $scope.add = '';

                        //$scope.$broadcast('pageBar.reload');
                    }

                });

            }

        });

    };
*/
    $scope.parseArray=function (data) {
        if(data!=undefined){
           data=data.split(',');
        }


        return data;
    }





});
