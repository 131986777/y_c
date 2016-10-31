AndSellMainModule.controller('MemberCoupon', function ($scope, $state, $stateParams, memberFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('已领优惠券');

    $scope.bindData = function (response) {

        $scope.userDetailMap = response.extraData.userDetailMap;
        console.log($scope.userDetailMap);
        $scope.couponList = response.extraData.couponList;
        console.log($scope.couponList);
    };
    $scope.queryMemberById = function (memberId) {
        $scope.memberDetail = $scope.userDetailMap[memberId];
        console.log($scope.memberDetail);
        if ($scope.memberDetail == undefined) {
            modalFactory.showAlert("未找到该客户");
        }
    };

    /*$scope.change=function (item) {
     console.log(423);
     console.log(item);
     item['COUPON.ID']
     add['MEMBER_COUPON.COUPON_ID']
     }*/
    $scope.coupon = {};
    $scope.add = {};
    $scope.add['MEMBER_COUPON.COUPON_ID'] = '';
    $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = '';

    $scope.addMemberCoupon = function () {

        //addMemberCoupon
       // console.log($scope.coupon['COUPON.ID']);
        $scope.add['MEMBER_COUPON.COUPON_ID'] = $scope.coupon['COUPON.ID'];
        $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = $scope.coupon['COUPON.END_DATETIME'];
        $scope.add['MEMBER_COUPON.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];

        memberFactory.addMemberCoupon($scope.add).get({}, function (response) {

         if (response.code == 400) {
         modalFactory.showShortAlert(response.msg);
         } else if (response.extraData.state == 'true') {
         modalFactory.showShortAlert('新增成功');
         $scope.add='';
         $("#addCoupon").modal('hide');
         $scope.$broadcast('pageBar.reload');
         }

         });
    };


});

