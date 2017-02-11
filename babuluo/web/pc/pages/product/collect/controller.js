angular.module('AndSell.PC.Main').controller('pages_product_collect_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory) {

    modalFactory.setTitle("我的收藏");

    modalFactory.setHeader(false);

    modalFactory.setCateGory(true);

    modalFactory.setSide(true);

    $scope.filter = {};

    $scope.initData = function(){
        $scope.filter['PRODUCT_COLLECTION.USER_ID'] = getCookie('ANDSELLID');;
    }

    $scope.queryData = function (resp) {
        $scope.userCollections = resp.data;
        $scope.userCollections.forEach(function (ele) {
           ele['SHOP_PRODUCT.CMP'] = FILE_SERVER_DOMAIN+ele['SHOP_PRODUCT.CMP'];
        });
        console.log($scope.userCollections);
    }

    //跳转至详情页
    $scope.toDetail = function (id) {
        $state.go('pages/product/detail', {PRD_ID: id});
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
        modalFactory.updateCart();
        modalFactory.showShortAlert("加入购物车成功");
    }
})