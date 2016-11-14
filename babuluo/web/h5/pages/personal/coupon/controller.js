angular.module('AndSell.H5.Main').controller('pages_personal_coupon_Controller', function ($scope, $state, personalFactory, modalFactory) {

    modalFactory.setTitle('可用优惠券');
    // modalFactory.setBottom(true);


    $scope.initData = function () {
        console.log('初始化数据');
        personalFactory.getCouponListByUser({}, function (response) {
            $scope.memberCouponList = response.data;
        });
    }

    $scope.initData();

    $scope.detailData = function (data) {

        var str = data.replace(/<br>/g, " ");
        return str;

    }


    $scope.parseArray = function (data) {
        if (data != undefined) {
            data = data.split(',');
        }
        return data;
    }


});
