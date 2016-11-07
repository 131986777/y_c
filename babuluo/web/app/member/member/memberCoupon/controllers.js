AndSellMainModule.controller('MemberCoupon', function ($scope, $state, $stateParams, memberFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户优惠券');

    $scope.bindData = function (response) {

        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.couponData=response.extraData.couponList;
        $scope.couponList=response.data;

    };
    $scope.queryMemberById = function (memberId) {
        $scope.memberDetail = $scope.userDetailMap[memberId];
        console.log($scope.memberDetail);
        if ($scope.memberDetail == undefined) {
            modalFactory.showAlert("未找到该客户");
        }
    };

    $scope.detailClick = function (item) {
        // $scope.detail = item;
        $scope.detailArray=item.split("<br>");

    }
    $scope.coupon = {};
    $scope.add = {};
    $scope.add['MEMBER_COUPON.COUPON_ID'] = '';
    $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = '';

    $scope.addMemberCoupon = function () {
       // console.log($scope.memberId);
        if($scope.memberId==undefined||$scope.memberId==''){
            modalFactory.showShortAlert('请输入登录名称！');
        }else{

        $scope.add['MEMBER_COUPON.COUPON_ID'] = $scope.coupon['COUPON.ID'];
        $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = $scope.coupon['COUPON.END_DATETIME'];
        $scope.add['MEMBER_COUPON.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];

        $scope.coupon['COUPON.NUM_LEFT']=$scope.coupon['COUPON.NUM_LEFT']-1;


        memberFactory.addMemberCoupon($scope.add).get({}, function (response) {

         if (response.code == 400) {
         modalFactory.showShortAlert(response.msg);

         } else if (response.extraData.state == 'true') {

             memberFactory.modCouponLeft($scope.coupon).get({},function(response){  //修改优惠券剩余数量
                 if (response.code == 400) {
                     modalFactory.showShortAlert(response.msg);

                 } else if (response.extraData.state == 'true') {
                     modalFactory.showShortAlert('新增成功');
                     $scope.add='';
                     $("#addCoupon").modal('hide');
                     $scope.$broadcast('pageBar.reload');
                 }

             });

         }

         });
        }
    };

    $scope.parseArray=function (data) {
        var array=data.split(',');

        return array;
    }


});

