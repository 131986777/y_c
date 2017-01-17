angular.module('AndSell.PC.Main').controller('pages_login_setPassword_Controller', function (productFactory, $interval, $scope, $state, modalFactory, userFactory) {

    modalFactory.setTitle("忘记密码");

    modalFactory.setHeader(false);

    modalFactory.setSide(false);

    modalFactory.setLeftMenu(false);

    $scope.get = true;
    $scope.send = false;
    $scope.sended = false;


});