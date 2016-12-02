angular.module('AndSell.Main').controller('card_card_cardAnalysis_Controller', function ($scope, $stateParams,modalFactory,cardFactory) {

    modalFactory.setTitle('会员卡消费分析');
    $scope.initLoad = function () {

        cardFactory.getCardMoneyChangeRange().get({},function (response) {
            console.log(response);
            $scope.cardMoneyChangeRange=response.data;
        });
        cardFactory.getCardMoneyGroup("消费").get({},function (response) {
            console.log(response);
            $scope.consumeList = response.data;
        },null);
        cardFactory.getCardMoneyGroup("会员充值").get({},function (response) {
            console.log(response);
            $scope.rechargeList = response.data;
        },null);
        cardFactory.getCardMoneyGroup("消费冲红").get({},function (response) {
            console.log(response);
            $scope.consumeRedList = response.data;
        },null);
        //反点
        // actoryMoneyGroupcardF.getCard("返点"),get({},function (response) {
        //     console.log(response);
        //     $scope.revertList = response.data;
        // },null);
    };
    $scope.initLoad();
});