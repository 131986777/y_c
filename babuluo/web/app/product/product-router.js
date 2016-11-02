AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("productAdd", {
            url: "/productAdd",
            templateUrl: "/AndSell/app/product/product/productAdd/index.jsp",
            controller: "productAddController"
        })
        .state("productModify", {
            url: "/productModify",
            params: {productId: 0},
            templateUrl: "/AndSell/app/product/product/productModify/index.jsp",
            controller: "productModifyController"
        })
        .state("productList",{
            url: "/productList",
            params: {keyword:''},
            templateUrl: "/AndSell/app/product/product/productList/index.jsp",
            controller: "productListController"
        })
        .state("productClassList", {
            url: "/productClassList",
            templateUrl: "/AndSell/app/product/product_class/classList/index.jsp",
            controller: "classListController"
        })
        .state("productClassOrder", {
            url: "/productClassOrder",
            templateUrl: "/AndSell/app/product/product_class/classOrder/index.jsp",
            controller: "classOrderController"
        })
        .state("productTagList", {
            url: "/productTagList",
            templateUrl: "/AndSell/app/product/product_tag/tagList/index.jsp",
            controller: "tagListController"
        })
        .state("productTagOrder", {
            url: "/productTagOrder",
            templateUrl: "/AndSell/app/product/product_tag/tagOrder/index.jsp",
            controller: "tagOrderController"
        })
        .state("productUnitList", {
            url: "/productUnitList",
            templateUrl: "/AndSell/app/product/product_unit/unitList/index.jsp",
            controller: "unitListController"
        })


});