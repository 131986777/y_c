angular.module('AndSell.PC.Main').controller('pages_login_accountLogin_Controller', function (productFactory, $interval, $scope, $state, modalFactory, userFactory) {

    modalFactory.setTitle("账号登录");

    modalFactory.setHeader(false);

    modalFactory.setSide(false);

    modalFactory.setLeftMenu(false);

    $scope.userLogin = function () {
        var form = $scope.loginInfo;
        userFactory.login(form, function (response) {
            modalFactory.updateUser();
            $state.go('pages/home');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
    };

    $scope.login = function () {
        var form = $scope.memberInfo;
        modalFactory.showShortAlert('正在登录');
        userFactory.login(form, function (response) {
            modalFactory.showShortAlert('登录成功');
            modalFactory.updateUser();
            if($stateParams.FROM!=''&&$stateParams.FROM!=undefined&&$stateParams.FROM!='undefined'){
                window.location.href=$stateParams.FROM;
            }else{
                $state.go('pages/home');
            }
        }, function (response) {
            if(response.msg == "ISNEW"){
                var id = $scope.memberInfo['LOGIN_ID'];
                $state.go('pages/user/SetPassword' , {LOGIN_ID:id});
            }else{
                modalFactory.showShortAlert(response.msg);
            }

        });
    }

    $scope.initData= function () {
        var state = {
            title: "main",
            url: "#/pages/home"
        };
        window.history.pushState(state, "main", "#/pages/home");
    }
});
