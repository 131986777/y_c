AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("salesRule", {
            url: "/salesRule",
            templateUrl: "/AndSell/app/marketing/sales/rule/ruleList/index.html",
            controller: "salesRuleListController"
        })
        .state("couponRule", {
            url: "/couponRule",
            templateUrl: "/AndSell/app/marketing/coupon/rule/ruleList/index.html",
            controller: "couponRuleListController"
        })
        .state("salesRuleAdd", {
            url: "/salesRuleAdd",
            params: {id: 0},
            templateUrl: "/AndSell/app/marketing/sales/rule/ruleAdd/index.html",
            controller: "salesRuleAddController"
        })
        .state("bannerPosition", {
            url: "/bannerPosition",
            templateUrl: "/AndSell/app/marketing/banner/banner_position/index.html",
            controller: "bannerPosController"
        })
        .state("banner", {
            url: "/banner",
            templateUrl: "/AndSell/app/marketing/banner/banner/index.html",
            controller: "bannerController"
        })
        .state("couponAdd", {
            url: "/couponAdd",
            templateUrl: "/AndSell/app/marketing/coupon/couponAdd/index.html",
            controller: "couponAddController"
        })
        .state("salesManage", {
            url: "/salesManage",
            templateUrl: "/AndSell/app/marketing/sales/salesManage/index.html",
            controller: "salesManageController"
        })
});