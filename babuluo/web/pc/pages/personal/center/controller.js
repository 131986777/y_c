angular.module('AndSell.PC.Main').controller('pages_personal_center_Controller', function ($interval, $scope, $state, modalFactory, orderFactory, personalFactory, balanceFactory) {

    modalFactory.setTitle("个人中心");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

    modalFactory.setCateGory(true);

    modalFactory.setLeftMenu(false);

    $scope.queryAccount = function () {
        balanceFactory.queryAccountByUid({}, function (response) {
            $scope.balanceInfo = response.data;
            if (!$scope.balanceInfo.length > 0) {
                $state.go('pages/login/accountLogin');
                modalFactory.showShortAlert('请使用正确的账号登录');
            }
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.getPhone = function (uid) {
        var form = {};
        form['MEMBER.USER_ID'] = uid;
        personalFactory.getPhone(form, function (response) {
            $scope.USER = response.data[0];
            $scope.modifyUserName = $scope.USER['MEMBER.USER_NAME'];
        }, function (response) {

        });
    }

    $scope.getCouponSum = function (uid) {
        var form = {};
        form['MEMBER_COUPON.USER_ID'] = uid
        personalFactory.getCoupon(form, function (response) {
            $scope.coupon = response.data;
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.initLoad = function () {

        modalFactory.setCurrentPage('wd');

        $scope.uid = getCookie('ANDSELLID');
        if ($scope.uid != undefined && $scope.uid != '') {
            $scope.queryAccount($scope.uid);
            $scope.getPhone($scope.uid);
            $scope.getCouponSum($scope.uid);
        } else {
            $state.go('pages/login/accountLogin');
            modalFactory.showShortAlert('登录异常');
        }

        personalFactory.getMemberCardByUserId({}, function (resq) {
            $scope.memberCards = resq.data;
        });
    }



    $scope.initLoad();


    $scope.modifyName = function () {

        personalFactory.modifyMember({"MEMBER.USER_NAME": $scope.modifyUserName}, function (response) {
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }
});
