AndSellH5MainModule.controller('H5.MainController', function ($scope, $state, modalFactory) {



    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
        updateWxTitle($scope.title);
    });

    //nav-Bottom 初始化
    $scope.$on('nav-bottom', function (event, data) {
        $scope.navShow = data.OnOffState;
    });
});
