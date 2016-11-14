angular.module('AndSell.H5.' + 'Main').controller('pages_security_resetPwd_Controller', function ($scope, $state, $stateParams, securityFactory,$interval,userFactory,weUI) {

    $scope.checkPwd = function (){
        var pwd= $scope.memberInfo['MEMBER.PWD'];
        var length = pwd.toString().length;
        if(length < 6){
            weUI.toast.info('密码长度应大于6');
        }
    }

    $scope.checkPassword  = function (){
        if($scope.memberInfo['MEMBER.PWD'] != $scope.memberInfo['MEMBER.password']){
            weUI.toast.error('两次面不一致，请检查密码');
        }
    }

    $scope.ckeckPhone = function(){
        var phoneNum = $scope.memberInfo['MEMBER.LOGIN_ID'];
        var length = phoneNum.toString().length;
        if(length != 11){
            weUI.toast.info('请输入正确的手机号码');
            return false;

        }
    }
    $scope.reg = function (){
        $scope.ckeckPhone();
        $scope.checkPwd();
        $scope.checkPassword();
        var form = $scope.memberInfo;


        userFactory.newUserReg(form, function (response) {
            weUI.toast.ok('注册成功');
            $state.go('pages/user/accountLogin');
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }



    $scope.sendSms = function (){
        if ($scope.memberInfo['MEMBER.LOGIN_ID'] == '') {
            weUI.toast.error('请输入手机号');
        } else {
            var flag = $scope.ckeckPhone();
            if (flag == false) {
                weUI.toast.error('请输入正确手机号');
            }
          else {
                var form ={};
                form['PHONE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
                form['FLAG'] = 0;
                securityFactory.sendVerificationCode(form, function (response) {
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
                    weUI.toast.ok('发送成功');
                }, function (response) {
                    weUI.toast.error(response.msg);
                });
            }
        }
    }

    $scope.updateInfo = function (){
        var form = {};
        form['MEMBER.LOGIN_ID'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.CHECKCODE'] = $scope.memberInfo['MEMBER.CHECKCODE'];
        form['MEMBER.PWD'] = $scope.memberInfo['MEMBER.PWD'];
        securityFactory.updataMemberInfo(form, function (response) {
            weUI.toast.ok('密码修改成功');
        },function(response){
            weUI.toast.error(response.msg);
        });
    }

    $scope.$on('destroy', function () {
        $interval.cancel($scope.timer);
    })

});




