AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("salesList", {
            url: "/salesList",
            templateUrl: "/AndSell/app/marketing/sales/salesList/index.html",
            controller: "salesListController"
        })
        .state("couponList", {
            url: "/couponList",
            templateUrl: "/AndSell/app/marketing/coupon/ruleList/index.html",
            controller: "ruleListController"
        })
        .state("salesAdd", {
            url: "/salesAdd",
            params: {id: 0},
            templateUrl: "/AndSell/app/marketing/sales/salesAdd/index.html",
            controller: "salesAddController"
        })
        .state("salesManage", {
            url: "/salesManage",
            templateUrl: "/AndSell/app/marketing/sales/salesManage/index.html",
            controller: "salesManageController"
        })
        .state("couponAdd", {
            url: "/couponAdd",
            templateUrl: "/AndSell/app/marketing/coupon/couponAdd/index.html",
            controller: "couponAddController"
        })
});