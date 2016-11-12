angular.module('AndSell.H5.' + 'Main').controller('pages_security_resetPwd_Controller', function ($scope, $state, $stateParams, securityFactory,userFactory,weUI) {

    /*$scope.loginId = $stateParams.LOGIN_ID;
    console.log($scope.loginId);*/


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
            return;

        }
    }
    $scope.reg = function (){
        $scope.ckeckPhone();
        $scope.checkPwd();
        $scope.checkPassword();
        var form = $scope.memberInfo;


        form = {};
        form[''] = value;
        form[''] = value;
        form['ID'] = value;

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

    $scope.sendSms = function (){
        var form ={}
        form['MEMBER.LOGIN_ID'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        console.log(form);
        securityFactory.sendVerificationCode(form).get({}, function (response) {
            if (response.code == 400) {
                weUI.toast.error(response.msg);
            } else {

            }
        });
    }

    $scope.updateInfo = function (){
        var form = {};
        form['MEMBER.LOGIN_ID'] = $scope.memberInfo['MEMBER.LOGIN_ID'];
        form['MEMBER.CHECKCODE'] = $scope.memberInfo['MEMBER.CHECKCODE'];
        form['MEMBER.PWD'] = $scope.memberInfo['MEMBER.PWD'];
        console.log(form);
        securityFactory.updataMemberInfo(form).get({}, function (response) {
            if (response.code == 400) {
                weUI.toast.error(response.msg);
            } else {
                weUI.toast.ok('密码修改成功');
            }
        });
    }

});




