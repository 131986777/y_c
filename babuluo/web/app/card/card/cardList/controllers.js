AndSellMainModule.controller('cardListController', function ($scope, $stateParams, cardFactory, modalFactory) {

    modalFactory.setTitle('已开会员卡');

    $scope.initLoad = function () {
        cardFactory.getMemberCardList().get({}, function (response) {
            console.log(response);
            $scope.productUnitList = response.data;
        }, null);
    };
    $scope.yy={
        'background-color' : '#31C552'
    };

    $scope.initLoad();


});
