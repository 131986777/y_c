AndSellMainModule.controller('MainController', function ($scope, $state, modalFactory) {

    $scope.searchContent = "";
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

    $scope.queryKeyUp = function (e) {
        if(window.event?e.keyCode:e.which==13){
            $scope.search();
        }
    };

    $scope.search = function () {
        switch ($scope.searchType) {
            case 'product':
                $state.go('productList', {keyword: $scope.searchContent});
                break;
            case 'order':
                $state.go('orderList', {keyword: $scope.searchContent});
                break;
            case 'returnOrder':
                $state.go('prd-List', {keyword: $scope.searchContent});
                break;
            case 'member':
                $state.go('memberList', {keyword: $scope.searchContent});
                break;
        }
    }

});
