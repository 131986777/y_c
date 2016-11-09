angular.module('AndSell.H5.Main').controller('pages_personal_coupon_Controller', function ($scope, $state,  personalFactory, modalFactory) {

    modalFactory.setTitle('可用优惠券');
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

    $scope.detailData= function (data) {
        // $scope.detail = item;
       // $scope.detailArray=item.split("<br>");
        console.log(data);
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
