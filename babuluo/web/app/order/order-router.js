AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("orderList", {
            url: "/orderList",
            templateUrl: "/AndSell/app/order/order/orderList/index.html",
            controller: "orderListController"
        })

});