var dateArray = new Array();
var addCardArray = new Array;
var rechargeOnlineArray = new Array();
var consumeArray = new Array();
var revertArray = new Array();
var consumeRedArray = new Array();
var theDate = new Date();
var theYear = theDate.getFullYear();
var theMonth = theDate.getMonth()+1;
var theDay = theDate.getDate();
var cardChartArray = new Array();
angular.module('AndSell.Main').controller('analysis_analysis_cardAnalysis_Controller', function ($scope, $stateParams,$timeout,modalFactory,analysisFactory) {
    modalFactory.setTitle('会员分析');

    //页面刚加载执行
    $scope.initLoad = function () {
        getCardSource(getYesterMonthBeginDay,theYear+"-"+theMonth+"-"+theDay);
        analysisFactory.getTotalCard().get({},function (response) {
            console.log(response);
            $scope.totalCard = response.data[0];
        },null);
        analysisFactory.getInvalidTotalCard().get({},function (response) {
            console.log(response);
            $scope.invalidTotalCard = response.data[0];
        },null);
        showChartOnCard();
        dataStatus($scope);
    };
    $scope.START = getYesterMonthBeginDay();
    $scope.END = theYear+"-"+theMonth+"-"+theDay;
    //上周的数据
    $scope.getGroupByYesterWeek = function () {
        clearCardTable();
        theMonth = theDate.getMonth();
        var yesterdayWeekFirstDay=new Date(theYear,theMonth,theDay - theDate.getDay() - 6);
        var yesterdayWeekEndDay = new Date(theYear, theMonth, theDay + (6 - theDate.getDay() - 6));
        getCardSource(yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate(),yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate())
        theMonth = theDate.getMonth()+1;
        $scope.groupRange['STARTDAY'] = yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate();
        $scope.groupRange['ENDDAY'] = yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate();
        showChartOnCard();
    }
    //上月的数据
    $scope.getGroupByYesterMonth = function () {
        clearCardTable();
        theMonth = theDate.getMonth();
        if(theMonth==0){
            theMonth=12;
            theYear=theYear-1;
        }
        var firstDay = theYear + "-" + theMonth + "-" + "1";//上个月的第一天
        var myDate = new Date(theYear, theMonth, 0);
        var lastDay = theYear + "-" + theMonth + "-" + myDate.getDate();//上个月的最后一天
        $scope.groupRange['STARTDAY'] = firstDay;
        $scope.groupRange['ENDDAY'] = lastDay;
        getCardSource(firstDay,lastDay);
        theMonth = theDate.getMonth()+1;
        showChartOnCard();
    }
    //昨天的数据
    $scope.getGroupByYesterDay = function () {
        clearCardTable();
        getCardSource(getYesterday(),getYesterday());
        $scope.groupRange['STARTDAY'] = getYesterday()
        $scope.groupRange['ENDDAY'] = getYesterday()
        showChartOnCard();
    }
    //本月的数据
    $scope.getGroupByThisMonth = function () {
        clearCardTable();
        getCardSource(getMonthFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        $scope.groupRange['STARTDAY'] = getMonthFirstDay()
        $scope.groupRange['ENDDAY'] = theYear+"-"+theMonth+"-"+theDay;
        showChartOnCard();
    }
    //本周的数据
    $scope.getGroupByThisWeek = function () {
        clearCardTable();
        getCardSource(getWeekFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        $scope.groupRange['STARTDAY'] = getWeekFirstDay()
        $scope.groupRange['ENDDAY'] = theYear+"-"+theMonth+"-"+theDay;
       showChartOnCard();
    }
    //通过日期查询
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        clearCardTable();
        getCardSource(startDay,endDay);
        showChartOnCard();
    }
    //显示图表
    function showChartOnCard() {
        cardChartArray = addCardArray;
        chartName = "新增会员";
        $timeout(function () {
            chartCard();
        },1000);
    }
    //select修改样式
    $scope.chargeChartOnCard = function (chartNum) {
        // var chartNum = $scope.CHART;
        changedChartOnCard(chartNum);
    }
    //根据日期范围来查询  不管是initLoad 还是日期框  还是周 年月  都用这个方法
     function getCardSource(startDay,endDay) {
         analysisFactory.getCardMoneyChangeRangeByRange(startDay,endDay).get({},function (response) {
            console.log(response);
            var flag = response.data;
            var addCard = 0;
            var rechargeOnlineSum = 0;
            var consumeSum= 0;
            var revertSum = 0;
            var consumeRedSum = 0;
            for(var i=0;i<flag.length;i++){
                flag[i]['MANAGE_DATA_ANALYSIS.SOURCE'] = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
                addCard += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['ADDCARD']);
                rechargeOnlineSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['RECHARGEONLINE']/100);
                consumeSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUME']/100);
                revertSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REVERT']/100);
                consumeRedSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUMERED']/100);
                dateArray[i] = flag[i]['MANAGE_DATA_ANALYSIS.DAY'];
                addCardArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['ADDCARD']);
                rechargeOnlineArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['RECHARGEONLINE']/100);
                consumeArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUME']/100);
                revertArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REVERT']/100);
                consumeRedArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUMERED']/100);
            }
            $scope.cardMoneyChange = flag;
            $scope.addCard = addCard;
            $scope.rechargeOnlineSum = rechargeOnlineSum;
            $scope.consumeSum = consumeSum;
            $scope.revertSum = revertSum;
            $scope.consumeRedSum = consumeRedSum;
        },null);

    }
});
//清除已经有的数据
function clearCardTable () {
    dateArray = new Array();
    addCardArray = new Array;
    rechargeOnlineArray = new Array();
    consumeArray = new Array();
    revertArray = new Array();
    consumeRedArray = new Array();
    cardChartArray = new Array();
}
//获取最近一个月的起始时间
function getYesterMonthBeginDay() {
    var monthData = new Date();
    monthData.setMonth(monthData.getMonth()-1);
    return monthData.getFullYear()+"-"+(monthData.getMonth()+1)+"-"+monthData.getDate()
}
//获取昨天
function getYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+yesterday.getDate()
}
//本周第一天
function getWeekFirstDay() {
    var weekFirstDay=new Date(theDate-(theDate.getDay()-1)*86400000);
    return weekFirstDay.getFullYear()+"-"+(weekFirstDay.getMonth()+1)+"-"+weekFirstDay.getDate();
}
//本月第一天
function getMonthFirstDay() {
    var monthFirstDay=new Date(theDate.getFullYear(),theDate.getMonth(),1);
    return monthFirstDay.getFullYear()+"-"+(monthFirstDay.getMonth()+1)+"-"+monthFirstDay.getDate();
}
//通过select 切换图表样式
function changedChartOnCard(chartNum) {
    switch (chartNum){
        case '1':{
            cardChartArray = addCardArray;
            chartName = "新增会员";
            chartCard();
            break;
        }
        case '2':{
            cardChartArray = rechargeOnlineArray;
            chartName = "会员充值";
            chartCard();
            break;
        }
        case '3':{
            cardChartArray = consumeArray;
            chartName = "会员消费";
            chartCard();
            break;
        }
        case '4':{
            cardChartArray = revertArray;
            chartName = "会员返点";
            chartCard();
            break;
        }
        case '5':{
            cardChartArray = consumeRedArray;
            chartName = "会员红冲";
            chartCard();
            break;
        }
    }
}
//百度的图片调用
function chartCard(){
    var myChart = echarts.init(document.getElementById('main'));
    var option = {

        tooltip: {
            trigger:'axis'
        },
        legend: {
            data:[chartName]
        },
        grid:{
            show:true,
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateArray,
        },
        yAxis: {},
        series: [{
            name: chartName,
            type: 'line',
            data: cardChartArray
        }]
    };
    myChart.setOption(option);
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


    $('#endDay').datetimepicker({
        minView: "month",
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy-mm-dd ',
        todayBtn: 'linked',
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