angular.module('AndSell.PC.Main').controller('pages_cart_Controller', function (productFactory, $interval, $scope, $state, modalFactory, promoFactory) {

    modalFactory.setTitle("购物车");

    modalFactory.setHeader(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
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
                $scope.skulistsForOrder = new Array;
                $scope.beforePrice = 0;
                $scope.skuList.forEach(function (ele) {
                    setContentsInfo(ele);
                    ele['SHOP_PRODUCT_SKU.SIZE'] = cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                    $scope.beforePrice = $scope.beforePrice + (ele['SHOP_PRODUCT_SKU.SIZE'] * ele['SHOP_PRODUCT_SKU.REAL_PRICES']);
                    ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
                    ele.isSale = false;
                    ele.isSelect = false;
                    $scope.skulistsForOrder.push({
                        'skuId': ele['SHOP_PRODUCT_SKU.SKU_ID'],
                        'classId': ele['SHOP_PRODUCT.CLASS_ID'],
                        'tagIds': ele['SHOP_PRODUCT.TAG_ID'],
                        'num': ele['SHOP_PRODUCT_SKU.SIZE'],
                        'unitPrice': ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * 100
                    });
                    //skulistsForOrder.push({
                    //    'prdId': ele['SHOP_PRODUCT_SKU.PRD_ID'],
                    //    'num': ele['SHOP_PRODUCT_SKU.SIZE'],
                    //    'price': ele['SHOP_PRODUCT_SKU.REAL_PRICES']
                    //});
                });
                //$scope.calculateSaleInfo(skulistsForOrder);
                $scope.calculatePromotion();
                $scope.checkAllPrd();
            })
        }
        $scope.updateCartPrice();
    }

    //计算促销结果
    $scope.calculatePromotion = function () {
        $scope.skulistsForOrder.forEach(function (ele) {                       //四舍五入
            ele['unitPrice'] = Math.round(ele['unitPrice']);
        });
        var cartRequestVO = {'skuVOs': $scope.skulistsForOrder};
        var json = JSON.stringify(cartRequestVO);
        promoFactory.doPromoCalculate({'cartRequestVO': json}, function (response) {

            $scope.planUnitList = response.data;
            $scope.planUnitFilter();
            $scope.bindPromoResult();
            $scope.updateCartPrice();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    //筛选planUnit
    $scope.planUnitFilter = function () {
        for (var i = 0; i < $scope.planUnitList.length; i++) {
            if (undefined != $scope.planUnitList[i]) {
                if ($scope.planUnitList[i]['state'] != "checked") {
                    $scope.planUnitList.splice(i, 1)
                    i--;
                }
            }
        }
    }

    $scope.bindPromoResult = function () {
        var presentIds = '';
        $scope.skuList.forEach(function (ele) {
            $scope.planUnitList.forEach(function (unit) {
                if (null == unit) {
                    return;
                }
                if (unit['skuVOs'] == null || unit['skuVOs'].length == 0) {
                    return;
                }
                if (ele['SHOP_PRODUCT_SKU.SKU_ID'] == unit['skuVOs'][0]['skuId']) {
                    ele['planUnit'] = unit;
                    ele['isSale'] = true;
                    ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
                    ele['SHOP_PRODUCT_SKU.REAL_PRICES'] = unit['afterSumPrice']
                        / 100
                        / unit['skuVOs'][0]['num'];
                    if (unit['presents'] != null && unit['presents'].length == 1) {
                        if (presentIds != '') {
                            presentIds += ',';
                        }
                        presentIds += unit['presents'][0]['skuId'];
                    }
                }

            })
        })
        if (presentIds != '') {
            productFactory.getPresentsBySkuIds({'SHOP_PRODUCT_SKU.SKU_IDS': presentIds}, function (response) {
                $scope.presents = response.data;
                $scope.skuList.forEach(function (ele) {
                    $scope.presents.forEach(function (present) {
                        if (ele['planUnit'] == null) {
                            return;
                        }
                        if (null == ele['planUnit']['presents']) {
                            return;
                        }
                        if (ele['planUnit']['presents'][0]['skuId']
                            == present['SHOP_PRODUCT_SKU.SKU_ID']) {
                            ele['present'] = present;
                            ele['hasPresent'] = true;
                        } else {
                            ele['hasPresent'] = false;
                        }
                    })
                })
            });
        }

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

            //$scope.updateCartPrice();
            $scope.getCartInfoInCookie();
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

            //$scope.updateCartPrice();
            $scope.getCartInfoInCookie();
        } else {
            modalFactory.showShortAlert('已达到该商品最大库存数');
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
        //$scope.updateCartPrice();
        $scope.getCartInfoInCookie();
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
            var existNoStockPrd = false;
            $scope.skuList.forEach(function (ele) {
                if (ele.isSelect) {
                    if (ele['SHOP_PRODUCT_SKU.STOCK'] > 0) {
                        list.push(ele['SHOP_PRODUCT_SKU.SKU_ID']);
                    } else {
                        existNoStockPrd = true;
                    }
                }
            });
            if (existNoStockPrd) {
                modalFactory.showShortAlert('存在售罄商品');
            } else {
                $state.go('pages/order/add', {SKU_IDS: list.toString()});
            }
        } else {
            modalFactory.showShortAlert('至少选择一项');
        }
    }

});

