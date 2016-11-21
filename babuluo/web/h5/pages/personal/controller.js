angular.module('AndSell.H5.Main').controller('pages_personal_Controller', function (userFactory, $scope, $state, personalFactory, modalFactory, weUI, balanceFactory) {

    modalFactory.setTitle('我的');
    modalFactory.setBottom(true);

    $scope.cancelLogin = function () {
        weUI.dialog.confirm("提示", "是否确认退出", function () {
            userFactory.loginOut({}, function (response) {
                $state.go('pages/user/accountLogin');
            });
        },function(){

        });
    }
    $scope.getSession = function () {
        userFactory.getSession().get({}, function (response) {
            if (response.code == 400) {
                weUI.toast.error(response.msg);
            } else {
                console.log(response);
            }
        });
    }

    $scope.queryAccount = function (uid) {
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = uid;
        balanceFactory.queryAccountByUid(form, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.getPhone = function (uid) {
        var form = {};
        form['MEMBER.USER_ID'] = uid
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
            console.log(response);
            $scope.coupon = response.data;

        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.initLoad = function () {

        modalFactory.setCurrentPage('wd');

        $scope.uid = getCookie('ANDSELLID');
        $scope.queryAccount($scope.uid);
        $scope.getPhone($scope.uid);
        $scope.getCouponSum($scope.uid);
    }

    $scope.initLoad();

});
