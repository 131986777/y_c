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
var charArray = null;
angular.module('AndSell.Main').controller('card_card_cardAnalysis_Controller', function ($scope, $stateParams,$timeout,modalFactory,cardFactory) {
    modalFactory.setTitle('会员分析');

    //页面刚加载执行
    $scope.initLoad = function () {
       getSource("1970-1-1",theYear+"-"+theMonth+"-"+theDay);
        cardFactory.getTotalCard().get({},function (response) {
            console.log(response);
            $scope.totalCard = response.data[0];
        },null);
        cardFactory.getInvalidTotalCard().get({},function (response) {
            console.log(response);
            $scope.invalidTotalCard = response.data[0];
        },null);
        showChartOnCard();
    };
    //上周的数据
    $scope.getGroupByYesterWeek = function () {
        clearTable();
        theMonth = theDate.getMonth();
        var yesterdayWeekFirstDay=new Date(theYear,theMonth,theDay - theDate.getDay() - 6);
        var yesterdayWeekEndDay = new Date(theYear, theMonth, theDay + (6 - theDate.getDay() - 6));
        getSource(yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate(),yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate())
        theMonth = theDate.getMonth()+1;
        showChartOnCard();
    }
    //上月的数据
    $scope.getGroupByYesterMonth = function () {
        clearTable();
        theMonth = theDate.getMonth();
        if(theMonth==0){
            theMonth=12;
            theYear=theYear-1;
        }
        var firstDay = theYear + "-" + theMonth + "-" + "1";//上个月的第一天
        var myDate = new Date(theYear, theMonth, 0);
        var lastDay = theYear + "-" + theMonth + "-" + myDate.getDate();//上个月的最后一天
        getSource(firstDay,lastDay);
        theMonth = theDate.getMonth()+1;
        showChartOnCard();
    }
    //今天的数据
    $scope.getGroupByNowDay = function () {
        clearTable();
        getSource(theYear+"-"+theMonth+"-"+theDay,theYear+"-"+theMonth+"-"+theDay);
        showChartOnCard();
    }
    //昨天的数据
    $scope.getGroupByYesterDay = function () {
        clearTable();
        getSource(getYesterday(),getYesterday());
        showChartOnCard();
    }
    //本月的数据
    $scope.getGroupByThisMonth = function () {
        clearTable();
        getSource(getMonthFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        showChartOnCard();
    }
    //本周的数据
    $scope.getGroupByThisWeek = function () {
        clearTable();
       getSource(getWeekFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        showChartOnCard();
    }
    //通过日期查询
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        clearTable();
        getSource(startDay,endDay);
        showChartOnCard();
    }
    //显示图表
    function showChartOnCard() {
        chartArray = addCardArray;
        chartName = "新增会员";
        $timeout(function () {
            chartCard();
        },1000);
    }
    //根据日期范围来查询  不管是initLoad 还是日期框  还是周 年月  都用这个方法
     function getSource(startDay,endDay) {
        cardFactory.getCardMoneyChangeRangeByRange(startDay,endDay).get({},function (response) {
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
                rechargeOnlineSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['RECHARGEONLINE']);
                consumeSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUME']);
                revertSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REVERT']);
                consumeRedSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUMERED']);
                dateArray[i] = flag[i]['MANAGE_DATA_ANALYSIS.DAY'];
                addCardArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['ADDCARD']);
                rechargeOnlineArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['RECHARGEONLINE']);
                consumeArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUME']);
                revertArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REVERT']);
                consumeRedArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CONSUMERED']);
            }
            $scope.cardMoneyChange = flag;
            $scope.addCard = addCard;
            $scope.rechargeOnlineSum = rechargeOnlineSum;
            $scope.consumeSum = consumeSum;
            $scope.revertSum = revertSum;
            $scope.consumeRedSum = consumeRedSum;
        },null);
         //select修改样式
         $scope.chargeChartOnCard = function (chartNum) {
             // var chartNum = $scope.CHART;
             changedChartOnCard(chartNum);
         }
    }
});
//清除已经有的数据
function clearTable () {
    dateArray = new Array();
    addCardArray = new Array;
    rechargeOnlineArray = new Array();
    consumeArray = new Array();
    revertArray = new Array();
    consumeRedArray = new Array();
}
//获取昨天
function getYesterday(){
    var yesterDay = new Date(theDate-(theDate.getDay()-1));
    return yesterDay.getFullYear()+"-"+(yesterDay.getMonth()+1)+"-"+yesterDay.getDate()
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
            chartArray = addCardArray;
            chartName = "新增会员";
            chartCard();
            break;
        }
        case '2':{
            chartArray = rechargeOnlineArray;
            chartName = "会员充值";
            chartCard();
            break;
        }
        case '3':{
            chartArray = consumeArray;
            chartName = "会员消费";
            chartCard();
            break;
        }
        case '4':{
            chartArray = revertArray;
            chartName = "会员返点";
            chartCard();
            break;
        }
        case '5':{
            chartArray = consumeRedArray;
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
            data: chartArray
        }]
    };
    myChart.setOption(option);
}