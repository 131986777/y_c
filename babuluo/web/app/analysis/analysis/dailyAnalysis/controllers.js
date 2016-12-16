/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_dailyAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("线上经营日报");
    modalFactory.setBottom(false);
    $scope.initLoad = function () {
        getDailySource(getYesterday(),getYesterday());
        dataStatus($scope);
    }
    $scope.YESTERDAY = getYesterday();
    $scope.getGroupByRange = function () {
        var day = $scope.groupRange['DAY'];
        getDailySource(day,day);
    }
    function getDailySource(startDay,endDay) {
        analysisFactory.getshopDailyChangeByRange(startDay,endDay).get({},function (response) {
            console.log(response);
            if((response.data).length==0){
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = JSON.parse((response.data)[0]['MANAGE_DATA_ANALYSIS.SOURCE'])
            // var add_card_money = 0;
            var money_discount = 0
            var order_count = 0;
            // var add_card = 0;
            var money_count = 0;
            var money_over = 0;
            for(var i=0;i<flag.length;i++){
                // add_card_money += parseFloat(flag[i]['SHOP_VALUE']['ADD_CARD_MONEY'])/100;
                money_discount += parseFloat(flag[i]['SHOP_VALUE']['MONEY_DISCOUNT'])/100
                order_count += parseFloat(flag[i]['SHOP_VALUE']['ORDER_COUNT']);
                // add_card += parseFloat(flag[i]['SHOP_VALUE']['ADD_CARD']);
                money_count += parseFloat(flag[i]['SHOP_VALUE']['MONEY_COUNT'])/100;
                money_over += parseFloat(flag[i]['SHOP_VALUE']['MONEY_OVER'])/100;
            }
            // $scope.ADD_CARD_MONEY = add_card_money;
            $scope.MONEY_DISCOUNT  = money_discount
            $scope.ORDER_COUNT = order_count;
            // $scope.ADD_CARD = add_card;
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
function dataStatus($scope) {
    $('#startDay').datetimepicker({
        minView: "month",
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy-mm-dd',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });
    $(document).ready(function() {
        $('#birthday').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

    $(document).ready(function() {
        $('#birthdayDate').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });
}
