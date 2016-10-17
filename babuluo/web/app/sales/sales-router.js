AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("salesList", {
            url: "/salesList",
            templateUrl: "/AndSell/app/sales/sales/salesList/index.html",
            controller: "salesListController"
        })
        .state("couponList", {
            url: "/couponList",
            templateUrl: "/AndSell/app/sales/coupon/ruleList/index.html",
            controller: "ruleListController"
        })
});