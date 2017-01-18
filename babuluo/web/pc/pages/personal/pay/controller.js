angular.module('AndSell.PC.Main').controller('pages_personal_pay_Controller', function (productFactory, $q, userFactory, orderFactory, $stateParams, $interval, $scope, shopFactory, $state, modalFactory, balanceFactory, personalFactory, promoFactory, couponFactory) {

    modalFactory.setTitle("微信支付");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

    modalFactory.setCateGory(true);

    modalFactory.setLeftMenu(false);

    $(".zhifu").click(function () {
        $(".zhifu").removeClass("active");
        $(".yang").removeClass("choosed");
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find(".yang").removeClass("choosed");
        } else {
            $(this).addClass("active");
            $(this).find(".yang").addClass("choosed");
        }
    });
    $scope.chooseWeiXin = function () {
        $scope.ifShow = true;
        $scope.state = 'openWeixin';
        $scope.payNow();
    }
    $scope.close = function () {
        $scope.ifShow = false;
        $scope.ifShowhuiyuan = false;
        $scope.ifShowCoupon = false;
    }
    $scope.chooseHuiyuan = function () {
        $scope.ifShowhuiyuan = true;
        $scope.state = 'openHuiYuan';
        $scope.payNow();
    }

    $scope.initData = function () {

        var deferred_account = $q.defer();
        var deferred_price = $q.defer();

        $scope.getOrder($stateParams.ORDER_ID, deferred_price);
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

    $scope.loadMemberCard = function () {
        personalFactory.getMemberCardByUserId({}, function (response) {
            $scope.cardList = response.data;
            console.log($scope.cardList);
            if (response.data.length == 1) {
                modalFactory.showShortAlert("只有一张会员卡，已自动选择");
                $scope.cardPay($scope.cardList[0]);
            }
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.getShop = function (id) {
        shopFactory.getShopById({'SHOP.SHOP_ID': id}, function (response) {
            $scope.shop = response.data[0];
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
            == -1) || ($scope.order['SHOP_ORDER.STATE_ORDER']
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

    //订单详情跳转
    $scope.toDetail = function (id) {
        $state.go('pages/order/detail', {ORDER_ID: id});
    };


    $scope.calculatePromotion = function (deferred) {
        modalFactory.showShortAlert('正在查询促销条件');
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
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
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
            modalFactory.showShortAlert('会员卡余额不足，请先充值');
        }
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
            $scope.getShop($scope.order['SHOP_ORDER.SHOP_ID']);
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
            $scope.initCartRequestVO(deferred);
            //$scope.bindPresent();
        });
    }

    //取消订单
    $scope.cancelOrder = function () {
        modalFactory.showAlert("确认取消该订单", function () {
            orderFactory.cancelOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                modalFactory.showShortAlert('取消订单成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });
    }

    //确认提货
    $scope.getPrdNow = function () {
        modalFactory.showAlert("确认提货", function () {
            orderFactory.acceptOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                if (response.code == 0) {
                    modalFactory.showShortAlert('收货成功');
                    $scope.getOrder($scope.order['SHOP_ORDER.ID']);
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    }

    $scope.delCoupon = function () {
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
        if ($scope.state == 'openWeixin') {
            var ip = getCookie('ip_nginx');
            //var ip = "183.206.169.255";
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

        } else if ($scope.state == 'openHuiYuan') {
            //支付会员卡
            $scope.loadMemberCard();
        }
    };

    $scope.queryCoupon = function () {
        $scope.ifShowCoupon = true;
        $scope.state = 'openCoupon';

        personalFactory.getCouponListByUser({}, function (response) {
            $scope.memberCouponList = response.data;       //客户的所有优惠券
            $scope.judgeUsableCoupon();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    /**
     * 判断可用优惠券
     */
    $scope.useableList = new Array();   //可用的优惠券数组，如可用压入里面

    $scope.judgeUsableCoupon = function () {

        var week = new Date().getDay();     //得到的今日的星期
        if (week = 0) {
            week = 7;
        }

        if ($scope.memberCouponList.length <= 0) {
            modalFactory.showShortAlert("无可用优惠券！");
        } else {
            $scope.memberCouponList.forEach(function (ele) {
                var targetObjArray = ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_ID'];  //限定对象数组
                var weekArray = ele['MEMBER_COUPON.COUPON_INFO']['COUPON.USE_TIME_CYCLE'];    //优惠券的星期数组
                if (ele['MEMBER_COUPON.COUPON_INFO'] != undefined && ele['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO'] != undefined) {
                    if ((ele['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO']['COUPON_RULE.CONDITION_PRICE']) / 100 < $scope.order['SHOP_ORDER.PRICE_OVER']) {   //满足使用门槛
                        if (weekArray.indexOf(week) != -1) {       //如果今天的星期在优惠券的星期数组
                            if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == 1) {   //限定商品
                                for (i = 0; i < $scope.orderDetailList.length; i++) {   //遍历订单中的每一个商品
                                    if (targetObjArray.indexOf($scope.orderDetailList[i]['SHOP_ORDER_INFO.SKU_ID']) == -1) {
                                        break;
                                    }
                                    if (i == $scope.orderDetailList.length - 1) {
                                        $scope.useableList.push(ele);
                                    }
                                }
                            }
                            if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == 2) {   //限定类别
                                for (i = 0; i < $scope.orderDetailList.length; i++) {   //遍历订单中的每一个商品
                                    if (targetObjArray.indexOf($scope.orderDetailList[i]['SHOP_ORDER_INFO.CLASS_ID']) == -1) {   //该商品id不在限定对象数组中，直接跳出
                                        break;
                                    }
                                    if (i == $scope.orderDetailList.length - 1) {
                                        $scope.useableList.push(ele);
                                    }
                                }
                            }
                            if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == 3) {   //限定标签

                                for (var i = 0; i < $scope.orderDetailList.length; i++) {   //遍历订单中的每一个商品
                                    var tagIdArray = $scope.orderDetailList[i]['SHOP_ORDER_INFO.TAG_ID'].split(',');
                                    for (var j = 0; j < tagIdArray.length; j++) {
                                        if (targetObjArray.indexOf(tagIdArray[j]) != -1) {         //商品的标签ID有多个，只要有一个在限定数组中即可
                                            if (i == $scope.orderDetailList.length - 1) {
                                                $scope.useableList.push(ele);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == -1) {   //不限定
                                $scope.useableList.push(ele);
                            }
                        }
                    }
                }
            });
            console.log($scope.useableList);
        }
    }

    $scope.chooseCoupon = function (coupon) {
        console.log(coupon);
        $scope.choiceCoupon = coupon;
        $scope.ifShowCoupon = false;
        var price = coupon['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO']['COUPON_RULE.FACE_VALUE'] / 100;
        var price_mark = $scope.order['SHOP_ORDER.PRICE_OVER'];
        switch (Number(coupon['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO']['COUPON_RULE.TYPE'])) {
            case 1:
                $scope.order['SHOP_ORDER.PRICE_OVER'] = $scope.order['SHOP_ORDER.PRICE_OVER'] - (price);
                break;
            case 2:
                $scope.order['SHOP_ORDER.PRICE_OVER'] = $scope.order['SHOP_ORDER.PRICE_OVER'] * (price);
                break;
        }

        if ($scope.order['SHOP_ORDER.PRICE_OVER'] <= 0) {
            $scope.order['SHOP_ORDER.PRICE_OVER'] = 0.01;
        }
        $scope.order['SHOP_ORDER.PRICE_COUPON'] = moneyFormat(price_mark - $scope.order['SHOP_ORDER.PRICE_OVER']);
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] += Number($scope.order['SHOP_ORDER.PRICE_COUPON']);
        $scope.order['SHOP_ORDER.COUPON_ID'] = $scope.choiceCoupon.ID;
    }

    $scope.cardPay = function (card) {
        $scope.close();
        $scope.payCard = card;
        if (!isEmptyObject($scope.payCard)) {
            modalFactory.showAlert("确认支付该订单？", function () {
                var form = $scope.order;
                form['SHOP_ORDER.ID'] = $scope.order['SHOP_ORDER.ID'];
                form['SHOP_ORDER.CARD_ID'] = $scope.payCard['MEMBER_CARD.CARD_ID'];
                form['SHOP_ORDER.CARD_NO'] = $scope.payCard['MEMBER_CARD.CARD_NO'];
                form['SHOP_ORDER.CARD_BALANCE'] = $scope.payCard['MEMBER_CARD.BALANCE'];
                form['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
                console.log(form);
                orderFactory.payOrder(form, function (response) {
                    modalFactory.showShortAlert('支付成功');
                    $scope.delCoupon();
                    $scope.toDetail($stateParams.ORDER_ID);
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            }, function () {

            });
        } else {
            modalFactory.showShortAlert("请选择一张会员卡支付");
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
        orderFactory.wxPayUndefinedOrderForPC(formData, function (response) {
            $scope.wxPayCode = "/AndSell/" + response.extraData.code_url;
            $scope.wxScanPayOutTradeNo = response.extraData.returnMap.out_trade_no;
            getResult = setInterval(function () {
                $scope.$apply($scope.queryWXPayResult);
            }, 2000);

        }, function (res) {
            modalFactory.showShortAlert("支付失败");
        });
    }

    var getResult;

    var lock = 0;

    $scope.queryWXPayResult = function () {

        $scope.pay = {
            out_trade_no: $scope.wxScanPayOutTradeNo
        }
        if (lock == 0) {
            lock = 1;
            orderFactory.queryWXPayOrder($scope.pay, function (response) {
                lock = 0;
                console.log(response);
                console.log(1);
                if (response.extraData.payState == '1') {
                    console.log(2);
                    $scope.wxDataResult();
                    clearInterval(getResult);
                } else if (response.extraData.payState == '-1') {
                    clearInterval(getResult);
                    modalFactory.showShortAlert("支付失败或订单异常");
                }
            });
        }
    }

    /**
     * 微信支付
     * * @param postData
     */
    $scope.wxDataResult = function () {

        modalFactory.showShortAlert('正在查询支付结果,请稍等...');
        $scope.wxPayInfo = "正在查询支付结果,请稍等...";
        var formData = {
            OUT_TRADE_NO: $scope.wxScanPayOutTradeNo,
            ORDER_ID: $scope.order['SHOP_ORDER.ID'],
            UID: $scope.order['SHOP_ORDER.UID'],
            TYPE: 'ORDER',
            CALLBACK: '-1'
        };
        http.post_ori("/AndSell/wxCallBack", formData, function (res) {
            modalFactory.showShortAlert('订单支付成功');
            $scope.close();
            $scope.delCoupon();
            $scope.toDetail($stateParams.ORDER_ID);
        }, function (res) {
            modalFactory.showShortAlert('后台确认收款中!');
            $scope.toDetail($stateParams.ORDER_ID);
        });
    }

    $scope.detailData = function (data) {

        var str = data.replace(/<br>/g, " ");
        return str;

    }

    $scope.parseArray = function (data) {
        if (data != undefined) {
            data = data.split(',');
        }
        return data;
    }
});