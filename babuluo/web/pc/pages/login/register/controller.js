angular.module('AndSell.PC.Main').controller('pages_login_register_Controller', function (productFactory, $interval, $scope, $state, modalFactory, userFactory) {

    modalFactory.setTitle("账号注册");

    modalFactory.setHeader(false);

    modalFactory.setSide(false);

    modalFactory.setLeftMenu(false);

    $scope.get = true;
    $scope.send = false;
    $scope.sended = false;


    $scope.showColor = function () {
        var num = $scope.memberInfo['MEMBER.LOGIN_ID'];
        if (num == 11) {

        }
    }

    $scope.reg = function () {
        if ($scope.memberInfo['MEMBER.LOGIN_PWD'].length < 6) {
            modalFactory.showShortAlert('密码长度不得小于6位');
            return;
        }
        if ($scope.memberInfo['MEMBER.LOGIN_PWD'] != $scope.loginInfo['PWD']) {
            modalFactory.showShortAlert('两次密码不一致，请检查密码');
            return;
        }
        var form = {};
        form['MEMBER.LOGIN_ID'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.MOBILE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.LOGIN_PWD'] = $scope.memberInfo['MEMBER.LOGIN_PWD'];
        form['MEMBER.CHECKCODE'] = $scope.memberInfo['MEMBER.CHECKCODE'];
        userFactory.newUserReg(form, function (response) {
            modalFactory.showShortAlert('注册成功');
            $state.go('pages/login/accountLogin');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }


    $scope.sendSms = function () {
        if ($scope.memberInfo['MEMBER.LOGIN_ID'] == '') {
            modalFactory.showShortAlert('请输入手机号');
        } else {
            var flag = checkPhone($scope.memberInfo['MEMBER.LOGIN_ID']);
            if (flag == false) {
                modalFactory.showShortAlert('请输入正确手机号');
            } else {
                var form = {};
                form['FLAG'] = 1;
                form['PHONE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
                $scope.get = false;
                $scope.send = true;
                userFactory.sendVerificationCode(form, function (response) {
                    console.log(form);
                    $scope.time = 60;
                    $scope.send = false;
                    $scope.sended = true;
                    $scope.timer = $interval(function () {
                        if ($scope.time == 0) {
                            $scope.time = 60;
                            $scope.get = true;
                            $scope.send = false;
                            $scope.sended = false;
                            $interval.cancel($scope.timer);
                        }
                        else {
                            $scope.time--;
                        }
                    }, 1000);

                    modalFactory.showShortAlert('请输入验证码');
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                    $scope.get = true;
                    $scope.send = false;
                });
            }
        }
    }

    $scope.$on('destroy', function () {
        $interval.cancel($scope.timer);
    })
});