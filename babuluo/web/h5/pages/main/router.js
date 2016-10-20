AndSellH5MainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "/AndSell/h5/pages/home/index.html",
            controller: "H5.HomeController"
        })
        .state("prd-detail", {
            url: "/PrdDetail",
            params: {PRD_ID: 1242},
            templateUrl: "/AndSell/h5/pages/product/detail/index.html",
            controller: "H5.PrdDetailController"
        })
        .state("cart", {
        url: "/cart",
        templateUrl: "/AndSell/h5/pages/cart/index.html",
        controller: "H5.CartController"
    })

});