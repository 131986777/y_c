AndSellH5MainModule.controller('H5.OrderAddController', function ($scope, $state, $stateParams, weUI, productFactory, orderFactory, modalFactory) {

    modalFactory.setTitle('新增订单');
    modalFactory.setBottom(false);

    $scope.initData= function () {

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
        productFactory.getProductSkuBySkuIds(params).get({}, function (response) {
            console.log(response);
            $scope.skuList = response.data;
            $scope.skuList.forEach(function (ele) {
                ele['SHOP_PRODUCT_SKU.SIZE']=$scope.cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
            });
            $scope.updateCartPrice();
        });

        $scope.shop = JSON.parse(getCookie('currentShopInfo'));

    }

    //计算订单价格  未做优惠促销等逻辑
    $scope.updateCartPrice= function () {
        var price=0;
        $scope.skuList.forEach(function (ele) {
            price+=ele['SHOP_PRODUCT_SKU.REAL_PRICES']*ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.order['SHOP_ORDER.PRICE_PRD']=price;

        //todo  加入其他优惠和出促销的等过滤
        $scope.order['SHOP_ORDER.PRICE_OVER']=price;
    }

    //提交订单
    $scope.commitOrder= function () {
        var params=$scope.order;
        params['SHOP_ORDER.TYPE']=1;//订货单
        params['SHOP_ORDER.REC_CONTACT']='帅比琪';//收货人
        params['SHOP_ORDER.REC_PHONE']='13257915508';//联系电话
        params['SHOP_ORDER.UID']=1000;//所属会员
        params['SHOP_ORDER.SHOP_NAME']=$scope.shop['SHOP.SHOP_NAME'];//门店信息
        params['SHOP_ORDER.SHOP_ID']=$scope.shop['SHOP.SHOP_ID'];//门店ID
        params['SHOP_ORDER.DETAILS']=JSON.stringify($scope.skuList);//sku信息
        orderFactory.addOrder(params).get({}, function (response) {

            weUI.toast.ok('下单成功');

            //成功之后删除购物车内容
            $scope.skuIds.split(',').forEach(function (ele) {
                $scope.cartInfo.remove(ele);
                if($scope.cartSize[ele]!=undefined){
                    $scope.cartSize[ele]=0;
                }
            });
            setCookie('cartSize',JSON.stringify($scope.cartSize));
            setCookie('cartInfo',JSON.stringify($scope.cartInfo));

            $state.go('order-success',{ORDER_ID:response.extraData.ORDER_ID});

        });
    }

});
