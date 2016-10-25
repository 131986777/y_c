AndSellH5MainModule.controller('H5.CardController', function ($scope, $state, modalFactory, personalFactory) {

    modalFactory.setTitle('我的会员卡');
    modalFactory.setBottom(true);


    $scope.loadMemberCard = function () {
        var user = {};
        user['MEMBER_CARD.USER_ID'] = 1000;
        personalFactory.getMemberCardByUserId(user).get({}, function (response) {

            console.log(response);
        });
    };
    $scope.loadMemberCard();


});
