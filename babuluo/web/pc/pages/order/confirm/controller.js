/**
 * Created by njwb on 2017/1/12.
 */
angular.module('AndSell.PC.Main').controller('pages_order_confirm_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory, orderFactory) {

    modalFactory.setTitle("确认下单");

    modalFactory.setHeader(false);

    modalFactory.setShowMenu(true);
    modalFactory.setTab(true);
    modalFactory.setLeftMenu(false);
})