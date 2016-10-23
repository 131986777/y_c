AndSellH5MainModule.controller('H5.OrderListController', function ($scope, $state, orderFactory,modalFactory) {

    modalFactory.setTitle('订单列表');
    modalFactory.setBottom(false);


    $scope.initData= function () {
        $scope.filterStateOrder('all');
    }

    $scope.filterStateOrder= function (type) {
        $scope.state=type;
        $scope.filter={};
        if(type=='all'){
            //全部订单
        }else if(type=='end'){
            $scope.filter['SHOP_ORDER.STATE_ORDER']=1;
            $scope.filter['SHOP_ORDER.STATE_MONEY']=1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY']=1
        }else if(type=='pay'){
            $scope.filter['SHOP_ORDER.STATE_ORDER']=1;
            $scope.filter['SHOP_ORDER.STATE_MONEY']=-1;
        }else if(type=='get'){
            $scope.filter['SHOP_ORDER.STATE_ORDER']=1;
            $scope.filter['SHOP_ORDER.STATE_MONEY']=1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY']=-1
        }else if(type=='comment'){
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER']=1;
            $scope.filter['SHOP_ORDER.STATE_MONEY']=1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY']=1
            $scope.filter['SHOP_ORDER.STATE_COMMENT']=-1;
        }
        $scope.getOrder();
    }

    $scope.getOrder= function () {
        orderFactory.getOrder($scope.filter).get({}, function (response) {
            console.log(response);
            $scope.orderList=response.data;
            $scope.orderList.forEach(function (ele) {
                ele.details=JSON.parse(ele['SHOP_ORDER.ORDER_INFO']);
                setContentsInfoForOrder(ele);
            });
            console.log($scope.orderList);
        });
    }

    //<span
    // ng-if="order['SHOP_ORDER.STATE_ORDER']==1&&order['SHOP_ORDER.STATE_MONEY']==-1">订单待支付！</span>
    // <span
    // ng-if="order['SHOP_ORDER.STATE_ORDER']==1&&order['SHOP_ORDER.STATE_MONEY']==1&&order['SHOP_ORDER.STATE_DELIVERY']==-1">订单待提货！</span>
    // <span
    // ng-if="order['SHOP_ORDER.STATE_ORDER']==1&&order['SHOP_ORDER.STATE_MONEY']==1&&order['SHOP_ORDER.STATE_DELIVERY']==1">订单已完成！</span>
    // <span ng-if="order['SHOP_ORDER.STATE_ORDER']==-1">订单已取消！</span>

    //订单详情跳转
    $scope.toDetail= function (id) {
        $state.go('order-detail',{ORDER_ID: id});
    }

});
