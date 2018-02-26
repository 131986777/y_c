angular.module('AndSell.Main').controller('member_member_memberCoupon_Controller', function ($scope, $state, $stateParams, memberFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户优惠券');

    $scope.initData = function (){
        memberFactory.getAllCoupon({},function(resp) {
            $scope.couponData = resp.data;
            $scope.couponMap=listToMap($scope.couponData,'COUPON.ID');
        });
        console.log($scope.couponData);
    };

    $scope.bindData = function (response) {
        //$scope.userDetailMap = response.extraData.userDetailMap;
        // $scope.couponData = response.extraData.couponList;
        $scope.ruleList = response.extraData.ruleList;
        $scope.couponList = response.data;


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
    };

 
    $scope.addMemberCoupon = function () {
    	 $scope.coupon = {};
    	 $scope.add = {};
        if ($scope.memberId == undefined || $scope.memberId == '') {
            modalFactory.showShortAlert('请输入登录名称并查询相关信息！');
        } else if ($scope.memberDetail['MEMBER.USER_ID'] == undefined) {
            modalFactory.showShortAlert('请先查询相关信息');
        } else {
            console.log($scope.modCoupon);
            $scope.coupon=$scope.couponMap[$scope.modCoupon];
            console.log($scope.coupon);
            $scope.add['MEMBER_COUPON.COUPON_ID'] = $scope.coupon['COUPON.ID'];
            //刘墨社群打折券
            var limt= $scope.coupon['COUPON.USE_TIME_LIMIT'];
            var nowdate = new Date().getTime();
            if(limt!=''||limt!=undefined){
            	  console.log(limt);
            	var expiredTime = new Date(nowdate + limt * 24 * 60 * 60 * 1000);
            }else{
            	  console.log(limt);
            	 var expiredTime = new Date(nowdate + 7 * 24 * 60 * 60 * 1000);
            }
            var year = expiredTime.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = expiredTime.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            if (month < 10) {
                month = "0" + month;
            }
            var day = expiredTime.getDate(); //获取当前日(1-31)
            if (day < 10) {
                day = "0" + day;
            }         
            $scope.add['MEMBER_COUPON.EXPIRED_TIME']= year + "-" + month + "-" + day + " 00:00:00";
            console.log( $scope.add['MEMBER_COUPON.EXPIRED_TIME']);
           // $scope.add['MEMBER_COUPON.EXPIRED_TIME'] = $scope.coupon['COUPON.END_DATETIME'];
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

