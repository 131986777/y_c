angular.module('AndSell.H5.Main').controller('pages_user_register_Controller', function ($scope, $state, $stateParams, $interval,userFactory, modalFactory, weUI,$location) {

    modalFactory.setBottom(true);
    console.log(0);
    console.log($location.search()['from'])
    $scope.showColor = function (){
        var  num = $scope.memberInfo['MEMBER.LOGIN_ID'];
        if (num == 11){

        }
    }

    $scope.checkPwd = function () {
        var pwd = $scope.memberInfo['MEMBER.LOGIN_PWD'];
        var length = pwd.toString().length;
        if (length < 6) {
            weUI.toast.info('密码长度应大于6');
        }
    }


    $scope.reg = function () {
        if ($scope.memberInfo['MEMBER.LOGIN_PWD'].length < 6) {
            modalFactory.showShortAlert('密码长度不得小于6位');
            return;
        }
        if ($scope.memberInfo['MEMBER.LOGIN_PWD'] != $scope.memberInfo['MEMBER.password']) {
            weUI.toast.error('两次密码不一致，请检查密码');
            return;
        }
        var form = {};
        form['MEMBER.LOGIN_ID'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.MOBILE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.LOGIN_PWD'] = $scope.memberInfo['MEMBER.LOGIN_PWD'];
        form['MEMBER.CHECKCODE'] = $scope.memberInfo['MEMBER.CHECKCODE'];
        userFactory.newUserReg(form, function (response) {
            weUI.toast.ok('注册成功');
            $state.go('pages/user/accountLogin');
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }



    $scope.sendSms = function () {
        if ($scope.memberInfo['MEMBER.LOGIN_ID'] == '') {
            weUI.toast.error('请输入手机号');
        } else {
            var flag = checkPhone($scope.memberInfo['MEMBER.LOGIN_ID']);
            if (flag == false) {
                weUI.toast.error('请输入正确手机号');
            } else {
                var form = {};
                form['FLAG'] =1;
                form['PHONE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
                userFactory.sendVerificationCode(form, function (response) {
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
        }
    }

    $scope.$on('destroy', function () {
        $interval.cancel($scope.timer);
    })
});