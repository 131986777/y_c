angular.module('AndSell.Main').controller('order_order_offlineOrderList_Controller', function ($scope, $state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('订货单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.yy = {
            'background-color': '#31C552'
        };
        $scope.filterStateOrder('all');
    }

    $scope.filterStateOrder = function (type) {
        $scope.state = type;
        $scope.orderType=$stateParams.orderType;
        $scope.filter = {};
        if ($stateParams.keyword != '') {
            $scope.orderFilter = $stateParams.keyword;
            $scope.searchOrder();
        }
        if ($stateParams.orderType != '0') {
            $scope.filter['SHOP_ORDER_OFFLINE.TYPE'] = $scope.orderType;
            if ($stateParams.orderType == '1') {
                modalFactory.setTitle('订货单');
            } else if ($stateParams.orderType == '3') {
                modalFactory.setTitle('提货单');
            }
        }
        if (type == 'all') {
            //全部订单
        } else if (type == 'end') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_OUT'] = 1;
            if($scope.orderType=='1'){
                $scope.filter['SHOP_ORDER_OFFLINE.STATE_SEND'] = 1
            }else if($scope.orderType=='3'){
                $scope.filter['SHOP_ORDER_OFFLINE.STATE_DELIVERY'] = 1
            }
        } else if (type == 'pay') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = -1;
        } else if (type == 'get') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_DELIVERY'] = -1
        } else if (type == 'out') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_OUT'] = -1
        }  else if (type == 'send') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_SEND'] = -1
        }  else if (type == 'accept') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_OUT'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_SEND'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ACCEPT'] = -1;
        }   else if (type == 'cancel') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = -1;
        } else if (type == 'comment') {
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_ORDER'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_MONEY'] = 1;
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_OUT'] = 1;
            //待评价订单
            if($scope.orderType=='1'){
                $scope.filter['SHOP_ORDER_OFFLINE.STATE_SEND'] = 1;
                $scope.filter['SHOP_ORDER_OFFLINE.STATE_ACCEPT'] = 1;
            }else if($scope.orderType=='3'){
                $scope.filter['SHOP_ORDER_OFFLINE.STATE_DELIVERY'] = 1;
            }
            $scope.filter['SHOP_ORDER_OFFLINE.STATE_COMMENT'] = -1;
        }
    }

    $scope.getOrder = function (response) {

        console.log($scope.orderList);
        $scope.orderList = response.data;
        $scope.orderList.forEach(function (ele) {
            ele['SHOP_ORDER_OFFLINE.DATETIME_ADD'] = getDate(ele['SHOP_ORDER_OFFLINE.DATETIME_ADD']);
            ele.details = JSON.parse(ele['SHOP_ORDER_OFFLINE.ORDER_INFO']);
            ele.details.forEach(function (item) {
                setContentsInfoForOrder(item);
            });
        });
        console.log($scope.orderList);
    }

    //查询订单
    $scope.searchOrder = function () {
        $scope.filter['SHOP_ORDER_OFFLINE.FILTER_CONTENT'] = $scope.orderFilter;
    }

    //订单详情跳转
    $scope.toDetail = function (id) {
        $state.go('order/order/orderDetail', {ORDER_ID: id});
    }

});
