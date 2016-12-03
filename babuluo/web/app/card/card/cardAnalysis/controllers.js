angular.module('AndSell.Main').controller('card_card_cardAnalysis_Controller', function ($scope, $stateParams,modalFactory,cardFactory) {

    modalFactory.setTitle('会员卡消费分析');
    $scope.initLoad = function () {
        cardFactory.getCardMoneyChangeRange().get({},function (response) {
            console.log(response);
            $scope.cardMoneyChangeRange=response.data;
        },null);
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
        cardFactory.getCardMoneyGroup("返点"),get({},function (response) {
            console.log(response);
            $scope.revertList = response.data;
        },null);
    };

    $scope.clearTable=function () {
        $scope.cardMoneyChangeRange="";
        $scope.consumeList="";
        $scope.rechargeList="";
        $scope.consumeRedList="";
        $scope.revertList="";

    }
    
    $scope.getGroupByRange = function () {
        $scope.clearTable();
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        cardFactory.getCardMoneyChangeRangeByRange(startDay,endDay).get({},function (response) {
            console.log(response);
            $scope.cardMoneyChangeRange=response.data;
        },null);
        cardFactory.getCardMoneyGroupByRange("消费",startDay,endDay).get({},function (response) {
            console.log(response);
            $scope.consumeList = response.data;
        },null);
        cardFactory.getCardMoneyGroupByRange("会员充值",startDay,endDay).get({},function (response) {
            console.log(response);
            $scope.rechargeList = response.data;
        },null);
        cardFactory.getCardMoneyGroupByRange("消费冲红",startDay,endDay).get({},function (response) {
            console.log(response);
            $scope.consumeRedList = response.data;
        },null);
        cardFactory.getCardMoneyGroupByRange("返点",startDay,endDay).get({},function (response) {
            console.log(response);
            $scope.revertList = response.data;
        },null);
    }
});