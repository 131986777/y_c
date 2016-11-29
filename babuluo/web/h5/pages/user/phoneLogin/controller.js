angular.module('AndSell.H5.Main').controller('pages_user_phoneLogin_Controller', function ($http, $scope, $state, $stateParams, userFactory, modalFactory, weUI) {



    $scope.sendSms = function () {
        if ($scope.memberInfo['MEMBER.LOGIN_ID'] == '') {
            weUI.toast.error('请输入手机号');
        } else {
            var flag = checkPhone($scope.memberInfo['MEMBER.LOGIN_ID']);
            if (flag == false) {
                weUI.toast.error('请输入正确手机号');
            } else {
                var form = {};
                form['PHONE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
                userFactory.phoneLogin(form, function (response) {
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

    $scope.login= function () {

    }


});