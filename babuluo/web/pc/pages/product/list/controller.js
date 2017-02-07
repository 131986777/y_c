angular.module('AndSell.PC.Main').controller('pages_product_list_Controller', function (productFactory, $interval, $scope, $state, modalFactory, $state,$stateParams) {

    modalFactory.setTitle("商品列表");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);
    //
    // modalFactory.setLeftMenu(true);

    $scope.currFilter = {'type': 'name', 'order': 'desc'};

    $scope.Prdfilter = function (type) {
        if (type != $scope.currFilter.type) {
            $scope.currFilter = {
                'type': type, 'order': 'desc'
            }
        } else {
            $scope.currFilter.order = ($scope.currFilter.order == 'desc' ? 'asc' : 'desc');
        }

        var order_type = '';

        if (type == 'name') {
            order_type = 'convert(SHOP_PRODUCT.PRD_NAME using gbk)';
        } else if (type == 'time') {
            order_type = 'SHOP_PRODUCT.ADD_DATETIME';
        } else if (type == 'price') {
            order_type = 'SHOP_PRODUCT.REAL_PRICES';
        } else if (type == 'count') {
            order_type = 'SHOP_PRODUCT.SALES_VOLUME';
        } else if (type == 'comment') {
            order_type = 'SHOP_PRODUCT.COMMENT_VOLUME';
        }

        $scope.filter['SHOP_PRODUCT.ORDER'] = 'HAS_STOCK DESC,SHOP_PRODUCT.CLASS_ID ASC,'+order_type + ' ' + $scope.currFilter.order;
        console.log($scope.currFilter);
    }

    $scope.nofind = function () {
        var img = event.srcElement;
        img.src = "../../public/css/img/product.png";
        img.onerror = null;
    }
    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.toShop = function () {
        $state.go('pages/shop', {'FROM': window.location.href});
    }

    if (getCookie('currentShopInfo') != undefined) {
        $scope.STORE_ID = ToJson(getCookie('currentShopInfo'))['SHOP.REPOS_ID']
    } else {
        $scope.toShop();
    }

    $scope.filter = {
        'SHOP_PRODUCT.PRD_NAME': $stateParams.keyword,
        'SHOP_PRODUCT.CLASS_ID':$stateParams.classId,
        'SHOP_PRODUCT.SEARCH_SOURCE': "PC",
        'SHOP_PRODUCT.TAG_ID':$stateParams.tagId,
        'STOCK_REALTIME.STORE_ID': $scope.STORE_ID,
        'SHOP_PRODUCT.REMARK': 'offLine',
    };

    $scope.bindData = function (response) {

        console.log(response);
        $scope.prdList = response.data;
    };

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
});
