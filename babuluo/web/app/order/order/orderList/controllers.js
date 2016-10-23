AndSellMainModule.controller('orderListController', function ($scope,$state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('订货单');
    modalFactory.setBottom(false);

    $scope.initData= function () {
        $scope.yy={
            'background-color' : '#31C552'
        };

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
        $scope.orderSizeMap={
            'pay':0,
            'get':0,
            'comment':0
        }
        orderFactory.getOrder($scope.filter).get({}, function (response) {
            console.log(response);
            $scope.orderList=response.data;
            $scope.orderList.forEach(function (ele) {

                ele['SHOP_ORDER.DATETIME_ADD']=getDate(ele['SHOP_ORDER.DATETIME_ADD']);
                ele.details=JSON.parse(ele['SHOP_ORDER.ORDER_INFO']);
                ele.details.forEach(function (item) {
                    setContentsInfoForOrder(item);
                });
                console.log(ele);
                if(ele['SHOP_ORDER.STATE_ORDER']==1&&ele['SHOP_ORDER.STATE_MONEY']==-1){
                    $scope.orderSizeMap.pay+=1;
                }else if(ele['SHOP_ORDER.STATE_ORDER']==1&&ele['SHOP_ORDER.STATE_MONEY']==1&&ele['SHOP_ORDER.STATE_DELIVERY']==-1){
                    $scope.orderSizeMap.get+=1;
                }else if(ele['SHOP_ORDER.STATE_ORDER']==1&&ele['SHOP_ORDER.STATE_MONEY']==1&&ele['SHOP_ORDER.STATE_DELIVERY']==1&&ele['SHOP_ORDER.STATE_COMMENT']==-1){
                    $scope.orderSizeMap.comment+=1;
                }
            });
            console.log($scope.orderList);
        });
    }

    //查询订单
    $scope.searchOrder= function () {
        $scope.filter['SHOP_ORDER.FILTER_CONTENT']=$scope.orderFilter;
        $scope.getOrder();
    }

    //订单详情跳转
    $scope.toDetail= function (id) {
        $state.go('order-detail',{ORDER_ID: id});
    }

});
