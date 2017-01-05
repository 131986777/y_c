AndSellPCMainModule.controller('PC.MainController', function ($scope, $state, modalFactory, productFactory) {

    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
    });

    //nav-Bottom 初始化
    $scope.$on('nav-bottom', function (event, data) {
        $scope.navShow = data.OnOffState;
    });

});
