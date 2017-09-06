angular.module('AndSell.H5.Main').controller('pages_order_addSeckill_Controller', function ($scope, $state, balanceFactory, promoFactory, $stateParams, weUI, $http, http, couponFactory, productFactory, orderFactory, modalFactory, seckillFactory,weUI) {

    modalFactory.setTitle('新增订单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;


    $scope.initData = function () {

        $scope.canCommit = false;

        $scope.cookiePickupPerson = JSON.parse(getCookie("pickupPerson"));

        $scope.EmptyPick = isEmptyObject($scope.cookiePickupPerson);
        if (!$scope.EmptyPick) {
            $scope.cookiePickupPerson.getTime = setTime();
        }

        $scope.order = {};


        var json=getCookie('seckill');
        $scope.seckill=JSON.parse(json);
        if (!$scope.EmptyPick) {
            $scope.cookiePickupPerson.getTime = GetDateStr(0,$scope.seckill['pick_up_goods_time'].replace(/-/g, "/")) + '   08:00-19:00';

        }
        console.log($scope.seckill);
        $scope.shop = JSON.parse(getCookie('currentShopInfo'));


        var params={}
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = $scope.seckill['sku_id'];
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params, function (response) {
        	console.log("==========getProductSkuBySkuIds=============");
            $scope.skuList = response.data;
            console.log($scope.skuList);
            $scope.skulistsForOrder = new Array;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE'] = $scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
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
            weUI.toast.error('订单异常,请重新下单');
            window.history.back();
            return
        }
        if (isEmptyObject($scope.cookiePickupPerson)) {
            weUI.toast.error('请填写提货信息');
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
                $scope.commitOrder($scope.seckill['seckill_id'], 1 ,memberId);
            }else if (promoReturn['state']==1){
                alert(promoReturn['message']);
            }
        })
    }

    //提交订单
    $scope.commitOrder = function (seckillId,num ,memberId) {

        if ($scope.commitClick) {
            $scope.commitClick = false;
            weUI.toast.showLoading('正在下单');

            var params = $scope.order;
            params['SHOP_ORDER.SPECIAL_MODEL'] = "SECKILL_"+seckillId;//秒杀的ID

            params['SHOP_ORDER.TYPE'] = $scope.cookiePickupPerson.type;//订货单
            params['SHOP_ORDER.TYPE'] = 4;//自提付款单
            params['SHOP_ORDER.REC_CONTACT'] = $scope.cookiePickupPerson.man;//收货人
            params['SHOP_ORDER.REC_PHONE'] = $scope.cookiePickupPerson.phone;//联系电话
            if ($scope.cookiePickupPerson.type == 1) {
                params['SHOP_ORDER.REC_TYPE'] = 1;//收货方式为快递
                params['SHOP_ORDER.REC_ADDR'] = noUndefinedAndNull($scope.cookiePickupPerson.shengshi)
                    + noUndefinedAndNull($scope.cookiePickupPerson.address);//收货地址
                params['SHOP_ORDER.GET_PRD_DATETIME'] = $scope.cookiePickupPerson.getTime;//送货时间
            } else {
                params['SHOP_ORDER.REC_TYPE'] = 2;//收货方式为自提
                params['SHOP_ORDER.SHOP_NAME'] = $scope.shop['SHOP.SHOP_NAME'];//门店信息
                params['SHOP_ORDER.SHOP_ID'] = $scope.shop['SHOP.SHOP_ID'];//门店ID
                params['SHOP_ORDER.GET_PRD_DATETIME'] = noUndefinedAndNull($scope.cookiePickupPerson.getTime);//提货时间
            }
            
            params['ORDER_DATE'] = $scope.cookiePickupPerson.getTime.substring(0,10)+ ' 00:00:00';
            params['END_HOURS'] = 0;

            params['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.skuList);//sku信息
            console.log('=======DETAILS======');
            console.log(params['SHOP_ORDER.DETAILS']);
            orderFactory.addOrder(params, function (response) {

                weUI.toast.hideLoading();

                weUI.toast.ok('下单成功');

                modalFactory.updateCart();

                $scope.commitClick = true;
                console.log(response);
                console.log("orderId========="+response.extraData.ORDER_ID);
                window.location.replace("#/pages/order/detail/"
                    + response.extraData.ORDER_ID
                    + '/Add/');

            }, function (response) {
                //添加订单失败的话就要回退秒杀！
                var form = {};
                form['SECKILL_ID']=seckillId;
                form['MEMBER_ID']=memberId;
                form['NUM']=num;
                seckillFactory.backspaceSeckill(form,function(response){
                })

                weUI.toast.hideLoading();
                $scope.commitClick = true;
                weUI.toast.error(response.msg);
            });
        }
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

});
