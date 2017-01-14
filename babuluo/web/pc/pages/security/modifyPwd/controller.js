angular.module('AndSell.PC.Main').controller('pages_security_modifyPwd_Controller', function (productFactory, $interval, $scope, $stateParams,$state, modalFactory, securityFactory) {

    modalFactory.setTitle("重置密码");

    modalFactory.setHeader(false);

    //modalFactory.setCateGory(true);
    modalFactory.setSide(true);
    $scope.get=true;
    $scope.send=false;
    $scope.sended=false;

    $scope.passwordIsExist = function () {
        var params = {};
        params['MEMBER.LOGIN_ID']=$stateParams.login_id;
        alert(params['MEMBER.LOGIN_ID']);
        params['MEMBER.LOGIN_PWD']=$scope.login_pwd;
        securityFactory.passwordIsExist(params,function (resp) {
            console.log(resp.data[0]);
            if(resp.data[0]=='{}'){
                alert('bubu');
            }
        })
    };

});
