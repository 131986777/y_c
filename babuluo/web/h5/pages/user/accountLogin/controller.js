angular.module('AndSell.H5.Main').controller('pages_user_accountLogin_Controller', function ($http, $scope, $state, $stateParams, userFactory, modalFactory, weUI) {

    modalFactory.setTitle('登录');
    modalFactory.setBottom(false);

    $scope.login = function () {
        var form = $scope.memberInfo;
        console.log(form);
        userFactory.login(form, function (response) {
            console.log(response);
            weUI.toast.info('登录成功');
            $state.go('pages/home');
        }, function (response) {
            if(response.msg == "ISNEW"){
                var id = $scope.memberInfo['LOGIN_ID'];
                $state.go('pages/user/SetPassword' , {LOGIN_ID:id});
            }else{
                weUI.toast.error(response.msg);
            }

        });
    }
});




