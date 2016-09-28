AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state("pointList", {
            url: "/pointList",
            templateUrl: "/AndSell/app/point/point/pointList/index.html",
            controller: "pointListController"
        })



});