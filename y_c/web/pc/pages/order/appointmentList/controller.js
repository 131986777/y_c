angular.module('AndSell.PC.Main').controller('pages_order_appointmentList_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory, orderFactory) {

    modalFactory.setTitle("我的预约列表");

    modalFactory.setHeader(false);

    modalFactory.setCateGory(true);

    modalFactory.setSide(true);

    modalFactory.setLeftMenu(false);


    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.hasNextPage = true;
        $scope.loading = false;  //状态标记
        modalFactory.setCurrentPage('wd');
        $scope.filterStateOrder($stateParams.state);
        $scope.getOrderStates();
    }

    $scope.filterStateOrder = function (type) {
        $scope.getDataReady = false;
        $scope.orderList = new Array;

        $scope.state = type;
        $scope.filter = {
            PAGE_SIZE: 5, PN: 1, 'SHOP_ORDER.TYPE': '4'
        };
        if (type == 'all') {
            //全部订单
        } else if (type == 'end') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1;
        } else if (type == 'pay') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = -1;
            $scope.filter['SHOP_ORDER.NEED_PAY'] = 1;
        } else if (type == 'send') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.NEED_PAY'] = 1;
            $scope.filter['SHOP_ORDER.REC_TYPE'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = -1;
        } else if (type == 'get') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.REC_TYPE'] = 2;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1;
        } else if (type == 'delivery') {
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER.NEED_PAY'] = 1;
            $scope.filter['SHOP_ORDER.REC_TYPE'] = 1;
            $scope.filter['SHOP_ORDER.STATE_SEND'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = -1;
        } else if (type == 'comment') {
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER.STATE_DELIVERY'] = 1;
            $scope.filter['SHOP_ORDER.STATE_COMMENT'] = -1;
        } else if (type == 'cancel') {
            //待评价订单
            $scope.filter['SHOP_ORDER.STATE_ORDER'] = -1;
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


    $scope.getOrderStates = function () {
        orderFactory.getOrderStates({'SHOP_ORDER.TYPE':'4'}, function (response) {
            $scope.orderSizeMap = response.extraData.stateMap;
        });
    };

    $scope.getOrder = function () {
        orderFactory.getOrder($scope.filter, function (response) {
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

            $scope.getDataReady = true;
            $scope.bindPresent();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    //订单详情跳转
    $scope.toDetail = function (id) {
        $state.go('pages/order/detail', {ORDER_ID: id});
    };

    //订单支付跳转
    $scope.toPay = function (id) {
        $state.go('pages/personal/pay', {ORDER_ID: id});
    };

    //商品详情跳转
    $scope.toProduct = function (id) {
        $state.go('pages/product/detail', {PRD_ID: id});
    };

    //下拉更多商品
    $scope.getMoreOrder = function () {
        if ($scope.page != undefined) {
            $scope.filter.PN = $scope.page.pageIndex + 1;
        }
        $scope.getOrder();
    };

    //取消订单
    $scope.cancelOrder = function (id) {
        modalFactory.showAlert(' 确认取消该订单嘛? ', function () {
            orderFactory.cancelOrder({'SHOP_ORDER.ID': id}, function () {
                modalFactory.showShortAlert('取消订单成功');
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
