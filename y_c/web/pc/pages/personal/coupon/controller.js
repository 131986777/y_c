angular.module('AndSell.PC.Main').controller('pages_personal_coupon_Controller', function ($interval, $scope, $state, modalFactory, orderFactory, personalFactory, balanceFactory) {

    modalFactory.setTitle("我的优惠券");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

    modalFactory.setCateGory(true);

    modalFactory.setLeftMenu(false);



    $scope.initData = function () {
        console.log('初始化数据');
        personalFactory.getCouponListByUser({}, function (response) {
            $scope.memberCouponList = response.data;
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
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
