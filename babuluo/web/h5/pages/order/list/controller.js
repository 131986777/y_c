angular.module('AndSell.H5.Main').controller('pages_order_list_Controller', function ($scope, $state, $stateParams, orderFactory, modalFactory, weUI) {

    modalFactory.setTitle('订单列表');
    modalFactory.setBottom(true);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.hasNextPage = true;
        $scope.loading = false;  //状态标记
        modalFactory.setCurrentPage('wd');
        $scope.filterStateOrder($stateParams.state);

        $('.orders').css("min-height", document.documentElement.clientHeight - 50);
    }

    $scope.filterStateOrder = function (type) {
        $scope.getDataReady = false;
        $scope.orderList = new Array;

        $scope.state = type;
        $scope.filter = {
            PAGE_SIZE: 5, PN: 1
        };
        if (type == 'all') {
            //全部订单
        } else if (type == 'out') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            //$scope.filter['SHOP_ORDER.STATE_MONEY']=-1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = -1;
        } else if (type == 'end') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = 1;
        } else if (type == 'pay') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = -1;
        } else if (type == 'get') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1;
        } else if (type == 'accept') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = 1;
            $scope.filter['SHOP_ORDER.STATE_ACCEPT'] = -1;
        } else if (type == 'comment') {
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1
            //$scope.filter['SHOP_ORDER.STATE_OUT']=1
            //$scope.filter['SHOP_ORDER.STATE_SEND']=1
            //$scope.filter['SHOP_ORDER.STATE_ACCEPT']=1
            $scope.filter['SHOP_ORDER.STATE_COMMENT'] = -1;
        }
        $scope.getOrder();
    }

    $scope.bindPresent = function (){
        $scope.orderList.forEach(function (ele) {
            ele['presentMap'] = {}
            ele.details.forEach(function(detail){
                if (detail['isPresent'] == null) {
                    return
                }
                if (detail['orderOrPrd'] == "prd") {
                    ele['presentMap'][detail['blongToSkuId']] = detail;
                } else if (detail['orderOrPrd'] == "order") {
                    ele['presentMap']['order'] = detail;
                }
            })
        });
    }

    $scope.getOrder = function () {
        weUI.toast.showLoading('正在加载');
        orderFactory.getOrder($scope.filter, function (response) {
            console.log(response);
            Array.prototype.push.apply($scope.orderList, response.data);//数组合并
            $scope.orderList.forEach(function (ele) {
                ele.details = JSON.parse(ele['SHOP_ORDER.ORDER_INFO']);
                ele.details.forEach(function (item) {
                    setContentsInfoForOrder(item);
                });
                ele['SHOP_ORDER.DATETIME_ADD'] = getDate(ele['SHOP_ORDER.DATETIME_ADD']);
            });
            $scope.page = response.extraData.page;
            if ($scope.page.querySize > $scope.page.pageIndex * $scope.page.pageSize) {
                $scope.hasNextPage = true;
            } else {
                $scope.hasNextPage = false;
            }
            $scope.loading = false;
            weUI.toast.hideLoading();
            $scope.getDataReady = true;
            $scope.bindPresent()
        }, function (response) {
            weUI.toast.hideLoading();
            weUI.toast.error(response.msg);
        });
    }

    //订单详情跳转
    $scope.toDetail = function (id) {
        $state.go('pages/order/detail', {ORDER_ID: id});
    }

    //下拉更多商品
    $scope.getMoreOrder = function () {
        if ($scope.page != undefined) {
            $scope.filter.PN = $scope.page.pageIndex + 1;
        }
        $scope.getOrder();
    };

    //取消订单
    $scope.cancelOrder = function (id) {
        weUI.dialog.confirm('提示 ', ' 确认取消该订单嘛? ', function () {
            orderFactory.cancelOrder({'SHOP_ORDER.ID': id}, function () {
                weUI.toast.ok('取消订单成功');
                $scope.initData();
            });
        })
    }

    //下拉监听器
    $(document.body).infinite().on("infinite", function () {
        if ($scope.loading) return;
        $scope.loading = true;
        if ($scope.hasNextPage) {
            $scope.getMoreOrder();
        }
    });
    $scope.$on('$destroy', function () {
        $(document.body).infinite().off("infinite");
    })
});
