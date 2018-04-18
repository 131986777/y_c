angular.module('AndSell.H5.Main').controller('pages_groupBuy_allGroupper_Controller', function ($stateParams, groupBuyMemberFactory, $interval, $scope, $state, weUI, modalFactory) {
    $scope.initPage = function () {
        modalFactory.setBottom(false);
        $scope.gbmList = [];
        groupBuyMemberFactory.getAllMemberInGbgIds({"GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS": $stateParams.GBG_IDS}, function (response) {
            $scope.gbmList = response.data;
        })

    };
});
