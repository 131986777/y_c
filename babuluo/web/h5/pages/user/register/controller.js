angular.module('AndSell.H5.Main').controller('pages_user_register_Controller', function ($scope, $state, $stateParams, userFactory, modalFactory,weUI) {

    modalFactory.setBottom(true);

    $scope.checkPwd = function (){
        var pwd= $scope.memberInfo['MEMBER.LOGIN_PWD'];
        var length = pwd.toString().length;
        if(length < 11){
            weUI.toast.info('密码长度应大于6');
        }
    }

    $scope.checkPassword  = function (){
        if($scope.memberInfo['LOGIN_PWD'] != $scope.memberInfo['password']){
            weUI.toast.error('两次面不一致，请检查密码');
        }
    }

    $scope.ckeckPhone = function(){
        var phoneNum = $scope.memberInfo['MEMBER.LOGIN_ID'];
        var length = phoneNum.toString().length;
        if(length != 11){
            weUI.toast.info('请输入正确的手机号码');
        }
    }
    $scope.reg = function (){
        $scope.checkPwd();
        var form = $scope.memberInfo;
        userFactory.newUserReg(form).get({}, function (response) {
            if (response.code == 400) {
                weUI.toast.error(response.msg);
            } else {
                weUI.toast.ok('注册成功');
                $state.go('pages/user/accountLogin');
            }
        });
    }

    $scope.sendSms = function (){
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
});




