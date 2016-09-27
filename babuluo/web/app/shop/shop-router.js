AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("shopList", {
            url: "/shopList",
            templateUrl: "/AndSell/app/shop/shop/shopList/index.jsp",
            controller: "shopListController"
        })
        .state("shopDistrict", {
            url: "/shopDistrict",
            templateUrl: "/AndSell/app/shop/shop_district/districtList/index.jsp",
            controller: "districtListController"
        });

});