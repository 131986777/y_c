angular.module('AndSell.PC.Main').controller('pages_login_accountLogin_Controller', function (productFactory, $interval, $scope, $state, modalFactory, userFactory) {

    modalFactory.setTitle("账号登录");

    modalFactory.setHeader(false);


    $scope.userLogin = function () {
        var form = $scope.loginInfo;
        userFactory.login(form, function (response) {
            $state.go('pages/home');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }
});
