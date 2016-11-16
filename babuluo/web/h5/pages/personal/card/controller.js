angular.module('AndSell.H5.Main').controller('pages_personal_card_Controller', function ($scope, $state, modalFactory, personalFactory,weUI) {

    modalFactory.setTitle('我的会员卡');
    modalFactory.setBottom(true);


    $scope.loadMemberCard = function () {
        weUI.toast.showLoading('正在加载');
        personalFactory.getMemberCardByUserId({}, function (response) {
            $scope.cardList = response.data;
            weUI.toast.hideLoading();
        });
    };
    $scope.loadMemberCard();


});
