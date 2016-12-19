/**
 * Created by liutao on 2016/12/12.
 */
angular.module('AndSell.Main').controller('analysis_analysis_compareAnalysis_Controller', function ($scope, $stateParams,$timeout, analysisFactory, modalFactory) {
    modalFactory.setTitle("作战室");
    $scope.initLoad=function () {
        getCompareSource(getYesterday(),getYesterday());
        dataStatus($scope);
        $scope.YESTERDAY = getYesterday();
        $scope.STATE=0;

    };
    $scope.changeSourceByState = function (state) {
        $scope.STATE = state;
    }
    $scope.changeSourceByDayState = function (state) {
        $scope.FLAG = state;
        if(state=='3'){
            $scope.initLoad();
        }else if(state=='4'){
            getCompareSource(getWeekBeginDay(new Date(new Date())),getWeekEndDay(new Date(new Date())));
        }else if(state =='5'){
            getCompareSource(getYesterMonthBeginDay(new Date()),getYesterday());
        }
        $scope.STATE=0;
    }
    $scope.getGroupByRange = function () {
        var day = $scope.groupRange['DAY'];
        if($scope.FLAG=='4'){
            getCompareSource(getWeekBeginDay(new Date(day)),getWeekEndDay(new Date(day)));
        }else if($scope.FLAG =='5'){
            getCompareSource(getYesterMonthBeginDay(day),day);
        }else{
            getCompareSource(day,day);
        }


    }
    function getCompareSource(startDay,endDay,state) {
        analysisFactory.getCompareChangeByRange(startDay,endDay).get({},function(response){
            console.log(response);
            if((response.data).length==0){
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = response.data;
            var jsonObj = JSON.parse(flag[0]['MANAGE_DATA_ANALYSIS.SOURCE']);
            console.log(jsonObj[0]["VALUE"])
            var tempJSON = null;
            for(var i = 1;i<flag.length;i++){
                tempJSON = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
                for(var j=0;j<jsonObj[0]['VALUE'].length;j++){
                    for(var k=0;k<tempJSON[0]['VALUE'].length;k++){
                        if(tempJSON[0]['VALUE'][k]['COMPARE_VALUE']['SHOP_ID']==jsonObj[0]['VALUE'][j]['COMPARE_VALUE']['SHOP_ID']){
                            jsonObj[0]['VALUE'][j]['COMPARE_VALUE']['MONEY_COUNT'] = parseFloat(jsonObj[0]['VALUE'][j]['COMPARE_VALUE']['MONEY_COUNT'])+parseFloat(tempJSON[0]['VALUE'][k]['COMPARE_VALUE']['MONEY_COUNT'])
                            break;
                        }
                    }
                }
                for(var j=0;j<jsonObj[1]['VALUE'].length;j++){
                    for(var k=0;k<tempJSON[1]['VALUE'].length;k++){
                        if(tempJSON[1]['VALUE'][k]['COMPARE_VALUE']['SHOP_ID']==jsonObj[1]['VALUE'][j]['COMPARE_VALUE']['SHOP_ID']){
                            jsonObj[1]['VALUE'][j]['COMPARE_VALUE']['CARD_MONEY_COUNT'] = parseFloat(jsonObj[1]['VALUE'][j]['COMPARE_VALUE']['CARD_MONEY_COUNT'])+parseFloat(tempJSON[1]['VALUE'][k]['COMPARE_VALUE']['CARD_MONEY_COUNT'])
                            break;
                        }
                    }
                }
                for(var j=0;j<jsonObj[2]['VALUE'].length;j++){
                    for(var k=0;k<tempJSON[2]['VALUE'].length;k++){
                        if(tempJSON[2]['VALUE'][k]['COMPARE_VALUE']['SHOP_ID']==jsonObj[2]['VALUE'][j]['COMPARE_VALUE']['SHOP_ID']){
                            jsonObj[2]['VALUE'][j]['COMPARE_VALUE']['ADD_NUMBER'] = parseFloat(jsonObj[2]['VALUE'][j]['COMPARE_VALUE']['ADD_NUMBER'])+parseFloat(tempJSON[2]['VALUE'][k]['COMPARE_VALUE']['ADD_NUMBER']);
                            break;
                        }
                    }
                }
            }
            $scope.jsonObj = jsonObj;
        });
    }
});

//获取以选择天数为基准的一周的开始
function getWeekBeginDay(day) {
    var monday = new Date(day.getTime() - (day.getDay()-1)*24*60*60*1000);
    return monday.getFullYear()+"-"+(monday.getMonth()+1)+"-"+monday.getDate();
}
//获取以选择天数为基准的一周的结束
function getWeekEndDay(day) {
    var sunday = new Date(day.getTime() + (7-day.getDay())*24*60*60*1000 );
    return sunday.getFullYear()+"-"+(sunday.getMonth()+1)+"-"+sunday.getDate();
}
//获取最近一个月的起始时间
function getYesterMonthBeginDay(day) {
    day.setMonth(day.getMonth()-1);
    return day.getFullYear()+"-"+(day.getMonth()+1)+"-"+day.getDate()
}
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

}