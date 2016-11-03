AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("orderList", {
            url: "/orderList",
            params: {keyword: ''},
            templateUrl: "/AndSell/app/order/order/orderList/index.html",
            controller: "orderListController"
        })
        .state("order-detail", {
            url: "/orderDetail",
            params: {ORDER_ID: '1030'},
            templateUrl: "/AndSell/app/order/order/orderDetail/index.html",
            controller: "orderDetailController"
        })
});