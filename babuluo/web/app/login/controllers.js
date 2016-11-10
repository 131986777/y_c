angular.module('AndSell.Main').controller('user_user_userList_Controller', function ($scope, loginFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('登录');

    modalFactory.setBottom(false);

    $scope.login = function () {
        var form = {};
        form['LOGIN_ID'] = $scope.loginId;
        form['PWD'] = $scope.PWD;
        loginFactory.login(form).get({'withCredentials': true}, function (response) {
            if (response.code == 400) {
               modalFactory.showShortAlert(response.msg);
            } else {
                modalFactory.showShortAlert("登录成功");
                $state.go('pages/home');
            }
        });
    }
});

