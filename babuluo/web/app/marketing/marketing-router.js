AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("salesRule", {
            url: "/salesRule",
            templateUrl: "/AndSell/app/marketing/sales/salesList/index.html",
            controller: "salesListController"
        })
        .state("couponRule", {
            url: "/couponRule",
            templateUrl: "/AndSell/app/marketing/coupon/ruleList/index.html",
            controller: "ruleListController"
        })
        .state("salesAdd", {
            url: "/salesAdd",
            params: {id: 0},
            templateUrl: "/AndSell/app/marketing/sales/salesAdd/index.html",
            controller: "salesAddController"
        })
});