AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("salesList", {
            url: "/salesList",
            templateUrl: "/AndSell/app/sales/sales/salesList/index.html",
            controller: "salesListController"
        })
});