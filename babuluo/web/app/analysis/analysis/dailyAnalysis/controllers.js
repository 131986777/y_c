/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_dailyAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("经营日报");
    modalFactory.setBottom(false);
    $scope.initLoad = function () {
        getDailySource(getYesterday(),getYesterday())
    }
    $scope.getGroupByRange = function () {
        var day = $scope.groupRange['DAY'];
        getDailySource(day,day);
    }
    function getDailySource(startDay,endDay) {
        analysisFactory.getshopDailyChangeByRange(startDay,endDay).get({},function (response) {
            console.log(response);
            var flag = JSON.parse((response.data)[0]['MANAGE_DATA_ANALYSIS.SOURCE'])
            var add_card_money = 0;
            var money_discount = 0
            var order_count = 0;
            var add_card = 0;
            var money_count = 0;
            var money_over = 0;
            for(var i=0;i<flag.length;i++){
                add_card_money += parseFloat(flag[i]['SHOP_VALUE']['ADD_CARD_MONEY'])/100;
                money_discount += parseFloat(flag[i]['SHOP_VALUE']['MONEY_DISCOUNT'])/100
                order_count += parseFloat(flag[i]['SHOP_VALUE']['ORDER_COUNT']);
                add_card += parseFloat(flag[i]['SHOP_VALUE']['ADD_CARD']);
                money_count += parseFloat(flag[i]['SHOP_VALUE']['MONEY_COUNT'])/100;
                money_over += parseFloat(flag[i]['SHOP_VALUE']['MONEY_OVER'])/100;
            }
            $scope.ADD_CARD_MONEY = add_card_money;
            $scope.MONEY_DISCOUNT  = money_discount
            $scope.ORDER_COUNT = order_count;
            $scope.ADD_CARD = add_card;
            $scope.MONEY_COUNT = money_count;
            $scope.MONEY_OVER = money_over;
            $scope.SHOPORDERCHANGE = flag;
        },null);
    }
});
//获取昨天
function getYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+yesterday.getDate()
}
