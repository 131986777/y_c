angular.module('AndSell.PC.Main').controller('pages_order_detail_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory, orderFactory) {

    modalFactory.setTitle("订单详情");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

    modalFactory.setCateGory(true);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        modalFactory.setCurrentPage('wd');
        $scope.getOrder($stateParams.ORDER_ID);
        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
    }

    $scope.getOrder = function (id) {
        orderFactory.getOrderById({'SHOP_ORDER.ID': id}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.orderDetailList = JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order = response.data[0];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
        });
    }

    //取消订单
    $scope.cancelOrder = function () {
        modalFactory.showAlert("提示", "确认取消该订单", function () {
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
        modalFactory.showAlert("提示", "确认提货", function () {
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

    //立即支付
    $scope.payNow = function () {
        //alert(getCookie('openId'));
        /**
         * 如果是需要微信支付的类型
         * 调用微信统一下单的接口
         */
        if ($scope.order['SHOP_ORDER.PAY_TYPE'] == 'WEIXIN') {
            var ip = getCookie('ip');
            var openId = getCookie('openId');
            var formData = {
                PRODUCT_ID: $scope.order['SHOP_ORDER.ID'],
                FEE: moneyToFee($scope.order['SHOP_ORDER.PRICE_OVER']),
                BODY: '订单' + $scope.order['SHOP_ORDER.ID'],
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
        $scope.payCard = JSON.parse(getCookie("payCard"));
        if (!isEmptyObject($scope.payCard)) {
            modalFactory.showAlert("提示", "确认支付该订单", function () {
                var form = {};
                form['SHOP_ORDER.ID'] = $scope.order['SHOP_ORDER.ID'];
                form['SHOP_ORDER.CARD_ID'] = $scope.payCard['MEMBER_CARD.CARD_ID'];
                form['SHOP_ORDER.CARD_NO'] = $scope.payCard['MEMBER_CARD.CARD_NO'];
                form['SHOP_ORDER.CARD_BALANCE'] = $scope.payCard['MEMBER_CARD.BALANCE'];
                console.log(form);
                orderFactory.payOrder(form, function (response) {
                    modalFactory.showShortAlert('支付成功');
                    $scope.cardModalShow = false;
                    $state.go("pages/personal");
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            }, function () {

            });
        } else {
            modalFactory.showShortAlert("请选择一张会员卡支付");
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
            modalFactory.showShortAlert("支付失败");
        });
    }


    /**
     * 微信支付JSAPI调用
     * * @param postData
     */
    function onBridgeReady(postData, unifiedJson) {
        var post = JSON.parse(postData);
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": post.appId,
                "timeStamp": post.timeStamp,
                "nonceStr": post.nonceStr,
                "package": post.package,
                "signType": post.signType,
                "paySign": post.paySign
            },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    modalFactory.showShortAlert('正在查询支付结果,请稍等...');
                    $scope.wxPayInfo = "正在查询支付结果,请稍等...";
                    var formData = {
                        OUT_TRADE_NO: unifiedJson.out_trade_no,
                        ORDER_ID: $scope.order['SHOP_ORDER.ID'],
                        TYPE: 'ORDER',
                        CALLBACK: '-1'
                    };
                    orderFactory.queryWXPayResult(formData, function (res) {
                        modalFactory.showShortAlert('订单支付成功');
                        $scope.getOrder($scope.order['SHOP_ORDER.ID']);
                    }, function (res) {
                        location.reload();
                    })
                } else {
                    modalFactory.showShortAlert("支付失败");
                }
            }
        );
    }


});