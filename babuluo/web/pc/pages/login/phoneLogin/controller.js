angular.module('AndSell.PC.Main').controller('pages_login_phoneLogin_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("验证码登录");

    modalFactory.setHeader(false);

    $scope.sendSms = function () {

        var send= function () {
            var form = {};
            form['PHONE'] = $scope.memberInfo['PHONE'];
            userFactory.phoneSms(form, function (response) {
                console.log(form);
                $('.send').fadeOut();
                $('.sended').fadeIn();
                $scope.time = 60;
                $scope.timer = $interval(function () {
                    if($scope.time==0){
                        $('.send').fadeIn();
                        $('.sended').fadeOut();
                        $scope.time=60;
                        $interval.cancel($scope.timer);
                    }
                    else {
                        $scope.time--;
                    }
                }, 1000);
                modalFactory.showShortAlert('请输入验证码');
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
        checkForm(send);
    }

    $scope.login= function () {
        var loginEvent= function () {
            userFactory.phoneLogin($scope.memberInfo, function (response) {
                $state.go('pages/home');
            },function(response){
                modalFactory.showShortAlert(response.msg);
            });
        }
        checkForm(loginEvent);
    }


    var checkForm= function (did) {
        console.log($scope.memberInfo);
        if ($scope.memberInfo['PHONE'] == '') {
            modalFactory.showShortAlert('请输入手机号');
        } else {
            var flag = checkPhone($scope.memberInfo['PHONE']);
            if (flag == false) {
                modalFactory.showShortAlert('请输入正确手机号');
            } else {
                did();
            }
        }
    }
});
