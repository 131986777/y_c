angular.module('AndSell.H5.Main').controller('pages_order_addCoupon_Controller', function ($scope, $state, $stateParams, personalFactory, modalFactory) {

    modalFactory.setTitle('我的优惠券');
    // modalFactory.setBottom(true);

    console.log(789);

    $scope.orderList=JSON.parse($stateParams.PRODUCTS);     //所有的订单信息
    $scope.totalMoney=Math.round($stateParams.MONEY);       //目前订单的总价
    console.log($scope.orderList);
    console.log('总价为'+$scope.totalMoney);

    $scope.initData = function () {
        console.log('初始化数据');

        var member={};
        member['MEMBER_COUPON.USER_ID'] =1000;
        personalFactory.getCouponListByUser(member).get({}, function (response) {
            $scope.memberCouponList = response.data;       //客户的所有优惠券
            console.log('客户的所有优惠券');
            console.log($scope.memberCouponList);
            $scope.judgeUsableCoupon($scope.memberCouponList);
        });
        }


    /**
     * 判断可用优惠券
      */
    $scope.useableList=new Array();   //可用的优惠券数组，如可用压入里面
    $scope.judgeUsableCoupon=function (couponList) {
       // console.log(couponList.length);
        if(couponList.length<=0){
            alert("无可用优惠券！");
        }else{
            couponList.forEach(function (ele) {
                ele['MEMBER_COUPON.COUPON_INFO'];
            })

        }

 }

    $scope.initData();





    $scope.detailData= function (data) {

        var str=data.replace(/<br>/g," ");
        return str;

    }



    $scope.parseArray=function (data) {
        if(data!=undefined){
           data=data.split(',');
        }
        return data;
    }





});
