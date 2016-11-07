AndSellH5MainModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('','/home');

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
        .state("order-add", {
            url: "/orderAdd",
            params: {SKU_IDS: '1060',pickupPerson:{}},
            templateUrl: "/AndSell/h5/pages/order/add/index.html",
            controller: "H5.OrderAddController"
        })
        .state("order-success", {
            url: "/orderSuccess",
            params: {ORDER_ID: '1023'},
            templateUrl: "/AndSell/h5/pages/payment/check_out.html",
            controller: "H5.OrderSuccessController"
        })
        .state("pay-success", {
            url: "/paySuccess",
            templateUrl: "/AndSell/h5/pages/payment/check_out_success.html",
            controller: "H5.PaySuccessController"
        })
        .state("order-detail", {
            url: "/orderDetail",
            params: {ORDER_ID: '1030'},
            templateUrl: "/AndSell/h5/pages/order/detail/index.html",
            controller: "H5.OrderDetailController"
        })
        .state("prd-List", {
            url: "/prdList",
            params:{keyword:'',classId: undefined},
            templateUrl: "/AndSell/h5/pages/product/list/index.html",
            controller: "H5.PrdListController"
        })
        .state("prd-List-tag", {
            url: "/prdListTag",
            params:{tagId:1023},
            templateUrl: "/AndSell/h5/pages/product/tagPrdList/index.html",
            controller: "H5.PrdListTagController"
        })
        .state("order-List", {
            url: "/orderList",
            params:{state:'all'},
            templateUrl: "/AndSell/h5/pages/order/list/index.html",
            controller: "H5.OrderListController"
        })
        .state("personal", {
            url: "/personal",
            templateUrl: "/AndSell/h5/pages/personal/index.html",
            controller: "H5.PersonalController"
        })
        .state("cardList", {
            url: "/cardList",
            templateUrl: "/AndSell/h5/pages/personal/card/index.html",
            controller: "H5.CardController"
        })
        .state("shopList", {
            url: "/shopList",
            templateUrl: "/AndSell/h5/pages/shop/index.html",
            controller: "H5.ShopController"
        })
        .state("orderAddAddress", {
            url: "/orderAddAddress",
            params: {SKU_IDS: '1060'},
            templateUrl: "/AndSell/h5/pages/order/addAddress/index.html",
            controller: "H5.OrderAddAddressController"
        })
});