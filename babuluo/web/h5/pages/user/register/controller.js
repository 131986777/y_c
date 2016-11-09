angular.module('AndSell.H5.Main').controller('pages_user_register_Controller', function ($scope, $state, $stateParams, userFactory, modalFactory) {

    modalFactory.setBottom(true);

    $scope.checkPwd = function (){
        if($scope.memberInfo['LOGIN_PWD'] != $scope.memberInfo['password']){
            alert('两次面不一致，请检查密码');
        }
    }

    $scope.ckeckPhone = function(){
        var phoneNum = $scope.memberInfo['MEMBER.LOGIN_ID'];
        var length = phoneNum.toString().length;
        if(length != 11){
            alert('请输入正确的手机号码');
        }
    }
    $scope.reg = function (){
        $scope.checkPwd();
        var form = $scope.memberInfo;
        userFactory.newUserReg(form).get({}, function (response) {
            if (response.code == 400) {
                alert(response.msg);
            } else {
                alert('注册成功');
                $state.go('accountLogin');
            }
        });
    }
});




