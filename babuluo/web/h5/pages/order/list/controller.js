AndSellH5MainModule.controller('H5.OrderListController', function ($scope, $state, orderFactory,modalFactory) {

    modalFactory.setTitle('订单列表');
    modalFactory.setBottom(false);


    $scope.initData= function () {


        $scope.hasNextPage=true;
        $scope.loading = false;  //状态标记
        $scope.filterStateOrder('all');
    }

    $scope.filterStateOrder= function (type) {

        $scope.orderList=new Array;

        $scope.state=type;
        $scope.filter={
            PAGE_SIZE : 5,
            PN : 1
        };
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
            Array.prototype.push.apply($scope.orderList,response.data);//数组合并
            $scope.orderList.forEach(function (ele) {
                ele.details=JSON.parse(ele['SHOP_ORDER.ORDER_INFO']);
                ele.details.forEach(function (item) {
                    setContentsInfoForOrder(item);
                });
            });
            console.log($scope.orderList);
            $scope.page=response.extraData.page;
            if($scope.page.querySize>$scope.page.pageIndex*$scope.page.pageSize){
                $scope.hasNextPage=true;
            }else{
                $scope.hasNextPage=false;
            }
            $scope.loading = false;
        });
    }

    //订单详情跳转
    $scope.toDetail= function (id) {
        $state.go('order-detail',{ORDER_ID: id});
    }

    //下拉更多商品
    $scope.getMoreOrder = function() {
        $scope.filter.PN = $scope.page.pageIndex+1;
        $scope.getOrder();
    };

    //下拉监听器
    $(document.body).infinite().on("infinite", function() {
        if($scope.loading) return;
        $scope.loading = true;
        if ($scope.hasNextPage) {
            $scope.getMoreOrder();
        }
    });

});
