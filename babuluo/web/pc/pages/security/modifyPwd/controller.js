angular.module('AndSell.PC.Main').controller('pages_security_modifyPwd_Controller', function (productFactory, $interval, $scope, $stateParams, $state, modalFactory, securityFactory) {

    modalFactory.setTitle("重置密码");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);
    modalFactory.setCateGory(true);

    $scope.checkPwd = function () {
        var pwd = $scope.memberInfo['MEMBER.PWD'];
        var length = pwd.toString().length;
        if (length < 6) {
            modalFactory.showShortAlert('密码长度应大于6');
        }
    }

    $scope.checkPassword = function () {
        if ($scope.memberInfo['MEMBER.PWD'] != $scope.memberInfo['MEMBER.password']) {
            modalFactory.showShortAlert('两次面不一致，请检查密码');
        }
    }

    $scope.ckeckPhone = function () {
        var phoneNum = $scope.memberInfo['MEMBER.LOGIN_ID'];
        var length = phoneNum.toString().length;
        if (length != 11) {
            return false;

        }
    }
    $scope.reg = function () {
        $scope.ckeckPhone();
        $scope.checkPwd();
        $scope.checkPassword();
        var form = $scope.memberInfo;

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
            var flag = $scope.ckeckPhone();
            if (flag == false) {
                modalFactory.showShortAlert('请输入正确手机号');
            } else {
                $scope.SMSstate = 'Sending';
                var form = {};
                form['PHONE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
                form['FLAG'] = 0;
                securityFactory.sendVerificationCode(form, function (response) {
                    $scope.SMSstate = 'SendEnd';
                    $('.send').fadeOut();
                    $('.sended').fadeIn();
                    $scope.time = 60;
                    $scope.timer = $interval(function () {
                        if ($scope.time == 0) {
                            $('.send').fadeIn();
                            $('.sended').fadeOut();
                            $scope.time = 60;
                            $interval.cancel($scope.timer);
                            $scope.SMSstate = 'SendWait';
                        } else {
                            $scope.time--;
                        }
                    }, 1000);
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            }
        }
    }

    $scope.updateInfo = function () {
        var form = {};
        form['MEMBER.LOGIN_ID'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.CHECKCODE'] = $scope.memberInfo['MEMBER.CHECKCODE'];
        form['MEMBER.PWD'] = $scope.memberInfo['MEMBER.PWD'];
        securityFactory.updataMemberInfo(form, function (response) {
            userFactory.loginOut({}, function (response) {
                modalFactory.showShortAlert('密码修改成功');
                modalFactory.updateUser();
                $state.go('pages/login/accountLogin');
            });
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.$on('destroy', function () {
        $interval.cancel($scope.timer);
    })

});
