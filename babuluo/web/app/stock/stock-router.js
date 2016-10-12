AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("stockList", {
            url: "/stockList",
            templateUrl: "/AndSell/app/stock/stock/stockList/index.html",
            controller: "stockListController"
        })

        .state("storeList", {
            url: "/storeList",
            templateUrl: "/AndSell/app/stock/store/storeList/index.html",
            controller: "storeListController"
        })
        
});