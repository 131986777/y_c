angular.module('AndSell.H5.Main').controller('pages_order_addGroupBuy_Controller', function (memberFactory, groupBuyMemberFactory, groupBuyGroupFactory, groupBuyPlanFactory, $scope, $state, $q, balanceFactory, $stateParams, weUI, $http, http, couponFactory, productFactory, orderFactory, modalFactory, weUI) {

    modalFactory.setTitle('团购商品');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.gbgId = parseInt($stateParams.GBG_ID);
        $scope.canCommit = false;
        $scope.gbpEntity = '';
        var deferred_account = $q.defer();
        var deferred_price = $q.defer();
        var deferred_storage = $q.defer();
        var deferred_partake = $q.defer();
        $scope.gbmStorage = false;
        $scope.cookiePickup = JSON.parse(getCookie("pickupPerson"));

        $scope.EmptyPick = isEmptyObject($scope.cookiePickup);
        if (!$scope.EmptyPick) {
            var param = {
                'GROUP_BUY_PLAN.SKU_ID': $stateParams.SKU_ID
            };
            groupBuyPlanFactory.getBySkuIdAndStat(param, function (response) {
                if (response.data.length > 0) {
                    $scope.gbpEntity = response.data[0];
                    deferred_partake.resolve();
                } else {
                    weUI.toast("商品未参加团购活动~");
                    history.back();
                    return;
                }
            })
        }

        $scope.order = {};

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
        $scope.queryAccount(deferred_account);
        $scope.isGbpStoraeg(deferred_storage, deferred_partake);

        $scope.skuIds = $stateParams.SKU_ID;
        var params = {};
        if ($scope.skuIds == undefined) {
            weUI.toast.info('团购商品异常');
            window.history.back();
            return;
        }
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = $scope.skuIds;
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
            $scope.skuList = response.data;
            $scope.oldStock = $scope.skuList[0]['SHOP_PRODUCT_SKU.STOCK'];
            $scope.skulistsForOrder = new Array;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE'] = $stateParams.SUM_COUNT;
                ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = moneyFormat(ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD']);
                $scope.needPay = ele['SHOP_PRODUCT_SKU.NEED_PAY'];
                ele.isSelect = false;
                ele.isSale = false;
                $scope.skulistsForOrder.push({
                    'skuId': ele['SHOP_PRODUCT_SKU.SKU_ID'],
                    'classId': ele['SHOP_PRODUCT.CLASS_ID'],
                    'tagIds': ele['SHOP_PRODUCT.TAG_ID'],
                    'num': ele['SHOP_PRODUCT_SKU.SIZE'],
                    'unitPrice': ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * 100
                });
                deferred_price.resolve();
            });
            $scope.updateOrderPrice();
            $scope.canCommit = true;
            //$scope.calculatePromotion();
        });

        $scope.commitClick = true;

        var promise = $q.all([deferred_price.promise, deferred_account.promise]);

        promise.then(function (result) {
            if ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
                >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
                $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
            } else {
                $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN';
            }
        });

    }

    $scope.queryAccount = function (deferred) {
        balanceFactory.queryAccountByUid({}, function (response) {
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

    //判断团购是否还有剩余的名额
    $scope.isGbpStoraeg = function (deferred, deferred_partake) {
        deferred_partake.promise.then(function (res) {
            groupBuyMemberFactory.getAllMemberInGbgIds({'GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS': $scope.gbgId}, function (response) {
                deferred.resolve();
                $scope.gbmStorage = response.data.length < $scope.gbpEntity['GROUP_BUY_PLAN.SUM_COUNT'];
            })
        });
    };

    //添加团购相关信息
    $scope.addGbm = function (orderId) {
        var param = {};
        //gbp type = manage
        if ($scope.gbpEntity['GROUP_BUY_PLAN.TYPE'] == 'MANAGE') {
            param['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'] = $scope.gbgId;
            param['GROUP_BUY_MEMBER.UID'] = getCookie("ANDSELLID");
            param['GROUP_BUY_MEMBER.USER_NAME'] = $scope.cookiePickup['man'];
            param['GROUP_BUY_MEMBER.MONEY_STATE'] = 'WAIT_PAY';
            param['GROUP_BUY_MEMBER.ORDER_ID'] = orderId;
            groupBuyMemberFactory.add(param);
        } else {
            //gbp type = member
            if ($scope.gbgId == 0) {
                //这个是单独开一个团购
                param['GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID'] = $scope.gbpEntity['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'];
                param['GROUP_BUY_GROUP.STATE'] = 'IN';
                groupBuyGroupFactory.add(param, function (response) {
                    param = {};
                    param['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'] = response.extraData.GBG_ID;
                    param['GROUP_BUY_MEMBER.IS_LEADER'] = 1;
                    param['GROUP_BUY_MEMBER.UID'] = getCookie("ANDSELLID");
                    param['GROUP_BUY_MEMBER.USER_NAME'] = $scope.cookiePickup['man'];
                    param['GROUP_BUY_MEMBER.MONEY_STATE'] = 'WAIT_PAY';
                    param['GROUP_BUY_MEMBER.ORDER_ID'] = orderId;
                    groupBuyMemberFactory.add(param);
                });
            } else {
                param['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID'] = $scope.gbgId;
                param['GROUP_BUY_MEMBER.UID'] = getCookie("ANDSELLID");
                param['GROUP_BUY_MEMBER.USER_NAME'] = $scope.cookiePickup['man'];
                param['GROUP_BUY_MEMBER.MONEY_STATE'] = 'WAIT_PAY';
                param['GROUP_BUY_MEMBER.ORDER_ID'] = orderId;
                groupBuyMemberFactory.add(param);
            }
        }
    };

    //计算订单价格
    $scope.updateOrderPrice = function () {
        var price = 0;
        var new_price = 0;
        $scope.skuList.forEach(function (ele) {
            price += ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] * ele['SHOP_PRODUCT_SKU.SIZE'];
            new_price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.order['SHOP_ORDER.PRICE_PRD'] = price;
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


        $scope.onSalePrice = moneyFormat(prdPrice - price);
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = $scope.onSalePrice;
        $scope.order['SHOP_ORDER.PRICE_ORDER'] = price;
        $scope.order['SHOP_ORDER.PRICE_OVER'] = price;

    }

    //提交订单
    $scope.commitOrder = function () {
        if ($scope.oldStock == 0 || $stateParams.SUM_COUNT > $scope.oldStock) {
            weUI.toast.error('库存不足。');
            return;
        }
        if (!$scope.gbmStorage) {
            weUI.toast.error('来晚了哦,团购已满员。');
            return;
        }
        if (!$scope.canCommit) {
            return;
        }
        if ($scope.order['SHOP_ORDER.PRICE_OVER'] <= 0) {
            weUI.toast.error('订单异常,请重新下单');
            window.history.back();
            return
        }
        if (isEmptyObject($scope.cookiePickup)) {
            weUI.toast.error('请填写提货信息');
            return;
        }

        //判断是否有订单库存

        if ($scope.commitClick) {
            $scope.commitClick = false;
            weUI.toast.showLoading('正在下单');

            var params = $scope.order;
            //params['SHOP_ORDER.TYPE'] = $scope.cookiePickup.type;//订货单

            params['SHOP_ORDER.TYPE'] = 6;//团购单

            params['SHOP_ORDER.SPECIAL_MODEL'] = 'GROUPBUY';//特殊状态为团购
            params['SHOP_ORDER.REC_CONTACT'] = $scope.cookiePickup.man;//收货人
            params['SHOP_ORDER.REC_PHONE'] = $scope.cookiePickup.phone;//联系电话
            params['SHOP_ORDER.SHOP_NAME'] = $scope.shop['SHOP.SHOP_NAME'];//门店信息
            params['SHOP_ORDER.SHOP_ID'] = $scope.shop['SHOP.SHOP_ID'];//门店ID
            if ($scope.cookiePickup.type == 1) {
                params['SHOP_ORDER.REC_TYPE'] = 1;//收货方式为快递
                params['SHOP_ORDER.REC_ADDR'] = noUndefinedAndNull($scope.cookiePickup.shengshi)
                    + noUndefinedAndNull($scope.cookiePickup.address);//收货地址
                params['SHOP_ORDER.GET_PRD_DATETIME'] = $scope.cookiePickup.getTime;//送货时间
            } else {
                params['SHOP_ORDER.REC_TYPE'] = 2;//收货方式为自提
                params['SHOP_ORDER.GET_PRD_DATETIME'] = noUndefinedAndNull($scope.cookiePickup.getTime);//提货时间
            }

            params['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.skuList);//sku信息
            orderFactory.addOrder(params, function (response) {
                $scope.addGbm(response.extraData.ORDER_ID);
                weUI.toast.hideLoading();

                //weUI.toast.ok('下单成功');
                //成功之后删除购物车内容

                $scope.commitClick = true;

                window.location.replace("#/pages/order/detail/"
                    + response.extraData.ORDER_ID
                    + '/Add/');
            }, function (response) {
                weUI.toast.hideLoading();
                $scope.commitClick = true;
                weUI.toast.error(response.msg);
            });
        }
    }


    function getDate(item) {

        var endDay = item['GROUPBUY_PRODUCT.END_DAY'];
        var type = item['GROUPBUY_PRODUCT.TIME_TYPE'];
        var still = item['GROUPBUY_PRODUCT.STILL_DAY'];
        var startTime = item['GROUPBUY_PRODUCT.START_TIME'];
        var next = true;
        var dayList = new Array;
        if (type == 'WEEK') {
            var currTime = new Date().getDay();
            if (currTime == 0) {
                currTime = 7;//周日
            }

            if (startTime - currTime > endDay) {
                next = false;
            }
            var day;

            if (next) {
                day = Number(startTime) + 7 - Number(currTime);
            } else {
                day = Number(startTime) - Number(currTime);
            }
            for (var i = 0; i < still; i++) {
                dayList.push(GetDateStr(Number(day) + Number(i)) + '   08:00-19:00');
            }

        } else if (type == 'DAY') {
            for (var i = 0; i < still; i++) {
                dayList.push(GetDateStr(Number(i), startTime) + '   08:00-19:00');
            }
        }
        return dayList[0];
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
                form['SHOP_ORDER.COUPON_ID'] = $scope.order['SHOP_ORDER.COUPON_ID'];
                form['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
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

});
