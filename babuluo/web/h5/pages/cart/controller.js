AndSellH5MainModule.controller('H5.CartController', function ($scope, $state, productFactory, modalFactory) {

    modalFactory.setTitle('购物车');
    modalFactory.setBottom(false);

    $scope.initData = function () {

        $scope.getCartInfoInCookie();

    }

    $scope.getCartInfoInCookie = function () {
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
                $scope.skuList=response.data;
                $scope.skuList.forEach(function (ele) {
                    setContentsInfo(ele);
                    ele['SHOP_PRODUCT_SKU.SIZE']=cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                    ele.isSelect=false;
                });
                //var skuMap=new Map;
                //response.data.forEach(function (ele) {
                //    skuMap.put(ele['SHOP_PRODUCT_SKU.SKU_ID'],ele);
                //});
            })
        }
    }

    //数量减
    $scope.lessSize = function (item) {
        if (item['SHOP_PRODUCT_SKU.SIZE'] > 1) {
            item['SHOP_PRODUCT_SKU.SIZE']=item['SHOP_PRODUCT_SKU.SIZE']-1;
        }
        $scope.updateCartPrice();
    }

    //数量加
    $scope.moreSize = function (item) {
            item['SHOP_PRODUCT_SKU.SIZE']=item['SHOP_PRODUCT_SKU.SIZE']+1;
        $scope.updateCartPrice();
    }

    //删除购物车商品
    $scope.delShopCart= function (sku) {
        $scope.skuList.remove(sku);
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '') {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }

        cartInfo.remove(sku['SHOP_PRODUCT_SKU.SKU_ID']);
        cartSize[sku['SHOP_PRODUCT_SKU.SKU_ID']]=0;
        setCookie('cartInfo',JSON.stringify(cartInfo));
        setCookie('cartSize',JSON.stringify(cartSize));
    }

    //修改购物车价格
    $scope.updateCartPrice= function () {
        var price=0;
        $scope.skuList.forEach(function (ele) {
           if(ele.isSelect){
               price+=ele['SHOP_PRODUCT_SKU.REAL_PRICES']*ele['SHOP_PRODUCT_SKU.SIZE'];
           }
        });
        console.log(price);
        $scope.totalPrice=price;
    }

    //选择商品
    $scope.checkItem= function (sku) {
        sku.isSelect = !sku.isSelect;
        $scope.updateCartPrice();
    }

    //购物车全选/取消全选
    $scope.checkAllPrd= function () {
        $scope.checkAll=!$scope.checkAll;
        $scope.skuList.forEach(function (ele) {
            ele.isSelect=$scope.checkAll;
        });
        $scope.updateCartPrice();
    }

});
