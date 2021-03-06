angular.module('AndSell.H5.Main').controller('pages_order_CashOnDeliveryOrder_detail_Controller', function ($scope, $state, $stateParams, weUI, productFactory, orderFactory, modalFactory,weUI) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        modalFactory.setCurrentPage('wd');
        $scope.getOrder($stateParams.ORDER_ID);
        $scope.shop = JSON.parse(getCookie('currentShopInfo'));

        // initWxJsSdk();
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
        weUI.dialog.alert("提示", "确认取消该订单", function () {
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
        weUI.dialog.alert("提示", "确认提货", function () {
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

    //立即支付
    $scope.payNow = function () {
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
                TYPE:'ORDER'
            };

            wxPay(formData);

        } else if ($scope.order['SHOP_ORDER.PAY_TYPE'] == 'ACCOUNT') {
            weUI.dialog.alert("提示", "确认支付该订单", function () {
                weUI.toast.showLoading('正在支付');
                orderFactory.payOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                    weUI.toast.hideLoading();
                    weUI.toast.ok('支付成功');
                    $state.go("pages/personal");
                }, function (response) {
                    weUI.toast.hideLoading();
                    weUI.toast.error(response.msg);
                });
            });
        }
    };


    $scope.toDetail= function (id) {
        $state.go('pages/product/detail', {PRD_ID: id});
    }

    //评价订单
    $scope.commentOrder = function () {

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

            console.log(response);
            if (typeof WeixinJSBridge == "undefined") {
                // alert('WeixinJSBridge == null');
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
            weUI.toast.error(res.msg);
        });
    }




    /**
     * 微信支付JSAPI调用
     * * @param postData
     */
    function onBridgeReady(postData, unifiedJson) {
        // alert('onBridgeReady');
        // alert(postData);
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
                // alert(JSON.stringify(res));
                // alert(res.err_msg);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    $scope.wxPayInfo = "正在查询支付结果,请稍等...";
                    var formData = {
                        OUT_TRADE_NO: unifiedJson.out_trade_no,
                        ORDER_ID:$scope.order['SHOP_ORDER.ID'],
                        TYPE:'ORDER',
                        CALLBACK:'-1'
                    };
                    // alert(JSON.stringify(formData));
                    orderFactory.queryWXPayResult(formData, function(res) {
                        // alert(JSON.stringify(res));
                        //  alert('queryWXPayResult');
                        // location.reload();
                        $state.go("pages/personal");

                    }, function (res) {
                        // alert(res.msg);
                        location.reload();
                    })
                } else {
                    weUI.toast.error("支付失败，请重试");
                }
            }
        );
    }


})