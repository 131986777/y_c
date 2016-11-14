angular.module('AndSell.H5.Main').controller('pages_order_detail_Controller', function ($scope, $state, $stateParams, weUI, productFactory, orderFactory, modalFactory) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
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
            orderFactory.cancelOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                weUI.toast.ok('取消订单成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            }, function (response) {
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
        if ($scope.order['SHOP_ORDER.TYPE'] == '1') {
            var ip = getCookie('ip');
            var openId = getCookie('openId');
            var formData = {
                PRODUCT_ID: $scope.order['SHOP_ORDER.ID'],
                FEE: moneyToFee($scope.order['SHOP_ORDER.PRICE_OVER']),
                BODY: '订单详情',
                OPENID: openId,
                IP: ip,
                ORDER_ID:$scope.order['SHOP_ORDER.ID']
            };



            wxPay(formData);

        } else if ($scope.order['SHOP_ORDER.TYPE'] == '3') {
            weUI.dialog.alert("提示", "确认支付该订单", function () {
                orderFactory.payOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function (response) {
                    weUI.toast.ok('支付成功');
                    $scope.getOrder($scope.order['SHOP_ORDER.ID']);
                }), function (response) {
                    weUI.toast.error(response.msg);
                };
            });
        }
    };


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
                alert('WeixinJSBridge == null');
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                console.log(response);
                onBridgeReady(response.extraData.unifiedOrderJsonResult);
            }

        }, function (res) {
            weUI.toast.error(res.msg);
        });
    }


    function queryWxPayResult () {

    }

    /**
     * 初始化微信jssdk
     */
    function initWxJsSdk() {

        wx.config({
            debug: true,
            appId: '43434',
            timestamp: '3232432432',
            nonceStr: '432432',
            signature: '4324324',
            JsApiList: ['chooseWXPay']
        });


        wx.ready(function () {

            console.log('ready');
        });

        wx.error(function (res) {
            alert(res);
        })

    }


    function chooseWxPay(data) {

        wx.chooseWXPay({
            timestamp: 0,
            nonceStr: '432432342',
            package: '432432432',
            signType: '432432',
            paySign: '4345435',
            success: function (res) {
                // 支付成功后的回调函数
            }
        });

    }

    /**
     * 微信支付JSAPI调用
     * * @param postData
     */
    function onBridgeReady(postData) {

        alert('onBridgeReady');
        alert(postData);


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
                alert(JSON.stringify(res));
                alert(res.err_msg);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    $scope.wxPayInfo = "正在查询支付结果,请稍等...";
                    // $scope.queryWXPayResult();
                } else {
                    alert("支付失败，请重新下单");
                }
            }
        );
    }


})