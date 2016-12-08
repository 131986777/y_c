/**
 * Created by cynara on 2016/12/1.
 */
var dateArray = new Array();
var turnoverArray = new Array();
var deductionArray = new Array();
var cancel_moneyArray = new Array();
var realincomeArray = new Array();
var orderquantityArray = new Array();
var deduction_ordersArray = new Array();
var cancel_ordersArray = new Array();
var dissuccess_ordersArray = new Array();
var success_ordersArray = new Array();
var chartArray = new Array();
var chartName = null;
var theDate = new Date();
var theYear = theDate.getFullYear();
var theMonth = theDate.getMonth()+1;
var theDay = theDate.getDate();
angular.module('AndSell.Main').controller('analysis_analysis_orderAnalysis_Controller', function ($scope, $stateParams,$timeout, analysisFactory, modalFactory) {

    modalFactory.setTitle("销售分析");
    modalFactory.setBottom(false);

    //上周的数据
    $scope.getGroupByYesterWeek = function () {
        clearTable();
        theMonth = theDate.getMonth();
        var yesterdayWeekFirstDay=new Date(theYear,theMonth,theDay - theDate.getDay() - 6);
        var yesterdayWeekEndDay = new Date(theYear, theMonth, theDay + (6 - theDate.getDay() - 6));
        getSource(yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate(),yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate())
        theMonth = theDate.getMonth()+1;
        showChartOnOrder();
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
        showChartOnOrder();
    }
    //今天的数据
    $scope.getGroupByNowDay = function () {
        clearTable();
        getSource(theYear+"-"+theMonth+"-"+theDay,theYear+"-"+theMonth+"-"+theDay)
        showChartOnOrder();
    }
    //昨天的数据
    $scope.getGroupByYesterDay = function () {
        clearTable();
        getSource(getYesterday(),getYesterday());
        showChartOnOrder();
    }
    //本月的数据
    $scope.getGroupByThisMonth = function () {
        clearTable();
        getSource(getMonthFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        showChartOnOrder();
    }
    //本周的数据
    $scope.getGroupByThisWeek = function () {
        clearTable();
        getSource(getWeekFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        showChartOnOrder();
    }
    //通过日期查询
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        clearTable();
        getSource(startDay,endDay);
        showChartOnOrder();
    }
    //页面初始化加载
    $scope.initLoad=function () {
        getSource("1970-1-1",theYear+"-"+theMonth+"-"+theDay);
        showChartOnOrder();
    }
    //显示图标
    function showChartOnOrder() {
        chartArray = turnoverArray;
        chartName = "营业额";
        $timeout(function () {
            chartOrder();
        },1000);
    }
    //修改
    $scope.chargeChartOnOrder = function (chartNum) {
        // var chartNum = $scope.CHART;
        changedChart(chartNum);
    }
    //根据日期范围查询  无论什么情景都用这个
    function getSource(startDay,endDay) {
        analysisFactory.getOrderAnalysisByRange(startDay,endDay).get({},function (response) {
            console.log(response);
            var flag = response.data;
            var turnoverSum = 0;
            var deductionSum = 0;
            var cancel_moneySum = 0;
            var cancel_ordersSum = 0;
            var realincomeSum = 0;
            var orderquantitySum = 0;
            var deduction_ordersSum = 0;
            var dissuccess_ordersSum = 0;
            var success_ordersSum = 0;
            for(var i=0;i<flag.length;i++){
                dateArray[i] =  flag[i]['MANAGE_DATA_ANALYSIS.DAY'];
                flag[i]['MANAGE_DATA_ANALYSIS.SOURCE'] = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
                turnoverSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['TURNOVER']);
                turnoverArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['TURNOVER']);
                deductionSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DEDUCTION']);
                deductionArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DEDUCTION']);
                cancel_moneySum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CANCEL_MONEY']);
                cancel_moneyArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CANCEL_MONEY']);
                realincomeSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REAL_INCOME']);
                realincomeArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REAL_INCOME']);
                orderquantitySum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['ORDER_QUANTITY']);
                orderquantityArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['ORDER_QUANTITY']);
                deduction_ordersSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DEDUCTION_ORDERS']);
                deduction_ordersArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DEDUCTION_ORDERS']);
                cancel_ordersSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CANCEL_ORDERS']);
                cancel_ordersArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CANCEL_ORDERS']);
                dissuccess_ordersSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DISSUCCESS_ORDERS']);
                dissuccess_ordersArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DISSUCCESS_ORDERS']);
                success_ordersSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['SUCCESS_ORDERS']);
                success_ordersArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['SUCCESS_ORDERS']);
            }
            $scope.orderAnaysis =flag;
            $scope.turnoverSum = turnoverSum;
            $scope.deductionSum = deductionSum;
            $scope.cancel_moneySum = cancel_moneySum;
            $scope.cancel_ordersSum = cancel_ordersSum;
            $scope.realincomeSum = realincomeSum;
            $scope.orderquantitySum = orderquantitySum;
            $scope.deduction_ordersSum = deduction_ordersSum;
            $scope.dissuccess_ordersSum = dissuccess_ordersSum;
            $scope.success_ordersSum = success_ordersSum;
        },null);
    };
});
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
//改变图表显示样式
function changedChart(chartNum) {
    switch (chartNum){
        case '1':{
            chartArray = turnoverArray;
            chartName = "营业额";
            chartOrder();
            break;
        }
        case '2':{
            chartArray = deductionArray;
            chartName = "折让金额";
            chartOrder();
            break;
        }
        case '3':{
            chartArray = cancel_moneyArray;
            chartName = "退款额";
            chartOrder();
            break;
        }
        case '4':{
            chartArray = realincomeArray;
            chartName = "实收合计";
            chartOrder();
            break;
        }
        case '5':{
            chartArray = orderquantityArray;
            chartName = "交易数";
            chartOrder();
            break;
        }
        case '6':{
            chartArray = deduction_ordersArray;
            chartName = "参与优惠";
            chartOrder();
            break;
        }
        case '7':{
            chartArray = cancel_ordersArray;
            chartName = "退单数";
            chartOrder();
            break;
        }
        case '8':{
            chartArray = dissuccess_ordersArray;
            chartName = "处理中";
            chartOrder();
            break;
        }
        case '9':{
            chartArray = success_ordersArray;
            chartName = "已完成";
            chartOrder();
            break;
        }
    }
}
//清除已经有的数据
function clearTable() {
    dateArray = new Array();
    turnoverArray = new Array();
    deductionArray = new Array();
    cancel_moneyArray = new Array();
    realincomeArray = new Array();
    orderquantityArray = new Array();
    deduction_ordersArray = new Array();
    cancel_ordersArray = new Array();
    dissuccess_ordersArray = new Array();
    success_ordersArray = new Array();
    chartArray = new Array();
}
//引入chart
function chartOrder(){
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
            name:chartName,
            type: 'line',
            data: chartArray
        }]
    };
    myChart.setOption(option);
}