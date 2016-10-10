AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state("cardList", {
            url: "/cardList",
            templateUrl: "/AndSell/app/card/card/cardList/index.html",
            controller: "cardListController"
        })
        .state("cardType", {
            url: "/cardType",
            templateUrl: "/AndSell/app/card/card/cardType/index.html",
            controller: "cardTypeController"
        })
        .state("cardSource", {
            url: "/cardSource",
            templateUrl: "/AndSell/app/card/card/cardSource/index.html",
            controller: "cardSourceController"
        })


});