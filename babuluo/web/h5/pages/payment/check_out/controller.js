angular.module('AndSell.H5.Main').controller('pages_payment_check_out_Controller', function ($scope, $state, $stateParams, productFactory, orderFactory, modalFactory, weUI) {

    modalFactory.setTitle('下单成功');
    modalFactory.setBottom(false);

    $scope.initData = function () {
        $scope.ORDER_ID = $stateParams.ORDER_ID;
        orderFactory.getOrderById({'SHOP_ORDER.ID':$stateParams.ORDER_ID}, function (response) {
            console.log(response);
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.order = response.data[0];
        });
    }

    //支付
    $scope.payNow = function () {
        //weUI.dialog.alert("提示","确认支付该订单", function () {
        //    orderFactory.payOrder( $stateParams.ORDER_ID).get({}, function (response) {
        //        if (response.code == 0) {
        //            weUI.toast.ok('支付成功');
        //            $state.go('pages/order/detail', {ORDER_ID: $stateParams.ORDER_ID});
        //        } else {
        //            weUI.toast.error(response.msg);
        //        }
        //    });
        //})
        $scope.payClick();
    }


    var mask = $("#mask");
    var weuiActionsheet = $("#weui_actionsheet");

    //弹出支付
    $scope.payClick = function () {

        // 弹出模态框
        mask.show().addClass('weui_fade_toggle').focus();

        //加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
        weuiActionsheet.addClass("weui_actionsheet_toggle");

        mask.click(function () {
            // 隐藏模态框
            mask.hide().removeClass('weui_fade_toggle');
            weuiActionsheet.removeClass("weui_actionsheet_toggle");
        });

    }


    //微信支付相关
    $scope.wxScanPayPath = '';
    $scope.wxScanPayMoney = 0;
    $scope.wxScanPayOutTradeNo = '';

    $scope.unifiedOrder = function () {
        if ($scope.wxScanPayMoney != 0) {
            var url = "../../do?action=weixin!CAjaxWXpayUnifiedOrder";
            $scope.data = {
                product_id: $scope.wxScanPayOrderID + '',
                body: $scope.wxScanPayOrderID + '',
                fee: $scope.wxScanPayMoney + '',
                ifWeb: 'true'
            }
            //                alert($scope.data.fee);
            http.post(url, $scope.data, function (response) {
                console.log(response);
                if (response.code == 0) {
                    $scope.wxScanPayOutTradeNo = response.data.out_trade_no;

                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    } else {
                        onBridgeReady(response.extraData);
                    }

                } else {
                    weUI.toast.error("调用微信支付失败，失败原因:" + response.msg);
                }
            });
        }
    }

    var getResult;

    /**
     * 微信支付JSAPI调用
     * * @param postData
     */
    function onBridgeReady(postData) {

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
                    //							weUI.dialog.alert("提示","正在查询支付结果,请稍等");
                    $scope.wxPayInfo = "正在查询支付结果,请稍等...";
                    $scope.queryWXPayResult();

                    //                            getResult = setInterval(function () {
                    //                               $scope.$apply($scope.queryWXPayResult);
                    //                            }, 2000);
                } else {
                    weUI.toast.error("支付失败，请重新下单");
                    //                            location.href = "/ui/shop/payresult.jsp?oid=" + oid;
                }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }

    $scope.queryWXPayResult = function () {

        $scope.pay = {
            out_trade_no: $scope.wxScanPayOutTradeNo
        }
        var url = "../../do?action=weixin!CAjaxWXpayQuery";

        http.post(url, $scope.pay, function (response) {
            if (response.code == 0) {
                if (response.msg == 'SUCCESS') {
                    $scope.WXPaySuccess();
                    clearInterval(getResult);
                } else if (response.msg == 'SUCCESS_OTHERS') {
                    $scope.wxScanPayMoney = 0;
                    $scope.wxScanPayOutTradeNo = '';
                    clearInterval(getResult);
                    window.location.reload();
                }
            } else {
                weUI.toast.error("支付失败或订单异常");
                clearInterval(getResult);
            }
        });
    }



    $scope.WXPaySuccess = function () {

        //            console.log($scope.wxScanPayMoney);

        var url = "../../do?action=pay.fundflow!CAjaxAddFundFlowByOrderPay";
        var payFormData = {};

        payFormData.memberId = $scope.wxScanPayMemberID;
        payFormData.orderId = $scope.wxScanPayOrderID;
        payFormData.advancePayMoney = 0;
        payFormData.rebatePayMoney = 0;
        payFormData.payDatetime = '<%=DateUtil.getCurrentDay("yyyy-MM-dd")%>';
        payFormData.offlinePayMoney = 0;
        payFormData.offlinePayAccountId = '';
        payFormData.remark = '';
        payFormData.fileUrlLength = 0;
        payFormData.fileUrls = '';
        payFormData.wxPayFee = $scope.wxScanPayMoney;
        http.post(url, payFormData, function (response) {
            console.log(response);
            if (response.code == 0) {
                $scope.wxPayInfo = "订单支付成功!!!";
                $scope.wxScanPayMoney = 0;
                $scope.wxScanPayOutTradeNo = '';
                window.location = "../order/orderList.jsp";
            } else {
                weUI.toast.error(response.msg);
            }
        });

    };



})