AndSellH5MainModule.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.when('','/pages/home');

    $stateProvider

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
        .state("couponList", {
            url: "/couponList",
            templateUrl: "/AndSell/h5/pages/coupon/list/index.html",
            controller: "H5.CouponController"
        })
        .state("userReg", {
            url: "/userReg",
            templateUrl: "/AndSell/h5/pages/user/register/index.html",
            controller: "H5.UserRegisterController"
        })
        .state("accountLogin", {
            url: "/accountLogin",
            templateUrl: "/AndSell/h5/pages/user/accountLogin/index.html",
            controller: "H5.UserAccountLoginController"
        })
});

$import('pages/home');
$import('pages/product/detail',{PRD_ID: '1242'});
$import('pages/cart');
$import('pages/order/add',{SKU_IDS: '1060',pickupPerson:{}});
$import('pages/payment/check_out',{ORDER_ID: '1023'});
$import('pages/payment/check_out_success');
$import('pages/order/detail',{ORDER_ID: '1030'});
$import('pages/product/list',{keyword:'',classId: undefined});
$import('pages/product/tagPrdList',{tagId:'1023'});
$import('pages/order/list',{state:'all'});
