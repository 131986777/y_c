angular.module('AndSell.H5.Main').controller('pages_user_phoneLogin_Controller', function ($http, $scope, $state, $interval, $stateParams, userFactory, modalFactory, weUI) {

    $scope.memberInfo={'PHONE':'','RANDCODE':''};

    $scope.sendSms = function () {

        var send= function () {
            var form = {};
            form['PHONE'] = $scope.memberInfo['PHONE'];
            userFactory.phoneSms(form, function (response) {
                console.log(form);
                $('.vcode-btn').fadeOut();
                $('.vcode-time').fadeIn();
                $scope.time = 60;
                $scope.timer = $interval(function () {
                    if($scope.time==0){
                        $('.vcode-btn').fadeIn();
                        $('.vcode-time').fadeOut();
                        $scope.time=60;
                        $interval.cancel($scope.timer);
                    }
                    else {
                        $scope.time--;
                    }
                }, 1000);
                weUI.toast.ok('请输入验证码');
            }, function (response) {
                weUI.toast.error(response.msg);
            });
        }
        checkForm(send);
    }

    $scope.login= function () {
        var loginEvent= function () {
            userFactory.phoneLogin($scope.memberInfo, function (response) {
                $state.go('pages/home');
            },function(response){
                weUI.toast.error(response.msg);
            });
        }
        checkForm(loginEvent);
    }


    var checkForm= function (did) {
        console.log($scope.memberInfo);
        if ($scope.memberInfo['PHONE'] == '') {
            weUI.toast.error('请输入手机号');
        } else {
            var flag = checkPhone($scope.memberInfo['PHONE']);
            if (flag == false) {
                weUI.toast.error('请输入正确手机号');
            } else {
                did();
            }
        }
    }

});