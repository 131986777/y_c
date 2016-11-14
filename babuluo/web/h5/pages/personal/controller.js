angular.module('AndSell.H5.Main').controller('pages_personal_Controller', function (userFactory,$scope, $state, modalFactory,personalFactory) {

    modalFactory.setTitle('我的');
    modalFactory.setBottom(true);

    $scope.cancelLogin= function () {
        userFactory.loginOut({}, function (response) {
            $state.go('pages/user/accountLogin');
        });
    }

});
