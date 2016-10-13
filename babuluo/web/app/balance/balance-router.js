AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("balanceList", {
            url: "/balanceList",
            templateUrl: "/AndSell/app/balance/balance/balanceList/index.html",
            controller: "balanceListController"
        })



});