angular.module('AndSell.H5.Main').controller('pages_order_add_Controller', function ($scope, $state, $stateParams, weUI, productFactory, orderFactory, modalFactory) {

    modalFactory.setTitle('新增订单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN=FILE_SERVER_DOMAIN;

    $scope.money=$stateParams.MONEY   //优惠券返回的价格
    $scope.memberCouponId=$stateParams.COUPON_ID;      //  要删除的id

    $scope.initData= function () {

        $scope.PickupPerson = JSON.parse($stateParams.pickupPerson);

        $scope.EmptyPick = isEmptyObject($scope.PickupPerson);

        $scope.order={};
        $scope.cartInfo = getCookie('cartInfo');
        $scope.cartSize = getCookie('cartSize');
        if ($scope.cartInfo == '') {
            $scope.cartInfo = new Array;
            $scope.cartSize = {};
        } else {
            $scope.cartInfo = JSON.parse($scope.cartInfo);
            $scope.cartSize = JSON.parse($scope.cartSize);
        }

        $scope.skuIds=$stateParams.SKU_IDS;
        var params = {};
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = $scope.skuIds;
        params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
        productFactory.getProductSkuBySkuIds(params).get({}, function (response) {

            console.log(response.data);
            $scope.skuList = response.data;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE']=$scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
            });
            $scope.updateCartPrice();
        });

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
        $scope.COUPON_INFO=$stateParams.COUPON_INFO;
        if($stateParams.COUPON_INFO!=''){
            $scope.coupon=JSON.parse($stateParams.COUPON_INFO);
            console.log($scope.coupon);
        }
        $scope.updateCartPrice();
    }


    //计算订单价格  未做优惠促销等逻辑
    $scope.updateCartPrice= function () {
        var price = 0;
        $scope.skuList.forEach(function (ele) {
            price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.order['SHOP_ORDER.PRICE_PRD'] = price;

        $scope.totalMoney = price;    //使用优惠券时，传给优惠券的总价 By cxy

        //todo  加入其他优惠和出促销的等过滤

        if ($scope.coupon != undefined) {
            $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = $scope.coupon.MONEY;
            price-=$scope.coupon.MONEY;
        }
        $scope.order['SHOP_ORDER.PRICE_ORDER']=price;
        $scope.order['SHOP_ORDER.PRICE_OVER']=price;
    }

    //提交订单
    $scope.commitOrder= function () {

        if(isEmptyObject($scope.PickupPerson)){
            weUI.toast.error('请填写提货信息');
            return;
        }
        var params=$scope.order;
        params['SHOP_ORDER.TYPE']=$scope.PickupPerson.type;//订货单
        params['SHOP_ORDER.REC_CONTACT']=$scope.PickupPerson.man;//收货人
        params['SHOP_ORDER.REC_PHONE']=$scope.PickupPerson.phone;//联系电话
        if($scope.PickupPerson.type==1){
            params['SHOP_ORDER.REC_TYPE']=1;//收货方式为快递
            params['SHOP_ORDER.REC_ADDR']=noUndefinedAndNull($scope.PickupPerson.shengshi)+noUndefinedAndNull($scope.PickupPerson.address);//收货地址
            params['SHOP_ORDER.GET_PRD_DATETIME']=$scope.PickupPerson.getTime;//送货时间
        }else{
            params['SHOP_ORDER.REC_TYPE']=2;//收货方式为自提
            params['SHOP_ORDER.SHOP_NAME']=$scope.shop['SHOP.SHOP_NAME'];//门店信息
            params['SHOP_ORDER.SHOP_ID']=$scope.shop['SHOP.SHOP_ID'];//门店ID
            params['SHOP_ORDER.GET_PRD_DATETIME']=noUndefinedAndNull($scope.PickupPerson.getTime);//提货时间
        }

        params['SHOP_ORDER.DETAILS']=JSON.stringify($scope.skuList);//sku信息
        orderFactory.addOrder(params).get({}, function (response) {

            if(response.code==0){
            weUI.toast.ok('下单成功');

                $scope.descCoupon();  //成功之后删除对应的优惠券

            //成功之后删除购物车内容
            $scope.skuIds.split(',').forEach(function (ele) {
                $scope.cartInfo.remove(ele);
                if($scope.cartSize[ele]!=undefined){
                    $scope.cartSize[ele]=0;
                }
            });
            setCookie('cartSize',JSON.stringify($scope.cartSize));
            setCookie('cartInfo',JSON.stringify($scope.cartInfo));
            $scope.descCoupon();
            $state.go('pages/payment/check_out',{ORDER_ID:response.extraData.ORDER_ID});
                }else{
                weUI.toast.ok(response.msg);
            }
        });
    }

    $scope.descCoupon=function () {
        orderFactory.deleteCoupon($scope.coupon.ID).get({}, function (response) {
            if(response.code==0){
                console.log('删除成功');
            }

        });
    }



    $scope.goCoupon=function(){
        $state.go('pages/order/addCoupon',{PRODUCTS:JSON.stringify($scope.skuList),MONEY:$scope.totalMoney,'SKU_IDS': $stateParams.SKU_IDS,'pickupPerson':$stateParams.pickupPerson});
    }


});
