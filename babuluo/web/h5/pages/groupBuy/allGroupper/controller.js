angular.module('AndSell.H5.Main').controller('pages_groupBuy_allGroupper_Controller', function (productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {
    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var gbm = getCookie("GBM");
        $scope.gbmList = JSON.parse(gbm);
    };
});
