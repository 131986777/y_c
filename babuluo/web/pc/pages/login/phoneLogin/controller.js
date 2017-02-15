angular.module('AndSell.PC.Main').controller('pages_login_phoneLogin_Controller', function (productFactory, $interval, $scope, $state, modalFactory, userFactory) {

    modalFactory.setTitle("验证码登录");

    modalFactory.setHeader(false);

    $scope.sendwait = true;
    $scope.sending = false;
    $scope.sended = false;
    $scope.memberInfo = {};
    $scope.sendSms = function () {
        if ($scope.memberInfo['PHONE'] == undefined) {
            modalFactory.showShortAlert('请输入手机号');
            return;
        }
        var send = function () {
            var form = {};
            form['PHONE'] = $scope.memberInfo['PHONE'];
            userFactory.phoneSms(form, function (response) {
                console.log(form);
                $('.codeLogin').fadeOut();
                $('.send').fadeIn();
                $scope.time = 60;
                $scope.sending = false;
                $scope.sended = true;
                if (response.msg == 'ok') {
                    $('.send').fadeOut();
                    $('.sended').fadeIn();
                }
                $scope.timer = $interval(function () {
                    if ($scope.time == 0) {
                        $('.codeLogin').fadeIn();
                        $('.sended').fadeOut();
                        $scope.sendwait = true;
                        $scope.send = false;
                        $scope.sended = false;
                        $scope.time = 60;
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

    $scope.login = function () {
        var loginEvent = function () {
            userFactory.phoneLogin($scope.memberInfo, function (response) {
                $state.go('pages/home');
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
        checkForm(loginEvent);
    }


    var checkForm = function (did) {
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
