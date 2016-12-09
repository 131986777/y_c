angular.module('AndSell.Main').controller('member_member_memberCard_Controller', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户会员卡信息');

    modalFactory.setBottom(false);

    $scope.memberId = $stateParams.id;

    $scope.initLoad = function () {
        $scope.cardSourceList = new Array();
        $scope.cardTypeList = new Array();
        memberFactory.getMembercardInfo({'MEMBER_CARD.USER_ID':$scope.memberId}, function (response) {
            $scope.cardInfoList = response.data;
        });
    };
    $scope.initLoad();

});

