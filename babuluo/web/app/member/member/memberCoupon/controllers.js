angular.module('AndSell.Main').controller('member_member_memberCoupon_Controller', function ($scope, $state, $stateParams, memberFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户优惠券');

    $scope.bindData = function (response) {
        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.couponData = response.extraData.couponList;
        $scope.ruleList = response.extraData.ruleList;
        $scope.couponList = response.data;
        memberFactory.queryAllName(function (resp) {
            $scope.couponList2 = resp.data;
            console.log($scope.couponList2);
        });

        $scope.memberDetail = {};
        console.log($scope.couponList);
    };
    $scope.queryMemberById = function (memberId) {
        memberFactory.getMemberByName({'MEMBER.LOGIN_ID':$scope.memberId},function(resp) {
            resp.data.forEach(function (ele) {
                if ($scope.memberDetail == ele['MEMBER.LOGIN_ID']) {
                    modalFactory.showAlert("未找到该客户");
                }else {
                    $scope.memberDetail=ele;
                }
            });
        },null);

    };

    $scope.detailClick = function (item) {
        $scope.detailArray = item.split("<br>");
    }

    $scope.coupon = {};
    $scope.add = {};
    $scope.add['MEMBER_COUPON.COUPON_ID'] = '';
    $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = '';

    $scope.addMemberCoupon = function () {
        if ($scope.memberId == undefined || $scope.memberId == '') {
            modalFactory.showShortAlert('请输入登录名称并查询相关信息！');
        } else if ($scope.memberDetail == undefined) {
            modalFactory.showShortAlert('请先查询相关信息');
        } else {

            $scope.add['MEMBER_COUPON.COUPON_ID'] = $scope.coupon['COUPON.ID'];
            $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = $scope.coupon['COUPON.END_DATETIME'];
            $scope.add['MEMBER_COUPON.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];

            $scope.coupon['COUPON.NUM_LEFT'] = $scope.coupon['COUPON.NUM_LEFT'] - 1;

            memberFactory.addMemberCoupon($scope.add, function (response) {
                memberFactory.modCouponLeft($scope.coupon, function (response) {  //修改优惠券剩余数量
                    modalFactory.showShortAlert('新增成功');
                    $scope.add = '';
                    $("#addCoupon").modal('hide');
                    $scope.$broadcast('pageBar.reload');
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    };

    $scope.parseArray = function (data) {
        if (data != undefined) {
            data = data.split(',');
        }
        return data;
    }

});

