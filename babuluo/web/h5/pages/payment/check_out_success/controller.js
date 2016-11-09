angular.module('AndSell.H5.Main').controller('pages_payment_check_out_success_Controller', function ($scope, $state,$stateParams,productFactory,orderFactory,modalFactory) {

    modalFactory.setTitle('支付成功');
    modalFactory.setBottom(false);

})