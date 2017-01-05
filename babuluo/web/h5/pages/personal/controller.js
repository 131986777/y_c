angular.module('AndSell.H5.Main').controller('pages_personal_Controller', function (orderFactory, userFactory, $scope, $state, personalFactory, modalFactory, weUI, balanceFactory) {

    modalFactory.setTitle('我的');
    modalFactory.setBottom(true);

    $scope.cancelLogin = function () {
        weUI.dialog.confirm("提示", "是否确认退出", function () {
            userFactory.loginOut({}, function (response) {
                $state.go('pages/user/accountLogin');
            });
        });
    }

    $scope.getOrderStates = function () {
        orderFactory.getOrderStates({}, function (response) {
            $scope.stateMap = response.extraData.stateMap;
        });
    }

    $scope.queryAccount = function () {
        balanceFactory.queryAccountByUid({}, function (response) {
            $scope.balanceInfo = response.data;
            if (!$scope.balanceInfo.length > 0) {
                $state.go('pages/user/accountLogin');
                weUI.toast.error('请使用正确的账号登录');
            }
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.getPhone = function (uid) {
        var form = {};
        form['MEMBER.USER_ID'] = uid;
        personalFactory.getPhone(form, function (response) {
            console.log(response);
            $scope.phone = response.data[0]['MEMBER.MOBILE'];
            console.log($scope.phone);
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.getCouponSum = function (uid) {
        var form = {};
        form['MEMBER_COUPON.USER_ID'] = uid
        personalFactory.getCoupon(form, function (response) {
            $scope.coupon = response.data;
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.initLoad = function () {

        modalFactory.setCurrentPage('wd');

        $scope.uid = getCookie('ANDSELLID');
        if ($scope.uid != undefined && $scope.uid != '') {
            $scope.queryAccount($scope.uid);
            $scope.getPhone($scope.uid);
            $scope.getCouponSum($scope.uid);
            $scope.getOrderStates();
        } else {
            $state.go('pages/user/accountLogin');
            weUI.toast.error('登录异常');
        }
    }

    $scope.initLoad();

});
