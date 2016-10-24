AndSellH5MainModule.controller('H5.PrdListController', function ($scope, $state, productFactory, modalFactory) {

    modalFactory.setTitle('商品列表');
    modalFactory.setBottom(false);

    $scope.filter = {};

    $scope.initData = function () {
        $scope.getPrd();
        $scope.getCartInfoInCookie();
    }

    //获取商品列表
    $scope.getPrd = function () {
        productFactory.getProduct($scope.filter).get({}, function (response) {
            console.log(response);
            $scope.prdList = response.data;
        });
    }

    $scope.searchPrd = function () {
        $scope.getPrd();
    }

    //跳转至详情页
    $scope.toDetail = function (id) {
        $state.go('prd-detail', {PRD_ID: id});
    }

    //跳出弹出框选择sku
    $scope.selectSKU = function (id) {
        $scope.cartPrdId=id;
        $scope.cartModalShow=true;
    }

    //更新购物车价格
    $scope.updateCartPrice = function () {
        var price = 0;
        var size = 0;
        $scope.skuList.forEach(function (ele) {
            price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
            size += ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.totalPrice = price;
        $scope.totalSize = size;
    }

    //得到购物车信息
    $scope.getCartInfoInCookie = function () {

        $scope.skuList = new Array;

        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '') {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }

        console.log(cartInfo);
        console.log(cartSize);
        if (cartInfo.length > 0) {
            var params = {};
            params['SHOP_PRODUCT_SKU.SKU_IDS'] = cartInfo.toString();
            productFactory.getProductSkuBySkuIds(params).get({}, function (response) {
                console.log(response);
                $scope.skuList = response.data;
                $scope.skuList.forEach(function (ele) {
                    ele['SHOP_PRODUCT_SKU.SIZE'] = cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                });
                $scope.updateCartPrice();
            })
        } else {
            $scope.updateCartPrice();
        }

    }

    //结算
    $scope.addOrder = function () {
        var list = new Array;
        $scope.skuList.forEach(function (ele) {
            list.push(ele['SHOP_PRODUCT_SKU.SKU_ID']);
        });
        if ($scope.skuList.length > 0) {
            $state.go('order-add', {SKU_IDS: list.toString()});
        }else{
            alert('至少选择一件商品');
        }
    }

    //数量减
    $scope.lessSize = function (item) {
        if (item['SHOP_PRODUCT_SKU.SIZE'] > 1) {
            item['SHOP_PRODUCT_SKU.SIZE'] = item['SHOP_PRODUCT_SKU.SIZE'] - 1;
        }

        //修改cookie
        var cartSize = getCookie('cartSize');
        if (cartSize == '') {
            cartSize = {};
        } else {
            cartSize = JSON.parse(cartSize);
        }
        cartSize[item['SHOP_PRODUCT_SKU.SKU_ID']] -= 1;
        console.log(cartSize);
        setCookie('cartSize', JSON.stringify(cartSize));

        $scope.updateCartPrice();
    }

    //数量加
    $scope.moreSize = function (item) {
        item['SHOP_PRODUCT_SKU.SIZE'] = item['SHOP_PRODUCT_SKU.SIZE'] + 1;

        //修改cookie
        var cartSize = getCookie('cartSize');
        if (cartSize == '') {
            cartSize = {};
        } else {
            cartSize = JSON.parse(cartSize);
        }
        cartSize[item['SHOP_PRODUCT_SKU.SKU_ID']] += 1;
        console.log(cartSize);
        setCookie('cartSize', JSON.stringify(cartSize));

        $scope.updateCartPrice();
    }

    //购物车添加成功
    $scope.addToCartSuccess= function () {
        $scope.getCartInfoInCookie();
    }

});
