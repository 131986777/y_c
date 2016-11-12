angular.module('AndSell.H5.Main').controller('pages_user_register_Controller', function ($scope, $state, $stateParams, userFactory, modalFactory,weUI) {

    modalFactory.setBottom(true);

    $scope.checkPwd = function (){
        var pwd= $scope.memberInfo['MEMBER.LOGIN_PWD'];
        var length = pwd.toString().length;
        if(length < 6){
            weUI.toast.info('密码长度应大于6');
        }
    }

    $scope.checkPassword  = function (){
        if($scope.memberInfo['MEMBER.LOGIN_PWD'] != $scope.memberInfo['MEMBER.password']){
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
        else{
            return true;
        }
    }
    $scope.reg = function (){
        $scope.checkPwd();
        $scope.checkPassword();
        var form = $scope.memberInfo;
        userFactory.newUserReg(form).get({}, function (response) {
            console.log(response);
            if (response.code == 400) {
                weUI.toast.error(response.msg);
            } else {
                weUI.toast.ok('注册成功');
                $state.go('pages/user/accountLogin');
            }
        });
    }

    $scope.settime = function(item) {
        var countdown=60;
        if (countdown == 0) {
            item.removeAttribute("disabled");
            item.value="免费获取验证码";
            countdown = 60;
        } else {
            item.setAttribute("disabled", true);
            item.value="重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function() {
            settime(item)
        },1000)
    }

    $scope.sendSms = function (){
        //$scope.settime();
        /*输入项验证*/
        if($scope.memberInfo['MEMBER.LOGIN_ID'] == ''){
            weUI.toast.error('请输入手机号');
        }
        else{
            var flag= $scope.ckeckPhone();
            if(flag == false){
                weUI.toast.error('请输入正确手机号');
            }
            else{
                var form = {};
                form['PHONE'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
                userFactory.sendVerificationCode(form).get({}, function (response) {
                    if (response.code == 400) {
                        weUI.toast.error(response.msg);
                    } else {
                        weUI.toast.ok('请输入验证码');
                    }
                });
            }
        }
    }
});




