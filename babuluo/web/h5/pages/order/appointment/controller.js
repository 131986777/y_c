angular.module('AndSell.H5.Main').controller('pages_order_appointment_Controller', function ($scope, $state, $q, appointmentFactory, balanceFactory, promoFactory, $stateParams, weUI, $http, http, couponFactory, productFactory, orderFactory, modalFactory, weUI) {

    modalFactory.setTitle('新增预约');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {

        $scope.canCommit = false;
        var deferred_account = $q.defer();
        var deferred_price = $q.defer();

        $scope.cookiePickupPerson = JSON.parse(getCookie("pickupPersonAppointment"));

        $scope.EmptyPick = isEmptyObject($scope.cookiePickupPerson);
        if (!$scope.EmptyPick) {
            var param = {
                'APPOINTMENT_PRODUCT.SKU_ID': $stateParams.SKU_IDS
            };
            appointmentFactory.queryAll(param, function (response) {
                if (response.data.length > 0) {
                	$scope.cookiePickupPerson.endHours = response.data[0]['APPOINTMENT_PRODUCT.END_DAY'];
                    if (!($scope.cookiePickupPerson.skuIds
                        == $stateParams.SKU_IDS
                        && $scope.cookiePickupPerson.currDay
                        == GetDateStr(0))) {
                        $scope.cookiePickupPerson.getTime = getDate(response.data[0]);
                    }
                } else {
                    weUI.toast("商品未参加预约活动~");
                    history.back();
                }
            });
        }

        $scope.order = {};

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
        $scope.queryAccount(deferred_account);

        $scope.skuIds = $stateParams.SKU_IDS;
        var params = {};
        var skuIdLists = new Array;
        $scope.skuIds.split(",").forEach(function (ele, index) {
            skuIdLists.push(ele);
        })
        if (skuIdLists.length == 0) {
            window.history.back();
            return;
        }
        if (skuIdLists.length > 1) {
            weUI.toast.info('预约商品异常');
            window.history.back();
            return;
        }
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = skuIdLists.toString();
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
            $scope.skuList = response.data;
            $scope.skulistsForOrder = new Array;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE'] = $stateParams.COUNT;
                ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = moneyFormat(ele['SHOP_PRODUCT_SKU.REAL_PRICES']);
                $scope.needPay = ele['SHOP_PRODUCT_SKU.NEED_PAY'];
                ele.isSelect = false;
                ele.isSale = false;
                ele['SOURCE'] = getCookie(ele['SHOP_PRODUCT.PRD_ID']+'_dist');
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

    $scope.queryAccount = function (deferred) {
        var form = {};
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

    ////计算促销结果
    //$scope.calculatePromotion = function () {
    //    weUI.toast.showLoading('正在查询促销条件');
    //    $scope.skulistsForOrder.forEach(function (ele) {                       //四舍五入
    //        ele['unitPrice'] = Math.round(ele['unitPrice']);
    //    })
    //    var cartRequestVO = {'skuVOs': $scope.skulistsForOrder};
    //    var json = JSON.stringify(cartRequestVO);
    //    promoFactory.doPromoCalculate({'cartRequestVO': json}, function (response) {
    //        $scope.planUnitList = response.data;
    //        $scope.planUnitFilter();
    //        weUI.toast.hideLoading();
    //        $scope.bindPromoResult();
    //        $scope.updateOrderPrice();
    //    }, function (response) {
    //        weUI.toast.error(response.msg);
    //    });
    //};
    //
    ////筛选planUnit
    //$scope.planUnitFilter = function () {
    //    for (var i = 0; i < $scope.planUnitList.length; i++) {
    //        if (undefined != $scope.planUnitList[i]) {
    //            if ($scope.planUnitList[i]['state'] != "checked") {
    //                $scope.planUnitList.splice(i, 1)
    //                i--;
    //            }
    //        }
    //    }
    //}
    //
    //$scope.bindPromoResult = function () {
    //    var presentIds = '';
    //    $scope.skuList.forEach(function (ele) {
    //        $scope.planUnitList.forEach(function (unit) {
    //            if (null == unit) {
    //                return;
    //            }
    //            if (unit['skuVOs'] == null || unit['skuVOs'].length == 0) {
    //                if (unit['presents'] != null && unit['presents'].length == 1) {
    //                    if (presentIds != '') {
    //                        presentIds += ',';
    //                    }
    //                    presentIds += unit['presents'][0]['skuId'];
    //                }
    //                return;
    //            }
    //            if (ele['SHOP_PRODUCT_SKU.SKU_ID'] == unit['skuVOs'][0]['skuId']) {
    //                ele['planUnit'] = unit;
    //                ele['isSale'] = true;
    //                ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] =
    // ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
    //                ele['SHOP_PRODUCT_SKU.REAL_PRICES'] = unit['afterSumPrice']
    //                    / 100
    //                    / unit['skuVOs'][0]['num'];
    //                if (unit['presents'] != null && unit['presents'].length == 1) {
    //                    if (presentIds != '') {
    //                        presentIds += ',';
    //                    }
    //                    presentIds += unit['presents'][0]['skuId'];
    //                }
    //            }
    //        })
    //    })
    //    $scope.orderPresentNum = 0;
    //    if (presentIds != '') {
    //        productFactory.getPresentsBySkuIds({'SHOP_PRODUCT_SKU.SKU_IDS': presentIds}, function
    // (response) { $scope.presents = response.data; $scope.presentMap = {} ;
    // $scope.planUnitList.forEach(function(unit){ if (null == unit) { return; } if (null ==
    // unit['presents'] || unit['presents'].length < 1){ return; }
    // $scope.presents.forEach(function(present){ if (unit['presents'][0]['skuId'] ==
    // present['SHOP_PRODUCT_SKU.SKU_ID']){ present['isPresent'] = true ; if (unit['skuVOs'] ==
    // null || unit['skuVOs'].length == 0){ present['orderOrPrd'] = "order" ;
    // $scope.presentMap['order'] = present; $scope.orderPresentNum = unit['presents'][0]['num'];
    // }else { present['orderOrPrd'] = "prd" ; present['blongToSkuId'] = unit['skuVOs'][0]['skuId']
    // ; $scope.presentMap[ present['blongToSkuId'] ] = present; } present['SHOP_PRODUCT_SKU.SIZE']
    // = unit['presents'][0]['num'] $scope.skuList.push(present) ; } }) })  //旧逻辑
    // //$scope.skuList.forEach(function (ele) { //    $scope.presents.forEach(function (present) {
    // //        if (ele['planUnit'] == null) { //            return; //        } //        if
    // (null == ele['planUnit']['presents']) { //            return; //        } //        if
    // (ele['planUnit']['presents'][0]['skuId'] //            ==
    // present['SHOP_PRODUCT_SKU.SKU_ID']) { //            ele['present'] = present; //
    // ele['hasPresent'] = true; //        } else { //            ele['hasPresent'] = false; //
    //    } //    }) //}) //$scope.planUnitList.forEach(function (unit) { //    if (unit['skuVOs']
    // == null || unit['skuVOs'].length == 0) { //        $scope.presents.forEach(function
    // (present) { //            if (unit['presents'] == null || unit['presents'].length == 0) { //
    //                return; //            } //            if (unit['presents'][0]['skuId'] //
    //            == present['SHOP_PRODUCT_SKU.SKU_ID']) { //                $scope.orderPresent =
    // present; //                $scope.orderPresentNum = unit['presents'][0]['num']; //
    //  } //        }) //    } //});  }); } $scope.updateOrderPrice();  if
    // ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE'] >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
    // $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT'; } else {
    // $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN'; } $scope.canCommit = true;  }

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

        //订单促销
        //$scope.planUnitList.forEach(function (ele) {
        //    if (null == ele) {
        //        return;
        //    }
        //    if (ele['skuVOs'] == null || ele['skuVOs'].length == 0) {
        //        price = ele['afterSumPrice'] / 100;
        //    }
        //})

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
            weUI.toast.error('订单异常,请重新下单');
            window.history.back();
            return
        }
        if (isEmptyObject($scope.cookiePickupPerson)) {
            weUI.toast.error('请填写提货信息');
            return;
        }
        if (isEmptyObject($scope.cookiePickupPerson.getTime)) {
            weUI.toast.error('请选择提货时间');
            return;
        }
        if($scope.cookiePickupPerson.man==undefined||$scope.cookiePickupPerson.phone==undefined){
            weUI.toast.error('提货信息不全！');
            return;
        }
        if($scope.cookiePickupPerson.man.trim()==''||($scope.cookiePickupPerson.man+'').trim()==''){
            weUI.toast.error('提货信息不全！');
            return;
        }
        
        var orderDate = $scope.cookiePickupPerson.getTime.substring(0,10)+' 00:00:00';
        var endHours = Number($scope.cookiePickupPerson.endHours);
        var date = new Date(orderDate.replace(/\-/gi,"/")).getTime() - endHours*60*60*1000;
        var currDate = new Date().getTime();
        if(currDate > date){
        	weUI.toast.error('请重新选择提货日期！');
            return;
        }
       /* var orderDate = $scope.cookiePickupPerson.getTime.substring(0,10);
        var endHours = Number($scope.cookiePickupPerson.endHours);*/
        
        if ($scope.commitClick) {
            $scope.commitClick = false;
            weUI.toast.showLoading('正在下单');

            var params = $scope.order;
            //params['SHOP_ORDER.TYPE'] = $scope.cookiePickupPerson.type;//订货单

            params['SHOP_ORDER.TYPE'] = 4;//自提付款单

            params['SHOP_ORDER.SPECIAL_MODEL'] = 'APPOINTMENT';//特殊状态为预约
            params['SHOP_ORDER.REC_CONTACT'] = $scope.cookiePickupPerson.man;//收货人
            params['SHOP_ORDER.REC_PHONE'] = $scope.cookiePickupPerson.phone;//联系电话
            params['SHOP_ORDER.SHOP_NAME'] = $scope.shop['SHOP.SHOP_NAME'];//门店信息
            params['SHOP_ORDER.SHOP_ID'] = $scope.shop['SHOP.SHOP_ID'];//门店ID
           
            if ($scope.cookiePickupPerson.type == 1) {
                params['SHOP_ORDER.REC_TYPE'] = 1;//收货方式为快递
                params['SHOP_ORDER.REC_ADDR'] = noUndefinedAndNull($scope.cookiePickupPerson.shengshi)
                    + noUndefinedAndNull($scope.cookiePickupPerson.address);//收货地址
                params['SHOP_ORDER.GET_PRD_DATETIME'] = $scope.cookiePickupPerson.getTime;//送货时间
            } else {
                params['SHOP_ORDER.REC_TYPE'] = 2;//收货方式为自提
                params['SHOP_ORDER.GET_PRD_DATETIME'] = noUndefinedAndNull($scope.cookiePickupPerson.getTime);//提货时间
            }

            params['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.skuList);//sku信息
            params['ORDER_DATE'] = $scope.cookiePickupPerson.getTime.substring(0,10)+ ' 00:00:00';
            params['END_HOURS'] = Number($scope.cookiePickupPerson.endHours);
            orderFactory.addOrder(params, function (response) {

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

        var endHours = item['APPOINTMENT_PRODUCT.END_DAY'];
        var type = item['APPOINTMENT_PRODUCT.TIME_TYPE'];
        var still = item['APPOINTMENT_PRODUCT.STILL_DAY'];
        var startTime = item['APPOINTMENT_PRODUCT.START_TIME'];
        var next = true;
        var dayList = new Array;
        var getDay = new Array();
        if (type == 'WEEK') {
            var currTime = new Date().getDay();
            var currHours = new Date().getHours();
            var endDay = Math.ceil(Number(endHours / 24));
            if (currTime == 0) {
                currTime = 7;//周日
            }
            if ((startTime - currTime) > endDay) {
                next = false;
            } else {
                if ((startTime - currTime) > (endDay - 1)) {
                    if ((24 - currHours) > (endHours - (endDay - 1) * 24)) {
                        next = false;
                    } else {
                        next = true;
                    }
                } else {
                    next = true;
                }
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
            	var orderDate = GetDateStr(Number(i), startTime)+' 00:00:00';
                var endHours = Number(endHours);
                
                var date = new Date(orderDate.replace(/\-/gi,"/")).getTime() - endHours*60*60*1000;
                var currDate = new Date().getTime();
                if(currDate < date){
                	dayList.push(GetDateStr(Number(i), startTime) + '   08:00-19:00');
                 }
            }
        }else if(type=='WEEK_COMB'){
        	var currTime = new Date().getDay();//获得周几
            var currHours = new Date().getHours();//获得当前小时
            var endDay = Math.ceil(Number(endHours / 24));
            console.log(endDay)
            if (currTime == 0) {
                currTime = 7;//周日
            }
            var strs= new Array(); //定义一数组
            var strDay = null;
            strs=startTime.split(","); //字符分割     strs=strs.substring(0,(strs.length-1));
            for (i=0;i<strs.length ;i++ )
            {
            	strDay=(strs[i]);
            	 if ((strDay - currTime) > endDay) {
                     next = false;
                 } else {
                     if ((strDay - currTime) > (endDay - 1)) {
                         if ((24 - currHours) > (endHours - (endDay - 1) * 24)) {
                             next = false;
                         } else {
                             next = true;
                         }
                     } else {
                         next = true;
                     }
                 }
                 var day;

                 if (next) {
                     day = Number(strDay) + 7 - Number(currTime);
                 } else {
                     day = Number(strDay) - Number(currTime);
                 }
                 getDay.push(Number(day));
                 
            }
            var minDay = getDay[0];
            for(var i=1;i<getDay.length;i++){
            	if(minDay > getDay[i]){
            		minDay = getDay[i]
            	}
            }
            dayList.push(GetDateStr(Number(minDay) ) + '   08:00-19:00');
            console.info(dayList);
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
    
    /**
     * 
     * @param date1   格式2017-04-05
     * @param date2
     * @returns
     */
    function getMinTime(date1,date2){
    	datetime1 = new Date(date1.replace(/\-/gi,"/")).getTime();
    	datetime2 = new Date(date2.replace(/\-/gi,"/")).getTime();
    	if(datetime1 > datetime2){
    		return date2;
    	}else{
    		return date1;
    	}
    }
    
});
