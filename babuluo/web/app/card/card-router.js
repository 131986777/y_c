AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state("cardList", {
            url: "/cardList",
            templateUrl: "/AndSell/app/card/card/cardList/index.html",
            controller: "cardListController"
        })



});