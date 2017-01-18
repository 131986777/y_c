
angular.module('AndSell.H5.Main').controller('pages_order_detail_Controller', function ($scope, $state, $stateParams, $q, couponFactory,balanceFactory, http, weUI, productFactory, promoFactory, orderFactory, modalFactory) {


    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        modalFactory.setCurrentPage('wd');

        var deferred_account = $q.defer();
        var deferred_price = $q.defer();

        $scope.getOrder($stateParams.ORDER_ID, deferred_price);
        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
        $scope.queryAccount(deferred_account);

        var promise = $q.all([deferred_price.promise, deferred_account.promise]);

        promise.then(function (result) {

            $scope.COUPON_INFO = $stateParams.COUPON_INFO;
            if ($stateParams.COUPON_INFO != '') {
                $scope.coupon = JSON.parse($stateParams.COUPON_INFO);
                if ($scope.coupon != undefined && $scope.coupon.MONEY != undefined) {
                    var price_mark = $scope.order['SHOP_ORDER.PRICE_OVER'];
                    var price = $scope.order['SHOP_ORDER.PRICE_OVER'];
                    price -= $scope.coupon.MONEY;
                    if (price <= 0) {
                        price = 0.01;
                    }
                    $scope.order['SHOP_ORDER.PRICE_COUPON'] = moneyFormat(price_mark - price);
                    $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] += Number($scope.order['SHOP_ORDER.PRICE_COUPON']);
                    $scope.order['SHOP_ORDER.PRICE_OVER'] -= Number($scope.order['SHOP_ORDER.PRICE_COUPON']);
                    $scope.order['SHOP_ORDER.COUPON_ID'] = $scope.coupon.ID;
                }

            }

            if ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
                >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
                $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
            } else {
                $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN';
            }
        });

    }

    $scope.initCartRequestVO = function (deferred) {
        $scope.skulistsForOrder = [];
        $scope.orderDetailList.forEach(function (detail) {
            $scope.skulistsForOrder.push({
                'skuId': detail['SHOP_ORDER_INFO.SKU_ID'],
                'classId': detail['SHOP_ORDER_INFO.CLASS_ID'],
                'tagIds': detail['SHOP_ORDER_INFO.TAG_ID'],
                'num': detail['SHOP_ORDER_INFO.COUNT'],
                'unitPrice': detail['SHOP_ORDER_INFO.PRICE_NOW'] * 100
            });
        });
        if (($scope.order['SHOP_ORDER.STATE_ORDER']
            == 1
            && $scope.order['SHOP_ORDER.TYPE']
            == '5'
            && $scope.order['SHOP_ORDER.STATE_OUT']
            == 1
            && $scope.order['SHOP_ORDER.STATE_MONEY']
            == -1)||($scope.order['SHOP_ORDER.STATE_ORDER']
            == 1
            && $scope.order['SHOP_ORDER.TYPE']
            == '3'
            && $scope.order['SHOP_ORDER.STATE_MONEY']
            == -1)) {
            $scope.calculatePromotion(deferred);
        } else {
            $scope.bindPresent(deferred);
        }
    }

    $scope.calculatePromotion = function (deferred) {
        weUI.toast.showLoading('正在查询促销条件');
        $scope.skulistsForOrder.forEach(function (ele) {                       //四舍五入
            ele['unitPrice'] = Math.round(ele['unitPrice']);
        })
        var cartRequestVO = {'skuVOs': $scope.skulistsForOrder};
        var json = JSON.stringify(cartRequestVO);
        promoFactory.doPromoCalculate({'cartRequestVO': json}, function (response) {
            $scope.planUnitList = response.data;
            $scope.sumPrice();
            $scope.bindUnit();
            $scope.getPresent();
            deferred.resolve();
            weUI.toast.hideLoading();
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.bindUnit = function () {
        $scope.orderDetailList.forEach(function (ele) {
            $scope.planUnitList.forEach(function (unit) {
                if (null == unit) {
                    return;
                }
                if (unit['skuVOs'] != null) {
                    if (ele['SHOP_ORDER_INFO.SKU_ID'] == unit['skuVOs'][0]['skuId']) {
                        ele['planUnit'] = unit;
                        ele['SHOP_ORDER_INFO.PRICE_NOW'] = unit['afterSumPrice']
                            / 100
                            / unit['skuVOs'][0]['num'];
                    }
                }
            })
        })
    }

    $scope.sumPrice = function () {
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = 0;
        $scope.planUnitList.forEach(function (unit) {
            if (unit == null) {
                return
            }
            $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] += (unit['beforeSumPrice']
                - unit['afterSumPrice']) / 100
        });
        console.log('zkl');
        console.log($scope.order['SHOP_ORDER.PRICE_DISCOUNT']);
        $scope.order['SHOP_ORDER.PRICE_SALE'] = $scope.order['SHOP_ORDER.PRICE_DISCOUNT'];
        $scope.order['SHOP_ORDER.PRICE_OVER'] = $scope.order['SHOP_ORDER.PRICE_OVER']
            - $scope.order['SHOP_ORDER.PRICE_DISCOUNT']
    }

    $scope.getPresent = function () {
        var presentIds = "";
        $scope.planUnitList.forEach(function (unit) {
            if (null == unit) {
                return;
            }
            if (unit['presents'] != null && unit['presents'].length == 1) {
                if (presentIds != '') {
                    presentIds += ',';
                }
                presentIds += unit['presents'][0]['skuId'];
            }
        });
        if (presentIds != '') {
            productFactory.getPresentsBySkuIds({'SHOP_PRODUCT_SKU.SKU_IDS': presentIds}, function (response) {
                $scope.presents = response.data;
                $scope.presentMap = {};
                $scope.planUnitList.forEach(function (unit) {
                    if (null == unit) {
                        return;
                    }
                    if (null == unit['presents'] || unit['presents'].length < 1) {
                        return;
                    }
                    $scope.presents.forEach(function (present) {
                        if (unit['presents'][0]['skuId'] == present['SHOP_PRODUCT_SKU.SKU_ID']) {
                            present['isPresent'] = true;
                            if (unit['skuVOs'] == null || unit['skuVOs'].length == 0) {
                                present['orderOrPrd'] = "order";
                                $scope.presentMap['order'] = present;
                                $scope.orderPresentNum = unit['presents'][0]['num'];
                            } else {
                                present['orderOrPrd'] = "prd";
                                present['blongToSkuId'] = unit['skuVOs'][0]['skuId'];
                                $scope.presentMap[present['blongToSkuId']] = present;
                            }
                            present['SHOP_PRODUCT_SKU.SIZE'] = unit['presents'][0]['num']

                        }
                    })
                })
            });
        }
    }

    $scope.addDetail = function (present) {
        var orderDetail = {};
        //orderDetail['SHOP_ORDER_INFO.ORDER_ID'] = orderId;
        orderDetail['SHOP_ORDER_INFO.SERVICE_ID'] = present['SHOP_PRODUCT.SERVICE_ID'];
        orderDetail['SHOP_ORDER_INFO.PRD_ID'] = present['SHOP_PRODUCT.PRD_ID'];
        orderDetail['SHOP_ORDER_INFO.SPU'] = present['SHOP_PRODUCT.PRD_SPU'];
        orderDetail['SHOP_ORDER_INFO.SKU'] = present['SHOP_PRODUCT_SKU.PRD_SKU'];
        orderDetail['SHOP_ORDER_INFO.PRD_NAME'] = present['SHOP_PRODUCT.PRD_NAME'];
        orderDetail['SHOP_ORDER_INFO.SKU_1_NAME'] = present['SHOP_PRODUCT_SKU.SKU_NAME1'];
        orderDetail['SHOP_ORDER_INFO.SKU_1_VALUE'] = present['SHOP_PRODUCT_SKU.SKU_CONTENT1'];
        orderDetail['SHOP_ORDER_INFO.SKU_2_NAME'] = present['SHOP_PRODUCT_SKU.SKU_NAME2'];
        orderDetail['SHOP_ORDER_INFO.SKU_2_VALUE'] = present['SHOP_PRODUCT_SKU.SKU_CONTENT2'];
        orderDetail['SHOP_ORDER_INFO.SKU_3_NAME'] = present['SHOP_PRODUCT_SKU.SKU_NAME3'];
        orderDetail['SHOP_ORDER_INFO.SKU_3_VALUE'] = present['SHOP_PRODUCT_SKU.SKU_CONTENT3'];
        orderDetail['SHOP_ORDER_INFO.UNIT'] = present['SHOP_PRODUCT.UNIT_NAME'];
        orderDetail['SHOP_ORDER_INFO.IMG_URL'] = present['SHOP_PRODUCT.CMP'];
        orderDetail['SHOP_ORDER_INFO.CLASS_ID'] = present['SHOP_PRODUCT.CLASS_ID'];
        orderDetail['SHOP_ORDER_INFO.PRICE_OLD'] = Number(present['SHOP_PRODUCT_SKU.PRICE']).toFixed(2);
        orderDetail['SHOP_ORDER_INFO.PRICE_NOW'] = Number(present['SHOP_PRODUCT_SKU.REAL_PRICES']).toFixed(2);
        orderDetail['SHOP_ORDER_INFO.PRICE_SUM'] = Number(present['SHOP_PRODUCT_SKU.REAL_PRICES']).toFixed(2);
        orderDetail['SHOP_ORDER_INFO.COUNT'] = present['SHOP_PRODUCT_SKU.SIZE'];
        orderDetail['SHOP_ORDER_INFO.REMARK'] = '';
        //orderDetail['SHOP_ORDER_INFO.REPOS_ID'] = storeId; //todo order REPOS_ID
        orderDetail['SHOP_ORDER_INFO.OUT_COUNT'] = 0;
        orderDetail['SHOP_ORDER_INFO.SPU_TYPE'] = present['SHOP_PRODUCT.REMARK'];
        orderDetail['SHOP_ORDER_INFO.SKU_ID'] = present['SHOP_PRODUCT_SKU.SKU_ID'];
        orderDetail['SHOP_ORDER_INFO.TAG_ID'] = present['SHOP_PRODUCT.TAG_ID'];
        orderDetail['SHOP_ORDER_INFO.BAR_CODE'] = present['SHOP_PRODUCT_SKU.BAR_CODE'];
        orderDetail['isPresent'] = present['isPresent'];
        orderDetail['orderOrPrd'] = present['orderOrPrd'];
        orderDetail['blongToSkuId'] = present['blongToSkuId'];
        $scope.orderDetailList.push(orderDetail);
    };

    $scope.bindPresent = function (deferred) {
        $scope.presentMap = {};
        $scope.orderDetailList.forEach(function (detail) {
            if (detail['isPresent'] == null) {
                return
            }
            if (detail['orderOrPrd'] == "prd") {
                $scope.presentMap[detail['blongToSkuId']] = detail;
            } else if (detail['orderOrPrd'] == "order") {
                $scope.presentMap['order'] = detail;
            }
        });
        deferred.resolve();
    };

    $scope.cardPayChecked = function () {
        if ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
            >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
            $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
        } else {
            weUI.toast.info('会员卡余额不足，请先充值');
        }
    };

    $scope.wxPayChecked = function () {
        $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN';
    };

    $scope.queryAccount = function (deferred) {
        var form = {};
        balanceFactory.queryAccountByUid({}, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
            if ($scope.balanceInfo.length > 0) {
                deferred.resolve();
            } else {
                $state.go('pages/user/accountLogin');
                weUI.toast.error('请使用正确的账号登录');
            }
        }, function (response) {
            weUI.toast.error(response.msg);
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
            'PRODUCTS': $scope.order['SHOP_ORDER.ORDER_INFO'],
            'MONEY': $scope.order['SHOP_ORDER.PRICE_OVER'],
            'ORDER_ID': $scope.order['SHOP_ORDER.ID']
        });
    }

    $scope.getOrder = function (id, deferred) {
        orderFactory.getOrderById({'SHOP_ORDER.ID': id}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.orderDetailList = JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order = response.data[0];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
            $scope.initCartRequestVO(deferred);
            //$scope.bindPresent();
        });
    }

    //取消订单
    $scope.cancelOrder = function () {
        weUI.dialog.confirm("提示", "确认取消该订单", function () {
            weUI.toast.showLoading('正在取消');
            orderFactory.cancelOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                weUI.toast.hideLoading();
                weUI.toast.ok('取消订单成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            }, function (response) {
                weUI.toast.hideLoading();
                weUI.toast.error(response.msg);
            });
        });
    }

    //确认提货
    $scope.getPrdNow = function () {
        weUI.dialog.confirm("提示", "确认提货", function () {
            orderFactory.acceptOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                if (response.code == 0) {
                    weUI.toast.ok('收货成功');
                    $scope.getOrder($scope.order['SHOP_ORDER.ID']);
                } else {
                    weUI.toast.error(response.msg);
                }
            });
        });
    }

    $scope.delCoupon= function () {
        if ($scope.coupon != undefined) {
            $scope.descCoupon($scope.coupon.ID);
        }
    }

    //立即支付
    $scope.payNow = function () {
        //alert(getCookie('openId'));
        /**
         * 如果是需要微信支付的类型
         * 调用微信统一下单的接口
         */
        if ($scope.presents != undefined) {
            $scope.presents.forEach(function (present) {
                $scope.addDetail(present);
            })
        }
        $scope.order['SHOP_ORDER.ORDER_INFO'] = JSON.stringify($scope.orderDetailList);
        if ($scope.order['SHOP_ORDER.PAY_TYPE'] == 'WEIXIN') {
            var ip = getCookie('ip');
            var openId = getCookie('openId');
            var formData = {
                PRODUCT_ID: $scope.order['SHOP_ORDER.ID'],
                FEE: moneyToFee($scope.order['SHOP_ORDER.PRICE_OVER']),
                BODY: 'ORDER:' + $scope.order['SHOP_ORDER.ORDER_NUM'],
                OPENID: openId,
                IP: ip,
                ORDER_ID: $scope.order['SHOP_ORDER.ID'],
                TYPE: 'ORDER'
            };

            wxPay(formData);

        } else if ($scope.order['SHOP_ORDER.PAY_TYPE'] == 'ACCOUNT') {
            $scope.cardModalShow = true;
        }
    };

    $scope.cardPay = function () {
        console.log(getCookie("payCard"));
        $scope.payCard = JSON.parse(getCookie("payCard"));
        if (!isEmptyObject($scope.payCard)) {
            weUI.dialog.confirm("提示", "确认支付该订单？", function () {
                weUI.toast.showLoading('正在支付');
                var form = $scope.order;
                form['SHOP_ORDER.ID'] = $scope.order['SHOP_ORDER.ID'];
                form['SHOP_ORDER.CARD_ID'] = $scope.payCard['MEMBER_CARD.CARD_ID'];
                form['SHOP_ORDER.CARD_NO'] = $scope.payCard['MEMBER_CARD.CARD_NO'];
                form['SHOP_ORDER.CARD_BALANCE'] = $scope.payCard['MEMBER_CARD.BALANCE'];
                console.log(form);
                orderFactory.payOrder(form, function (response) {
                    weUI.toast.hideLoading();
                    weUI.toast.ok('支付成功');
                    $scope.cardModalShow = false;
                    $scope.delCoupon();
                    $state.go("pages/personal");
                }, function (response) {
                    weUI.toast.hideLoading();
                    weUI.toast.error(response.msg);
                });
            }, function () {

            });
        } else {
            weUI.toast.info("请选择一张会员卡支付");
        }

    };

    $scope.toDetail = function (id) {
        $state.go('pages/product/detail', {PRD_ID: id});
    }

    //评价订单
    $scope.commentOrder = function () {
        $state.go('pages/order/review', {ID: $scope.order['SHOP_ORDER.ID']});
    };

    /**
     * 把金额从单位元 转换到分
     * @param money
     * @returns {Number}
     */
    function moneyToFee(money) {
        return parseInt(money * 100);
    }

    function wxPay(formData) {
        orderFactory.wxPayUndefinedOrder(formData, function (response) {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady(response.extraData.unifiedOrderJsonResult, response.extraData.returnMap);
            }
        }, function (res) {
            weUI.wx_pay.error("支付失败");
        });

        //orderFactory.wxPayUndefinedOrderForPC(formData, function (response) {
        //  console.log(response);
        //}, function (res) {
        //    weUI.wx_pay.error("支付失败");
        //});
    }

    /**
     * 微信支付JSAPI调用
     * * @param postData
     */
    function onBridgeReady(postData, unifiedJson) {
        var post = JSON.parse(postData);
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": post.appId,
            "timeStamp": post.timeStamp,
            "nonceStr": post.nonceStr,
            "package": post.package,
            "signType": post.signType,
            "paySign": post.paySign
        }, function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                weUI.toast.ok('正在查询支付结果,请稍等...');
                $scope.wxPayInfo = "正在查询支付结果,请稍等...";
                var formData = {
                    OUT_TRADE_NO: unifiedJson.out_trade_no,
                    ORDER_ID: $scope.order['SHOP_ORDER.ID'],
                    TYPE: 'ORDER',
                    CALLBACK: '-1'
                };
                http.post_ori("http://app.bblycyz.com/AndSell/wxCallBack", formData, function (res) {
                    weUI.toast.ok('订单支付成功');
                    $scope.delCoupon();
                    location.reload();
                }, function (res) {
                    weUI.toast.ok('后台确认收款中!');
                    location.reload();
                });
            } else {
                weUI.wx_pay.error("支付失败");
            }
        });
    }

})