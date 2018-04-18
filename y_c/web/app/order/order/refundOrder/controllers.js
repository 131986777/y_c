angular.module('AndSell.Main').controller('order_order_refundOrder_Controller', function ($scope, $state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('退款单');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.bindData = function (response) {
        $("html,body").animate({scrollTop:0}, 250);
        $scope.orderList = response.data;
        $scope.orderList.forEach(function (ele) {
            ele['REFUND_ORDER.ORDER_INFO'] = JSON.parse(ele['REFUND_ORDER.ORDER_INFO']);
        });
    }

    $scope.searchOrder= function () {
        if($scope.orderFilter==''){
            $scope.filter['REFUND_ORDER.FILTER']='null';
            $scope.$broadcast('pageBar.reload');
            return;
        }
        $scope.filter['REFUND_ORDER.FILTER']=$scope.orderFilter;
    }

    //订单详情跳转
    $scope.toDetail = function (id) {
        $state.go('order/order/orderDetail', {ORDER_ID: id});
    }

    //已退款
    $scope.endRefund = function (order) {
        modalFactory.showAlert("确认已退款?", function (response) {
            orderFactory.refundOrder(order, function (response) {
                $scope.$broadcast('pageBar.reload');
            })
        });
    }

    //设置备注
    $scope.modifyRemark = function () {
        orderFactory.RemarkRefundOrder($scope.modify, function (response) {
            $scope.$broadcast('pageBar.reload');
            $('#modifyRemark').modal('hide');
        })
    }

    $scope.remarkClick = function (order) {
        $scope.modify = clone(order);
    }

});
