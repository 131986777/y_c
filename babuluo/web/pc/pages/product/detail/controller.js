angular.module('AndSell.PC.Main').controller('pages_product_detail_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("商品详细");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);

    modalFactory.setLeftMenu(false);

});