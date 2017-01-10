angular.module('AndSell.PC.Main').controller('pages_order_review_Controller', function (productFactory, $interval, $scope,$stateParams, $state, modalFactory, orderFactory) {

    modalFactory.setTitle("订单评论");

    modalFactory.setHeader(false);

    modalFactory.setCateGory(true);

    modalFactory.setSide(true);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.flag = 1;
        $scope.star = [];
        $scope.evaluate = [];
        $scope.getOrder($stateParams.ID);
        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
    };

    $scope.getOrder = function (id) {
        orderFactory.getOrderById({'SHOP_ORDER.ID': id}, function (response) {
            //response.data[0]['SHOP_ORDER.DATETIME_ADD'] =
            // getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            $scope.orderDetailList = JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order = response.data[0];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
        });
    };

    $scope.commitData = function () {
        var params = {};
        params['SHOP_COMMENT.STATE'] = $scope.state;
        console.log( $scope.orderDetailList);
        console.log( $scope.order['SHOP_ORDER.SHOP_ID']);
        var commit={};
        var promise=new Array;
        for(var i = 0;i<$scope.evaluate.length;i++){
            commit[i]=$q.defer();
            promise.push(commit[i].promise);
            params['SHOP_COMMENT.STAR'] = $scope.star[i];
            params['SHOP_COMMENT.PRO_MAIN_COMMENT'] = $scope.evaluate[i];
            params['SHOP_COMMENT.SHOP_ID'] = $scope.order['SHOP_ORDER.SHOP_ID'];

            params['SHOP_COMMENT.PRO_ID'] = $scope.orderDetailList[i]['SHOP_ORDER_INFO.PRD_ID'];
            params['SHOP_COMMENT.PRO_SKU'] = $scope.orderDetailList[i]['SHOP_ORDER_INFO.SKU'];
            params['SHOP_ORDER.ID'] = $stateParams.ID;
            params['SHOP_ORDER.STAE_COMMENT'] = '1';
            orderFactory.addComments(params,function (resp) {
                commit[i].resolve();
            });

        }
        $q.all(promise).then(function () {
            $state.go('pages/order/detail',{ORDER_ID: id});
            weUI.toast.info("提交成功");
        });
    };

    //判断是否匿名
    $scope.clickIn = function () {

        if($scope.flag==1){
            $scope.flag*=-1;
        }else{
            $scope.flag*=-1;
        }
    };

});


