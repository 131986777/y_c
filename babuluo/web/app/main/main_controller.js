AndSellMainModule.controller('MainController', function ($scope, $state, modalFactory) {

    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
    });

    //nav-Bottom 初始化
    $scope.$on('nav-bottom', function (event, data) {
        $scope.navShow = data.OnOffState;
        if (data.OnOffState) {
            $scope.navaBottomSubmit = data.SubmitFunc;
            $scope.navaBottomCancel = data.CancelFunc;
        }
    });

});

AndSellMainModule.controller('MianModalController', function ($scope, $state, modalFactory) {

    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
    });

    $scope.href = function (state) {
        $('#showModal').modal('show');
        $state.go(state);
    }

});

//也可以将所有controller 放在这里  但是controller结构不清洗
