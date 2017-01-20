/**
 * Created by njwb on 2017/1/17.
 */
angular.module('AndSell.PC.Main').controller('pages_product_collect_Controller', function (productFactory, $interval, $stateParams, $scope, $state, modalFactory) {

    modalFactory.setTitle("我的收藏");

    modalFactory.setHeader(false);

    modalFactory.setCateGory(true);

    modalFactory.setSide(true);
})