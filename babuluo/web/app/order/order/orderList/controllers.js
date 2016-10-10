AndSellMainModule.controller('orderListController', function ($scope, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('订货单');

    $scope.initLoad = function () {
        orderFactory.getMemberCardList().get({}, function (response) {
            console.log(response);
            $scope.productUnitList = response.data;
        }, null);
    };
    $scope.yy={
        'background-color' : '#31C552'
    };

    $scope.initLoad();


});
