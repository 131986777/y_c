AndSellH5MainModule.controller('H5.UserAccountLoginController', function ($scope, $state, $stateParams, userFactory, modalFactory) {

    modalFactory.setBottom(true);

    $scope.login = function (){
        var form = $scope.memberInfo;
        userFactory.login(form).get({}, function (response) {
            if (response.code == 400) {
                alert(response.msg);
             } else{
                alert('登录成功');
                $state.go('home');
            }
        });
    }
});




