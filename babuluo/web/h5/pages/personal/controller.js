angular.module('AndSell.H5.Main').controller('pages_personal_Controller', function (userFactory,$scope, $state, modalFactory,personalFactory) {

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
});
