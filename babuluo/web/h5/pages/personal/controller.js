angular.module('AndSell.H5.Main').controller('pages_personal_Controller', function (userFactory,$scope, $state, modalFactory,balanceFactory) {

    modalFactory.setTitle('我的');
    modalFactory.setBottom(true);

    $scope.cancelLogin= function () {
        userFactory.loginOut({}, function (response) {
            $state.go('pages/user/accountLogin');
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

    $scope.queryAccount = function (uid){
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = uid;
        balanceFactory.queryAccountByUid(form, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.initLoad  = function () {
        $scope.uid = getCookie('ANDSELLID');
        $scope.queryAccount($scope.uid);
    }

    $scope.initLoad();
});
