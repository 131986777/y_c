angular.module('AndSell.H5.Main').controller('pages_account_recharge_Controller', function ($scope, $state, $stateParams, balanceFactory,weUI, orderFactory) {


    $scope.initLoad  = function () {
        $scope.uid = getCookie('ANDSELLID');
        $scope.queryAccount($scope.uid);
    }

    $scope.queryAccount = function (uid){
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = uid;
        balanceFactory.queryAccountByUid(form, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
            // $scope.serviceId = $scope.balanceInfo[0]['MEMBER_ACCOUNT.SERVICE_ID'];
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }


    $scope.updateBalance = function() {
        var ip = getCookie('ip');
        var openId = getCookie('openId');
        var formData = {
            TYPE:'ACCOUNT',
            FEE:parseInt($scope.balanceInfo['CHANGE_VALUE'] * 100),
            PRODUCT_ID: $scope.uid,
            BODY: '充值',
            OPENID: openId,
            IP: ip,
            ORDER_ID: $scope.uid
        };

        wxPay(formData);
    };


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
                    try {
                        var formData = {
                            OUT_TRADE_NO: unifiedJson.out_trade_no,
                            ORDER_ID:$scope.uid,
                            TYPE:'ACCOUNT',
                            CALLBACK:'-1',
                            NOW_BALANCE:parseInt($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE'] * 100),
                            UID:$scope.uid,
                            FEE:parseInt($scope.balanceInfo['CHANGE_VALUE'] * 100)
                        };
                        alert(JSON.stringify(formData));
                        orderFactory.queryWXPayResult(formData, function(res) {
                            alert('queryWXPayResult');
                            location.reload();
                        }, function (res) {
                            alert(res.msg);
                        })
                    } catch(err) {
                        alert(err);
                    }

                } else {
                    weUI.toast.error("支付失败，请重试");
                    // alert("支付失败，请重试");
                }
            }
        );
    }

    // $scope.updateBalance  = function (){
    //     if($scope.balanceInfo['CHANGE_VALUE'] = undefined){
    //         weUI.toast.error('请输入充值金额');
    //     }else if($scope.addressType = undefined){
    //         weUI.toast.error('请选择充值方式');
    //     }
    //     var form = {};
    //     form['FINANCE_LIST.BALANCE'] = $scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE'];
    //     form['FINANCE_LIST.SERVICE_ID'] =$scope.serviceId;
    //     form['FINANCE_LIST.USER_ID'] = $scope.uid;
    //     form['FINANCE_LIST.CHANGE_VALUE'] = $scope.balanceInfo['CHANGE_VALUE'];
    //     if($scope.addressType == 0){
    //         form['FINANCE_LIST.EVENT'] = '微信充值';
    //     }
    //     else {
    //         form['FINANCE_LIST.EVENT'] = '支付宝充值';
    //     }
    //     form['FINANCE_LIST.CHANGE_TYPE'] = 'increase';
    //     balanceFactory.updateFinanceList(form, function (response) {
    //         console.log(form);
    //         weUI.toast.ok('充值成功');
    //         $state.go('pages/account/balance');
    //     }, function (response) {
    //         weUI.toast.error(response.msg);
    //     });
    // }
    $scope.initLoad();
});




