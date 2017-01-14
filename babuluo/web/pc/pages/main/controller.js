AndSellPCMainModule.controller('PC.MainController', function ($scope, $state, modalFactory, productFactory) {

    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
    });

    $scope.$on('header-bar', function (event, data) {
        $scope.showMenuBar = data.OnOffState;
        $scope.showControllerBar = data.OnOffState;
        $scope.showGoodsCategoriesBar = data.OnOffState;
    });
    $scope.$on('header-showMenu', function (event, data) {
        $scope.showMenuBar = data.OnOffState;
    });
    $scope.$on('leftMenu', function (event, data) {
        $scope.showLeftMenu = data.OnOffState;
    });
    $scope.$on('header-tab', function (event, data) {
        $scope.showControllerBar = data.OnOffState;
    });

    $scope.$on('categories-bar', function (event, data) {
        $scope.showGoodsCategoriesBar = data.OnOffState;
    });

    //nav-Bottom 初始化
    $scope.$on('side-bar', function (event, data) {
        $scope.showSideBar = data.OnOffState;
    });

    $scope.toPrdTagList = function (id) {
        $state.go('pages/product/list', {tagId: id});
    }

    $scope.toPrdClassList = function (id) {
        $state.go('pages/product/list', {classId: id});
    }

});
