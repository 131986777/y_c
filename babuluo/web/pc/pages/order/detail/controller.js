angular.module('AndSell.PC.Main').controller('pages_order_list_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory, orderFactory) {

    modalFactory.setTitle("订单详情");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

});