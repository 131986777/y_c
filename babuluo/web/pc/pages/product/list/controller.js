angular.module('AndSell.PC.Main').controller('pages_product_list_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("商品列表");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);

    setCookie();

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    // if (getCookie('currentShopInfo') != undefined) {
    //     $scope.STORE_ID = ToJson(getCookie('currentShopInfo'))['SHOP.REPOS_ID']
    // } else {
    //     $scope.toShop();
    // }

    $scope.filter = {
        'STOCK_REALTIME.STORE_ID': $scope.STORE_ID,
        'SHOP_PRODUCT.REMARK': 'offLine',
        'SHOP_PRODUCT.ORDER':'HAS_STOCK DESC,SHOP_PRODUCT.CLASS_ID ASC,convert(SHOP_PRODUCT.PRD_NAME using gbk) asc '
    };

    $scope.bindData = function (response) {

        console.log(response);
        $scope.prdList = response.data;
    };

    $scope.toShop = function () {
        $state.go('pages/shop', {'FROM': window.location.href});
    }

    //加入购物车
    $scope.addToCart = function (sku) {
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }

        if (cartInfo.indexOf(sku['SHOP_PRODUCT_SKU.SKU_ID']) < 0) {
            cartInfo.push(sku['SHOP_PRODUCT_SKU.SKU_ID']);
        }

        //size in cookie
        var size = cartSize[sku['SHOP_PRODUCT_SKU.SKU_ID']];
        if (size != undefined) {
            size += 1;
        } else {
            size = 1;
        }
        cartSize[sku['SHOP_PRODUCT_SKU.SKU_ID']] = size;

        //加入购物车
        setCookie('cartSize', JSON.stringify(cartSize));
        setCookie('cartInfo', JSON.stringify(cartInfo));

        console.log(getCookie('cartInfo'));
        console.log(getCookie('cartSize'));
    }
});
