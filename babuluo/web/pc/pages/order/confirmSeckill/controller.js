/**
 * Created by njwb on 2017/1/12.
 */
angular.module('AndSell.PC.Main').controller('pages_order_confirmSeckill_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory, orderFactory, couponFactory, promoFactory, balanceFactory,seckillFactory) {

    modalFactory.setTitle("确认下单");

    modalFactory.setHeader(false);

    modalFactory.setSide(false);

    modalFactory.setShowMenu(true);

    modalFactory.setTab(true);

    modalFactory.setLeftMenu(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    //$scope.money = $stateParams.MONEY;   //优惠券返回的价格
    // $scope.memberCouponId=$stateParams.COUPON_ID;      //  要删除的id


    $scope.initData = function () {

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
        $scope.shopName = $scope.shop['SHOP.SHOP_NAME'];


        $scope.date = $scope.setTime();

        $scope.canCommit = false;

        $scope.pickMan = JSON.parse(getCookie("pickupMan"));

        $scope.order = {};

        var json=getCookie('seckill');
        $scope.seckill=JSON.parse(json);

        var params = {};

        params['SHOP_PRODUCT_SKU.SKU_IDS'] = $scope.seckill['sku_id'];
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
            $scope.skuList = response.data;
            $scope.totalSize = 0;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE'] = $scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                $scope.totalSize = $scope.totalSize + ele['SHOP_PRODUCT_SKU.SIZE'];
                ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = moneyFormat(ele['SHOP_PRODUCT_SKU.REAL_PRICES']);
                ele.isSelect = false;
                ele.isSale = false;
                ele['SHOP_PRODUCT_SKU.REAL_PRICES']=$scope.seckill['unit_price']/100;
                ele['SHOP_PRODUCT_SKU.SIZE']=1;
            });
            $scope.updateOrderPrice();
            $scope.canCommit = true;
        });

        $scope.commitClick = true;
        $scope.queryAccount();
    }


    //计算订单价格
    $scope.updateOrderPrice = function () {
        $scope.order['SHOP_ORDER.PRICE_PRD'] = $scope.seckill['unit_price']/100;;
        $scope.order['SHOP_ORDER.PRICE_SALE'] = 0; // 促销价格
        $scope.order['SHOP_ORDER.PRICE_PRD'] = $scope.seckill['unit_price']/100;
        $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = 0;
        $scope.order['SHOP_ORDER.PRICE_COUPON'] = 0;
        $scope.order['SHOP_ORDER.PRICE_ORDER'] = $scope.seckill['unit_price']/100;
        $scope.order['SHOP_ORDER.PRICE_OVER'] = $scope.seckill['unit_price']/100;

    }

    /**
     * 秒杀是否成功
     */
    $scope.goSeckill=function(){
        if (!$scope.canCommit) {
            return;
        }

        if ($scope.order['SHOP_ORDER.PRICE_OVER'] <= 0) {
            modalFactory.showShortAlert('订单异常,请重新下单');
            window.history.back();
            return
        }
        if (isEmptyObject($scope.pickMan)) {
            modalFactory.showShortAlert('请填写提货信息');
            return;
        }

        var form = {};
        form['SECKILL_ID']=$scope.seckill['seckill_id'];
        form['NUM']=1;
        var memberId=getCookie("ANDSELLID");
        form['MEMBER_ID']=memberId;
        seckillFactory.goSeckill(form,function(response){
            var promoReturn = response['extraData']['promoReturn'];
            //成功就下单 不成功提示信息
            if (promoReturn['state']==0){
                $scope.commitOrder();
            }else if (promoReturn['state']==1){
                alert(promoReturn['message']);
            }
        })
    }

    //提交订单
    $scope.commitOrder = function () {

        if ($scope.commitClick) {
            $scope.commitClick = false;

            var params = $scope.order;

            params['SHOP_ORDER.REC_CONTACT'] = $scope.pickMan.man;//收货人
            params['SHOP_ORDER.REC_PHONE'] = $scope.pickMan.phone;//联系电话
            params['SHOP_ORDER.REC_TYPE'] = 2;//收货方式为自提
            params['SHOP_ORDER.SHOP_NAME'] = $scope.shop['SHOP.SHOP_NAME'];//门店信息
            params['SHOP_ORDER.SHOP_ID'] = $scope.shop['SHOP.SHOP_ID'];//门店ID
            params['SHOP_ORDER.GET_PRD_DATETIME'] = $scope.date;//提货时间

            if ($scope.coupon != undefined) {
                params['SHOP_ORDER.COUPON_ID'] = $scope.coupon.ID;
            }
            params['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.skuList);//sku信息
            orderFactory.addOrder(params, function (response) {

                modalFactory.showShortAlert('下单成功');

                if ($scope.coupon != undefined) {
                    $scope.descCoupon($scope.coupon.ID);
                }
                $scope.commitClick = true;
                console.log(response);
                window.location.replace("#/pages/order/detail/"
                    + response.extraData.ORDER_ID);

            }, function (response) {
                $scope.commitClick = true;
                modalFactory.showShortAlert(response.msg);
            });
        }

        setCookie("pickupMan", JSON.stringify($scope.pickMan));
    }

    $scope.cardPay = function () {
        if ($scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE']
            >= $scope.order['SHOP_ORDER.PRICE_OVER']) {
            $scope.order['SHOP_ORDER.PAY_TYPE'] = 'ACCOUNT';
        } else {
            modalFactory.showShortAlert('会员卡余额不足，请先充值');
        }
    }

    $scope.wxPay = function () {
        $scope.order['SHOP_ORDER.PAY_TYPE'] = 'WEIXIN';
    }

    $scope.queryAccount = function () {
        var form = {};
        balanceFactory.queryAccountByUid({}, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
            if ($scope.balanceInfo.length > 0) {

            } else {
                $state.go('pages/login/accountLogin');
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
            PRODUCTS: JSON.stringify($scope.skuList),
            MONEY: $scope.totalMoney,
            'SKU_IDS': $stateParams.SKU_IDS,
            'pickupPerson': $stateParams.pickupPerson,
            'FROM': 'ADD'
        });
    }

    $scope.setTime = function () {
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
        var todDate = fDate2.getFullYear() + "-" + ifLessTen((fDate2.getMonth() + 1)) + "-" + ifLessTen(fDate2.getDate()) + " " + ifLessTen(fDate2.getHours()) + ":" + ifLessTen(fDate2.getMinutes()) + "-19:00";

        var fDate3 = new Date(fDate.getTime());
        var todDate2 = fDate3.getFullYear() + "-" + ifLessTen((fDate3.getMonth() + 1)) + "-" + ifLessTen(fDate3.getDate()) + " 08:00-19:00";

        var nDate = new Date(fDate.getTime() + 24 * 60 * 60 * 1000);
        var tmoDate = nDate.getFullYear() + "-" + ifLessTen((nDate.getMonth() + 1)) + "-" + ifLessTen(nDate.getDate()) + " 08:00-19:00";

        if (ifToday && ifEarly) {
            return todDate2;
        } else if (ifToday) {
            return todDate;
        } else {
            return tmoDate;
        }
    }
});