angular.module('AndSell.PC.Main').controller('pages_account_recharge_Controller', function (balanceFactory,http,orderFactory,eventFactory,productFactory, $interval, $scope, $state, modalFactory) {
    modalFactory.setTitle("充值中心");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

    modalFactory.setShowMenu(true);

    modalFactory.setTab(true);

    modalFactory.setLeftMenu(false);

    $(".zhifu").click(function () {
        $(".zhifu").removeClass("active");
        $(".yang").removeClass("choosed");
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $(this).find(".yang").removeClass("choosed");
        }else{
            $(this).addClass("active");
            $(this).find(".yang").addClass("choosed");
        }

    })

    $scope.initLoad = function () {
        $scope.uid = getCookie('ANDSELLID');
        $scope.queryAccount($scope.uid);
        $scope.getEvent();
    }

    $scope.queryAccount = function (uid) {
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = uid;
        balanceFactory.queryAccountByUid(form, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.getEvent = function () {

        $scope.eventContent = '';
        $scope.eventMoney = '';

        eventFactory.getEventByType({"EVENT_CONFIG.TYPE": "RECHARGE"}, function (response) {
            console.log(response);
            $scope.eventList = response.data;
            $scope.eventList.forEach(function (ele, ind) {
                if (ind == 1) {
                    $scope.eventContent += '，';
                    $scope.eventMoney += '，';
                }
                $scope.eventContent += ele['EVENT_CONFIG.MARK1'] + '送' + ele['EVENT_CONFIG.MARK2'];
                $scope.eventMoney += ele['EVENT_CONFIG.MARK1'];
            });
        });
    }

    $scope.updateBalanceByWx = function () {
        var ip = getCookie('ip_nginx');
        //var ip = "183.206.169.255";
        var openId = getCookie('openId');
        var formData = {
            TYPE: 'ACCOUNT',
            FEE: parseInt($scope.balanceInfo['CHANGE_VALUE'] * 100),
            NOW_BALANCE: parseInt($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE'] * 100),
            PRODUCT_ID: $scope.uid,
            BODY: 'RECHRGE ',
            OPENID: openId,
            IP: ip,
            ORDER_ID: $scope.uid
        };

        wxPay(formData);
    };


    function wxPay(formData) {
        orderFactory.wxPayUndefinedOrderForPC(formData, function (response) {
            $scope.wxPayCode = "/AndSell/" + response.extraData.code_url;
            $scope.wxScanPayOutTradeNo = response.extraData.returnMap.out_trade_no;
            getResult = setInterval(function () {
                $scope.$apply($scope.queryWXPayResult);
            }, 2000);

        }, function (res) {
            $scope.close();
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
                lock =0;
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
            OUT_TRADE_NO:  $scope.wxScanPayOutTradeNo,
            ORDER_ID: $scope.uid,
            TYPE: 'ACCOUNT',
            CALLBACK: '-1',
            NOW_BALANCE: parseInt($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
                * 100),
            UID: $scope.uid,
            FEE: parseInt($scope.balanceInfo['CHANGE_VALUE'] * 100)
        };
        http.post_ori("/AndSell/wxCallBack", formData, function (res) {
            modalFactory.showShortAlert('账户充值成功');
            $scope.close();
            $scope.initLoad();
        }, function (res) {
            modalFactory.showShortAlert('后台确认收款中!');
            $scope.toDetail($stateParams.ORDER_ID);
        });
    }
    $scope.type=
        'zhibubao';
    $scope.recharge= function () {
        if($scope.type=='weixin'){
            $scope.ifWXCodeShow=true;
            $scope.updateBalanceByWx();
        }else{
                var formData = {
                    PRODUCT_ID: $scope.uid,
                    NOW_BALANCE: parseFloat($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']),
                    FEE:  parseFloat($scope.balanceInfo['CHANGE_VALUE']),
                    BODY: 'RECHRGE ',
                    IP: getCookie('ip_nginx'),
                    ORDER_ID: $scope.uid,
                    TYPE: 'ACCOUNT'
                };
                aliPay(formData);
        }
    }

    function aliPay(formData) {
        orderFactory.aliPayUndefinedOrderForPC(formData, function (response) {
            window.location.href = 'https://mapi.alipay.com/gateway.do?'
                + response.extraData.params;
            console.log(response);
        }, function (res) {
            modalFactory.showShortAlert("支付失败");
        });
    }


    $scope.close= function () {
        $scope.ifWXCodeShow=false;
        clearInterval(getResult);
    };
    
    $scope.initLoad();


})
