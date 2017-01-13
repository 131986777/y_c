angular.module('AndSell.PC.Main').controller('pages_login_phoneLogin_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("验证码登录");

    modalFactory.setHeader(false);
    $scope.get=true;
    $scope.send=false;
    $scope.sended=false;

});
