angular.module('AndSell.H5.Main').controller('pages_user_SetPassword_Controller', function ($scope, $state, $stateParams, securityFactory,$interval,userFactory,weUI) {

    $scope.loginId = $stateParams.LOGIN_ID;

    console.log($scope.loginId);

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


    $scope.sendSms = function (){
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

        var form ={};
        form['PHONE'] = $scope.loginId;
        form['FLAG'] = 0;
        securityFactory.sendVerificationCode(form, function (response) {
            console.log(form);
            weUI.toast.ok('发送成功');
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.updateInfo = function (){
        var form = {};
        form['MEMBER.LOGIN_ID'] = $scope.loginId;
        form['MEMBER.CHECKCODE'] = $scope.memberInfo['MEMBER.CHECKCODE'];
        form['MEMBER.PWD'] = $scope.memberInfo['MEMBER.PWD'];
        securityFactory.updataMemberInfo(form, function (response) {
            weUI.toast.ok('密码修改成功');
        },function(response){
            weUI.toast.error(response.msg);
            $state.go('pages/personal');
        });
    }

    $scope.$on('destroy', function () {
        $interval.cancel($scope.timer);
    })

});




