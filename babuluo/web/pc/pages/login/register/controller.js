angular.module('AndSell.PC.Main').controller('pages_login_register_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("账号注册");

    modalFactory.setHeader(false);

    modalFactory.setSide(false);
    $scope.get=true;
    $scope.send=false;
    $scope.sended=false;
});
