/*AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

   /!* $stateProvider
        .state("cardType", {
            url: "/cardType",
            templateUrl: "/AndSell/app/card/card/cardType/index.html",
            controller: "cardTypeController"
        })
        .state("cardSource", {
            url: "/cardSource",
            templateUrl: "/AndSell/app/card/card/cardSource/index.html",
            controller: "cardSourceController"
        })*!/


});*/

$import('card/card/cardList',undefined,true);
$import('card/card/cardActivite',undefined,true);
$import('card/card/cardType',undefined,true);
$import('card/card/cardSource');