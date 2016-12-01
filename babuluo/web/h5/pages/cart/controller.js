angular.module('AndSell.H5.Main').controller('pages_cart_Controller', function ($scope, $state, orderFactory, productFactory, weUI, modalFactory) {

    modalFactory.setTitle('购物车');
    modalFactory.setBottom(true);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        //$(".haha").css("height", document.documentElement.clientHeight - 100);
        //var div=document.getElementById('haha');
        //div.style.height = "250px";
        //document.getElementById('cartout').style.cssText= 'height : 100 px';

        $(".product-list").css("min-height", document.documentElement.clientHeight - 100);
        modalFactory.setCurrentPage('cart');

        if (getCookie('currentShopInfo') == undefined) {
            $state.go('pages/shop');
        }

        $scope.getCartInfoInCookie();

    }

    $scope.toDetail = function (id) {
        $state.go('pages/product/detail', {PRD_ID: id});
    }

    $scope.getCartInfoInCookie = function () {
        $scope.skuList = new Array;
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }
        if (cartInfo.length > 0) {

            var params = {};
            params['SHOP_PRODUCT_SKU.SKU_IDS'] = cartInfo.toString();
            params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
            productFactory.getProductSkuBySkuIds(params, function (response) {
                $scope.skuList = response.data;
                var skulistsForOrder = new Array;
                $scope.skuList.forEach(function (ele) {
                    setContentsInfo(ele);
                    ele['SHOP_PRODUCT_SKU.SIZE'] = cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                    ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
                    ele.isSale = false;
                    ele.isSelect = false;
                    skulistsForOrder.push({
                        'prdId': ele['SHOP_PRODUCT_SKU.PRD_ID'],
                        'num': ele['SHOP_PRODUCT_SKU.SIZE'],
                        'price': ele['SHOP_PRODUCT_SKU.REAL_PRICES']
                    });
                });
                $scope.calculateSaleInfo(skulistsForOrder);
                $scope.checkAllPrd();
            })
        }
        $scope.updateCartPrice();
    }

    //计算销售信息
    $scope.calculateSaleInfo = function (list) {
        weUI.toast.showLoading('正在查询促销条件');
        orderFactory.calculateSale({'ORDER_PRD_LIST': JSON.stringify(list)}, function (response) {
            var newPrdListInOrder = objectToArray(response.extraData.newOrder);
            var newPriceMap = {};
            newPrdListInOrder.forEach(function (ele) {
                newPriceMap[ele['prdId']] = ele['price'];
            });

            $scope.skuList.forEach(function (ele) {
                if (newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']] != undefined) {
                    if (ele['SHOP_PRODUCT_SKU.REAL_PRICES']
                        != newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']]) {
                        //价格不一致 参与了促销
                        ele.isSale = true;
                    }
                    ele['SHOP_PRODUCT_SKU.REAL_PRICES'] = newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']];
                }
            });
            weUI.toast.hideLoading();
            $scope.updateCartPrice();
        }, function (response) {
            weUI.toast.hideLoading();
        });
    }

    //数量减
    $scope.lessSize = function (item) {
        if (item['SHOP_PRODUCT_SKU.SIZE'] > 1) {
            item['SHOP_PRODUCT_SKU.SIZE'] = item['SHOP_PRODUCT_SKU.SIZE'] - 1;
            //修改cookie
            var cartSize = getCookie('cartSize');
            if (cartSize == '' || cartSize == undefined) {
                cartSize = {};
            } else {
                cartSize = JSON.parse(cartSize);
            }

            cartSize[item['SHOP_PRODUCT_SKU.SKU_ID']] -= 1;
            setCookie('cartSize', JSON.stringify(cartSize));

            $scope.updateCartPrice();
        }
    }

    //数量加
    $scope.moreSize = function (item) {
        if (item['SHOP_PRODUCT_SKU.SIZE'] < item['SHOP_PRODUCT_SKU.STOCK']) {
            item['SHOP_PRODUCT_SKU.SIZE'] = item['SHOP_PRODUCT_SKU.SIZE'] + 1;

            //修改cookie
            var cartSize = getCookie('cartSize');
            if (cartSize == '' || cartSize == undefined) {
                cartSize = {};
            } else {
                cartSize = JSON.parse(cartSize);
            }
            cartSize[item['SHOP_PRODUCT_SKU.SKU_ID']] += 1;
            setCookie('cartSize', JSON.stringify(cartSize));

            $scope.updateCartPrice();
        } else {
            weUI.toast.ok('已达到该商品最大库存数');
        }
    }

    //删除购物车商品
    $scope.delShopCart = function (sku) {
        $scope.skuList.remove(sku);
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }

        cartInfo.remove(sku['SHOP_PRODUCT_SKU.SKU_ID']);
        cartSize[sku['SHOP_PRODUCT_SKU.SKU_ID']] = 0;
        setCookie('cartInfo', JSON.stringify(cartInfo));
        setCookie('cartSize', JSON.stringify(cartSize));
        $scope.updateCartPrice();
    }

    //更新购物车价格
    $scope.updateCartPrice = function () {
        var price = 0;
        var size = 0;
        if ($scope.skuList != undefined) {
            $scope.skuList.forEach(function (ele) {
                if (ele.isSelect) {
                    price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
                    size += ele['SHOP_PRODUCT_SKU.SIZE'];
                }
            });
        }
        $scope.totalPrice = price;
        $scope.totalSize = size;
        modalFactory.updateCart();
    }

    //选择商品
    $scope.checkItem = function (sku) {
        sku.isSelect = !sku.isSelect;
        $scope.updateCartPrice();
    }

    //购物车全选/取消全选
    $scope.checkAllPrd = function () {
        $scope.checkAll = !$scope.checkAll;
        $scope.skuList.forEach(function (ele) {
            ele.isSelect = $scope.checkAll;
        });
        $scope.updateCartPrice();
    }

    //结算
    $scope.addOrder = function () {
        if ($scope.totalSize > 0) {
            var list = new Array;
            $scope.skuList.forEach(function (ele) {
                if (ele.isSelect) {
                    if (ele['SHOP_PRODUCT_SKU.STOCK'] > 0) {
                        list.push(ele['SHOP_PRODUCT_SKU.SKU_ID']);
                    } else {
                        weUI.toast.error('存在售罄商品');
                        return;
                    }
                }
            });
            $state.go('pages/order/add', {SKU_IDS: list.toString()});
        } else {
            weUI.toast.info('至少选择一项');
        }
    }

});
