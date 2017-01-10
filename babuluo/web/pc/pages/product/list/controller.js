angular.module('AndSell.PC.Main').controller('pages_product_list_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("商品列表");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);

    $scope.bindData= function (response) {
        console.log(response);
    }

});
