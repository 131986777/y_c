/**
 * Created by njwb on 2017/1/12.
 */
angular.module('AndSell.PC.Main').controller('pages_order_confirm_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory, orderFactory, couponFactory, promoFactory, balanceFactory) {

    modalFactory.setTitle("确认下单");

    modalFactory.setHeader(false);

    modalFactory.setSide(false);

    modalFactory.setShowMenu(true);

    modalFactory.setTab(true);

    modalFactory.setLeftMenu(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.money = $stateParams.MONEY;   //优惠券返回的价格
    // $scope.memberCouponId=$stateParams.COUPON_ID;      //  要删除的id

    $scope.initData = function () {

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
        $scope.shopName = $scope.shop['SHOP.SHOP_NAME'];


        $scope.date = $scope.setTime();

        $scope.canCommit = false;

        $scope.pickMan = JSON.parse(getCookie("pickupMan"));


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

        $scope.COUPON_INFO = $stateParams.COUPON_INFO;
        if ($stateParams.COUPON_INFO != '') {
            $scope.coupon = JSON.parse($stateParams.COUPON_INFO);
            console.log($scope.coupon);
        }

        $scope.skuIds = $stateParams.SKU_IDS;
        var params = {};
        var skuIdLists = new Array;
        $scope.skuIds.split(",").forEach(function (ele, index) {
            console.log(index);
            if ($scope.cartSize[ele] > 0) {
                skuIdLists.push(ele);
            }
        })
        if (skuIdLists.length == 0) {
            window.history.back();
            return;
        }
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = skuIdLists.toString();
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
            $scope.skuList = response.data;
            $scope.skulistsForOrder = new Array;
            $scope.totalSize = 0;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE'] = $scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                $scope.totalSize = $scope.totalSize + ele['SHOP_PRODUCT_SKU.SIZE'];
                ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = moneyFormat(ele['SHOP_PRODUCT_SKU.REAL_PRICES']);
                ele.isSelect = false;
                ele.isSale = false;
                $scope.skulistsForOrder.push({
                    'skuId': ele['SHOP_PRODUCT_SKU.SKU_ID'],
                    'classId': ele['SHOP_PRODUCT.CLASS_ID'],
                    'tagIds': ele['SHOP_PRODUCT.TAG_ID'],
                    'num': ele['SHOP_PRODUCT_SKU.SIZE'],
                    'unitPrice': ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * 100
                });
            });
            console.log($scope.skulistsForOrder);
            $scope.calculatePromotion();
        });

        $scope.commitClick = true;
        $scope.queryAccount();
    }

    //计算促销结果
    $scope.calculatePromotion = function () {
        $scope.skulistsForOrder.forEach(function (ele) {                       //四舍五入
            ele['unitPrice'] = Math.round(ele['unitPrice']);
        })
        var cartRequestVO = {'skuVOs': $scope.skulistsForOrder};
        var json = JSON.stringify(cartRequestVO);
        promoFactory.doPromoCalculate({'cartRequestVO': json}, function (response) {
            $scope.planUnitList = response.data;
            $scope.planUnitFilter();
            $scope.bindPromoResult();
            $scope.updateOrderPrice();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

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
                    if (unit['presents'] != null && unit['presents'].length == 1) {
                        if (presentIds != '') {
                            presentIds += ',';
                        }
                        presentIds += unit['presents'][0]['skuId'];
                    }
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
                $scope.planUnitList.forEach(function (unit) {
                    if (unit['skuVOs'] == null || unit['skuVOs'].length == 0) {
                        $scope.presents.forEach(function (present) {
                            if (unit['presents'] == null || unit['presents'].length == 0) {
                                return;
                            }
                            if (unit['presents'][0]['skuId']
                                == present['SHOP_PRODUCT_SKU.SKU_ID']) {
                                $scope.orderPresent = present;
                                $scope.orderPresentNum = unit['presents'][0]['num'];
                            }
                        })
                    }
                });

            });
        }
        $scope.updateOrderPrice();

        if ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
            >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
            $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
        } else {
            $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN';
        }
        $scope.canCommit = true;

    }

    //计算订单价格
    $scope.updateOrderPrice = function () {
        console.log($scope.skuList);
        console.log('-------------');
        var price = 0;
        var new_price = 0;
        $scope.skuList.forEach(function (ele) {
            price += ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] * ele['SHOP_PRODUCT_SKU.SIZE'];
            new_price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.order['SHOP_ORDER.PRICE_PRD'] = price;
        console.log(clone($scope.order['SHOP_ORDER.PRICE_PRD']));
        console.log(clone(new_price));
        var prdPrice = price;
        var salePrice = moneyFormat(price - new_price);
        $scope.order['SHOP_ORDER.PRICE_SALE'] = salePrice; // 促销价格

        $scope.totalMoney = new_price;    //使用优惠券时，传给优惠券的总价 By cxy

        //todo  加入其他优惠和促销的等过滤
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = 0;
        $scope.order['SHOP_ORDER.PRICE_COUPON'] = 0;
        if (salePrice > 0) {
            price -= salePrice;
            if (price <= 0) {
                price = 0.01;
            }
        }
        var price_mark = price;

        //订单促销
        $scope.planUnitList.forEach(function (ele) {
            if (null == ele) {
                return;
            }
            if (ele['skuVOs'] == null || ele['skuVOs'].length == 0) {
                price = ele['afterSumPrice'] / 100;
            }
        })

        if ($scope.coupon != undefined && $scope.coupon.MONEY != undefined) {
            price -= $scope.coupon.MONEY;
            if (price <= 0) {
                price = 0.01;
            }
            $scope.order['SHOP_ORDER.PRICE_COUPON'] = moneyFormat(price_mark - price);
        }
        console.log(clone($scope.order['SHOP_ORDER.PRICE_COUPON']));

        $scope.onSalePrice = moneyFormat(prdPrice - price);
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = $scope.onSalePrice;
        $scope.order['SHOP_ORDER.PRICE_ORDER'] = price;
        $scope.order['SHOP_ORDER.PRICE_OVER'] = price;

    }

    //提交订单
    $scope.commitOrder = function () {
        if (!$scope.canCommit) {
            return;
        }

        if ($scope.order['SHOP_ORDER.PRICE_OVER'] <= 0) {
            modalFactory.showShortAlert('订单异常,请重新下单');
            window.history.back();
            return
        }
        if (isEmptyObject($scope.pickMan)) {
            modalFactory.showShortAlert('请填写提货信息');
            return;
        }

        if ($scope.commitClick) {
            $scope.commitClick = false;

            var params = $scope.order;

            params['SHOP_ORDER.REC_CONTACT'] = $scope.pickMan.man;//收货人
            params['SHOP_ORDER.REC_PHONE'] = $scope.pickMan.phone;//联系电话
            params['SHOP_ORDER.REC_TYPE'] = 2;//收货方式为自提
            params['SHOP_ORDER.SHOP_NAME'] = $scope.shop['SHOP.SHOP_NAME'];//门店信息
            params['SHOP_ORDER.SHOP_ID'] = $scope.shop['SHOP.SHOP_ID'];//门店ID
            params['SHOP_ORDER.GET_PRD_DATETIME'] = $scope.date;//提货时间

            if ($scope.coupon != undefined) {
                params['SHOP_ORDER.COUPON_ID'] = $scope.coupon.ID;
            }
            params['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.skuList);//sku信息
            orderFactory.addOrder(params, function (response) {

                modalFactory.showShortAlert('下单成功');
                //成功之后删除购物车内容
                $scope.skuIds.split(',').forEach(function (ele) {
                    $scope.cartInfo.remove(ele);
                    if ($scope.cartSize[ele] != undefined) {
                        $scope.cartSize[ele] = 0;
                    }
                });
                setCookie('cartSize', JSON.stringify($scope.cartSize));
                setCookie('cartInfo', JSON.stringify($scope.cartInfo));

                modalFactory.updateCart();
                console.log($scope.coupon);
                if ($scope.coupon != undefined) {
                    $scope.descCoupon($scope.coupon.ID);
                }
                $scope.commitClick = true;
                console.log(response);
                window.location.replace("#/pages/order/detail/"
                    + response.extraData.ORDER_ID);

            }, function (response) {
                $scope.commitClick = true;
                modalFactory.showShortAlert(response.msg);
            });
        }

        setCookie("pickupMan", JSON.stringify($scope.pickMan));
    }

    $scope.cardPay = function () {
        if ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
            >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
            $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
        } else {
            modalFactory.showShortAlert('会员卡余额不足，请先充值');
        }
    }

    $scope.wxPay = function () {
        $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN';
    }

    $scope.queryAccount = function () {
        var form = {};
        balanceFactory.queryAccountByUid({}, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
            if ($scope.balanceInfo.length > 0) {

            } else {
                $state.go('pages/login/accountLogin');
                modalFactory.showShortAlert('请使用正确的账号登录');
            }
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.descCoupon = function (id) {
        couponFactory.useCoupon({'MEMBER_COUPON.ID': id}, function (response) {
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
            'pickupPerson': $stateParams.pickupPerson,
            'FROM': 'ADD'
        });
    }

    $scope.setTime = function () {
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
        var todDate = fDate2.getFullYear() + "-" + ifLessTen((fDate2.getMonth() + 1)) + "-" + ifLessTen(fDate2.getDate()) + " " + ifLessTen(fDate2.getHours()) + ":" + ifLessTen(fDate2.getMinutes()) + "-19:00";

        var fDate3 = new Date(fDate.getTime());
        var todDate2 = fDate3.getFullYear() + "-" + ifLessTen((fDate3.getMonth() + 1)) + "-" + ifLessTen(fDate3.getDate()) + " 08:00-19:00";

        var nDate = new Date(fDate.getTime() + 24 * 60 * 60 * 1000);
        var tmoDate = nDate.getFullYear() + "-" + ifLessTen((nDate.getMonth() + 1)) + "-" + ifLessTen(nDate.getDate()) + " 08:00-19:00";

        if (ifToday && ifEarly) {
            return todDate2;
        } else if (ifToday) {
            return todDate;
        } else {
            return tmoDate;
        }
    }
});