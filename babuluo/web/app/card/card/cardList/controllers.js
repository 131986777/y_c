AndSellMainModule.controller('cardListController', function ($scope, $stateParams, cardFactory, modalFactory) {

    modalFactory.setTitle('已开会员卡');

    // $scope.initLoad = function () {
    //     cardFactory.getMemberCardList().get({}, function (response) {
    //         console.log(response);
    //         $scope.cardList = response.data;
    //     }, null);
    // };
    // $scope.initLoad();

    $scope.bindData = function (response) {
        $scope.cardList = response.data;
        $scope.sourceList = response.extraData.sourceList;
        console.log(response);
    }

});
