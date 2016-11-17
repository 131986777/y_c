angular.module('AndSell.H5.Main').controller('pages_user_accountLogin_Controller', function ($http, $scope, $state, $stateParams, userFactory, modalFactory, weUI) {

    modalFactory.setTitle('登录');
    modalFactory.setBottom(false);

    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
    };

    $scope.login = function () {
        var form = $scope.memberInfo;
        userFactory.login(form, function (response) {
            weUI.toast.info('登录成功');
            if($stateParams.FROM!=''){
                window.location.href=$stateParams.FROM;
            }else{
                $state.go('pages/home');
            }
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




