AndSellH5MainModule.controller('H5.HomeController', function ($scope, $state, modalFactory) {

    modalFactory.setTitle('主页');
    modalFactory.setBottom(true);

    //商品搜索
    $scope.searchPrd= function () {
        $state.go('prd-List',{keyword:$scope.prdKeyword});
    }

});
