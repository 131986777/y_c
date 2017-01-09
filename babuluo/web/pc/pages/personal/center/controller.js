/**
 * Created by njwb on 2017/1/9.
 */
angular.module('AndSell.PC.Main').controller('pages_personal_center_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("订单评价");

    modalFactory.setHeader(false);
    modalFactory.setSide(true);
    modalFactory.setCateGory(true);
});
