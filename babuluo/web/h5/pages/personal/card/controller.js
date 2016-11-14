angular.module('AndSell.H5.Main').controller('pages_personal_card_Controller', function ($scope, $state, modalFactory, personalFactory) {

    modalFactory.setTitle('我的会员卡');
    modalFactory.setBottom(true);


    $scope.loadMemberCard = function () {
        personalFactory.getMemberCardByUserId({}, function (response) {
            $scope.cardList = response.data;
        });
    };
    $scope.loadMemberCard();


});
