AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("salesRule", {
            url: "/salesRule",
            templateUrl: "/AndSell/app/marketing/sales/salesList/index.html",
            controller: "salesRuleListController"
        })
        .state("couponRule", {
            url: "/couponRule",
            templateUrl: "/AndSell/app/marketing/coupon/rule/ruleList/index.html",
            controller: "couponRuleListController"
        })
        .state("salesAdd", {
            url: "/salesAdd",
            params: {id: 0},
            templateUrl: "/AndSell/app/marketing/sales/salesAdd/index.html",
            controller: "salesAddController"
        })
        .state("couponType", {
            url: "/couponType",
            templateUrl: "/AndSell/app/marketing/coupon/couponType/index.html",
            controller: "couponTypeController"
        })
});