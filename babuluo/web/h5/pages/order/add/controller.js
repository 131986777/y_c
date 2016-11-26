angular.module('AndSell.H5.Main').controller('pages_order_add_Controller', function ($scope, $state, $stateParams, weUI, productFactory, orderFactory, modalFactory, weUI) {

    modalFactory.setTitle('新增订单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.money = $stateParams.MONEY;   //优惠券返回的价格
    // $scope.memberCouponId=$stateParams.COUPON_ID;      //  要删除的id

    $scope.initData = function () {

        $scope.cookiePickupPerson = JSON.parse(getCookie("pickupPerson"));

        console.log($scope.cookiePickupPerson);

        $scope.EmptyPick = isEmptyObject($scope.cookiePickupPerson);
        if (!$scope.EmptyPick) {
            $scope.cookiePickupPerson.getTime = setTime();
        }

        $scope.order = {};
        $scope.cartInfo = getCookie('cartInfo');
        $scope.cartSize = getCookie('cartSize');
        if ($scope.cartInfo == '') {
            $scope.cartInfo = new Array;
            $scope.cartSize = {};
        } else {
            $scope.cartInfo = JSON.parse($scope.cartInfo);
            $scope.cartSize = JSON.parse($scope.cartSize);
        }

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));

        $scope.COUPON_INFO = $stateParams.COUPON_INFO;
        if ($stateParams.COUPON_INFO != '') {
            $scope.coupon = JSON.parse($stateParams.COUPON_INFO);
            console.log($scope.coupon);
        }

        $scope.skuIds = $stateParams.SKU_IDS;
        weUI.toast.showLoading('正在查询促销条件');
        var params = {};
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = $scope.skuIds;
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
            $scope.skuList = response.data;
            var skulistsForOrder = new Array;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE'] = $scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
                ele.isSelect = false;
                skulistsForOrder.push({
                    'prdId':ele['SHOP_PRODUCT_SKU.PRD_ID'],
                    'num':ele['SHOP_PRODUCT_SKU.SIZE'],
                    'price':ele['SHOP_PRODUCT_SKU.REAL_PRICES']
                });
            });
            $scope.calculateSaleInfo(skulistsForOrder);
            $scope.updateOrderPrice();
        });

        $scope.commitClick = true;

    }

    //计算销售信息
    $scope.calculateSaleInfo = function(list){
        orderFactory.calculateSale({'ORDER_PRD_LIST':JSON.stringify(list)}, function (response) {
            var newPrdListInOrder=objectToArray(response.extraData.newOrder);
            var newPriceMap = {};
            newPrdListInOrder.forEach(function (ele) {
                newPriceMap[ele['prdId']]=ele['price'];
            });
            $scope.skuList.forEach(function (ele) {
                if(ele['SHOP_PRODUCT_SKU.REAL_PRICES'] != newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']]){
                    //价格不一致 参与了促销
                    ele.isSale = true;
                }
                ele['SHOP_PRODUCT_SKU.REAL_PRICES'] = newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']];
            });
            weUI.toast.hideLoading();
            $scope.updateOrderPrice();
        });
    }

    //计算订单价格  未做优惠促销等逻辑
    $scope.updateOrderPrice = function () {
        var price = 0;
        var new_price = 0;
        $scope.skuList.forEach(function (ele) {
            price += ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] * ele['SHOP_PRODUCT_SKU.SIZE'];
            new_price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.order['SHOP_ORDER.PRICE_PRD'] = price;

        var salePrice= price - new_price;
        $scope.order['SHOP_ORDER.PRICE_SALE'] = salePrice; // 促销价格

        $scope.totalMoney = new_price;    //使用优惠券时，传给优惠券的总价 By cxy

        //todo  加入其他优惠和促销的等过滤
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = 0;
        if(salePrice>0){
            $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] += salePrice;
            price -= salePrice;
        }

        if ($scope.coupon != undefined) {
            $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] += $scope.coupon.MONEY;
            price -= $scope.coupon.MONEY;
        }
        $scope.order['SHOP_ORDER.PRICE_ORDER'] = price;
        $scope.order['SHOP_ORDER.PRICE_OVER'] = price;
    }

    //提交订单
    $scope.commitOrder = function () {

        if (isEmptyObject($scope.cookiePickupPerson)) {
            weUI.toast.error('请填写提货信息');
            return;
        }

        if ($scope.commitClick) {
            $scope.commitClick = false;
            weUI.toast.showLoading('正在下单');

            var params = $scope.order;
            params['SHOP_ORDER.TYPE'] = $scope.cookiePickupPerson.type;//订货单
            if ($scope.cookiePickupPerson.type
                == 3
                && $scope.order['SHOP_ORDER.PAY_TYPE']
                == 'FACE') {
                params['SHOP_ORDER.TYPE'] = 4;//自提付款单
            }
            params['SHOP_ORDER.REC_CONTACT'] = $scope.cookiePickupPerson.man;//收货人
            params['SHOP_ORDER.REC_PHONE'] = $scope.cookiePickupPerson.phone;//联系电话
            if ($scope.cookiePickupPerson.type == 1) {
                params['SHOP_ORDER.REC_TYPE'] = 1;//收货方式为快递
                params['SHOP_ORDER.REC_ADDR'] = noUndefinedAndNull($scope.cookiePickupPerson.shengshi)
                    + noUndefinedAndNull($scope.cookiePickupPerson.address);//收货地址
                params['SHOP_ORDER.GET_PRD_DATETIME'] = $scope.cookiePickupPerson.getTime;//送货时间
            } else {
                params['SHOP_ORDER.REC_TYPE'] = 2;//收货方式为自提
                params['SHOP_ORDER.SHOP_NAME'] = $scope.shop['SHOP.SHOP_NAME'];//门店信息
                params['SHOP_ORDER.SHOP_ID'] = $scope.shop['SHOP.SHOP_ID'];//门店ID
                params['SHOP_ORDER.GET_PRD_DATETIME'] = noUndefinedAndNull($scope.cookiePickupPerson.getTime);//提货时间
            }

            params['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.skuList);//sku信息
            orderFactory.addOrder(params, function (response) {

                weUI.toast.hideLoading();

                weUI.toast.ok('下单成功');
                //成功之后删除购物车内容
                $scope.skuIds.split(',').forEach(function (ele) {
                    $scope.cartInfo.remove(ele);
                    if ($scope.cartSize[ele] != undefined) {
                        $scope.cartSize[ele] = 0;
                    }
                });
                setCookie('cartSize', JSON.stringify($scope.cartSize));
                setCookie('cartInfo', JSON.stringify($scope.cartInfo));

                if ($scope.COUPON_INFO != '') {
                    $scope.descCoupon($scope.coupon.ID);
                }
                $scope.commitClick = true;
                //$state.go('pages/payment/check_out', {ORDER_ID: response.extraData.ORDER_ID});
                $state.go('pages/order/detail', {ORDER_ID: response.extraData.ORDER_ID,FROM:'Add'});

            }, function (response) {
                weUI.toast.hideLoading();
                $scope.commitClick = true;
                weUI.toast.error(response.msg);
            });
        }
    }

    $scope.descCoupon = function (id) {
        orderFactory.deleteCoupon({'MEMBER_COUPON.ID': id}, function (response) {
            if (response.code == 0) {
                console.log('删除成功');
            }

        });
    }

    $scope.goCoupon = function () {
        $state.go('pages/order/addCoupon', {
            PRODUCTS: JSON.stringify($scope.skuList),
            MONEY: $scope.totalMoney,
            'SKU_IDS': $stateParams.SKU_IDS,
            'pickupPerson': $stateParams.pickupPerson
        });
    }

    function setTime() {
        var fDate = new Date();

        var ifToday = true;
        var modeTime = true;
        var ifEarly = false;
        if (fDate.getHours() >= 19) {
            ifToday = false;
        } else if (fDate.getHours() == 18) {
            if (fDate.getMinutes() >= 30) {
                modeTime = false;
            }
        }
        if (fDate.getHours() < 7) {
            ifEarly = true;
        } else if (fDate.getHours() == 7) {
            if (fDate.getMinutes() < 30) {
                ifEarly = true;
            }
        }

        var fDate2 = new Date(fDate.getTime());
        if (modeTime) {
            fDate2 = new Date(fDate.getTime() + 30 * 60 * 1000);
        }
        var todDate = fDate2.getFullYear()
            + "-"
            + ifLessTen((fDate2.getMonth() + 1))
            + "-"
            + ifLessTen(fDate2.getDate())
            + " "
            + ifLessTen(fDate2.getHours())
            + ":"
            + ifLessTen(fDate2.getMinutes())
            + "-19:00";

        var fDate3 = new Date(fDate.getTime());
        var todDate2 = fDate3.getFullYear()
            + "-"
            + ifLessTen((fDate3.getMonth() + 1))
            + "-"
            + ifLessTen(fDate3.getDate())
            + " 08:00-19:00";

        var nDate = new Date(fDate.getTime() + 24 * 60 * 60 * 1000);
        var tmoDate = nDate.getFullYear()
            + "-"
            + ifLessTen((nDate.getMonth() + 1))
            + "-"
            + ifLessTen(nDate.getDate())
            + " 08:00-19:00";

        if (ifToday && ifEarly) {
            return todDate2;
        } else if (ifToday) {
            return todDate;
        } else {
            return tmoDate;
        }
    }

});
