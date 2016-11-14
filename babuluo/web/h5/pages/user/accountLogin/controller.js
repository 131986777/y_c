angular.module('AndSell.H5.Main').controller('pages_user_accountLogin_Controller', function ($http, $scope, $state, $stateParams, userFactory, modalFactory, weUI) {

    modalFactory.setTitle('登录');
    modalFactory.setBottom(false);

    $scope.login = function () {
        var form = $scope.memberInfo;
        userFactory.login(form, function (response) {
            weUI.toast.info('登录成功');
            $state.go('pages/home');
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

});




