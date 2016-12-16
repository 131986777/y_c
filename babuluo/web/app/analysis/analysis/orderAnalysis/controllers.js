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
var orderChartArray = new Array();
var chartName = null;
var theDate = new Date();
var theYear = theDate.getFullYear();
var theMonth = theDate.getMonth()+1;
var theDay = theDate.getDate();
angular.module('AndSell.Main').controller('analysis_analysis_orderAnalysis_Controller', function ($scope, $stateParams,$timeout, analysisFactory, modalFactory) {

    modalFactory.setTitle("线上销售分析");
    modalFactory.setBottom(false);
    $scope.START = getYesterMonthBeginDay();
    $scope.END = theYear+"-"+theMonth+"-"+theDay;
    //上周的数据
    $scope.getGroupByYesterWeek = function () {
        clearOrderTable();
        theMonth = theDate.getMonth();
        var yesterdayWeekFirstDay=new Date(theYear,theMonth,theDay - theDate.getDay() - 6);
        var yesterdayWeekEndDay = new Date(theYear, theMonth, theDay + (6 - theDate.getDay() - 6));
        getOrderSource(yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate(),yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate())
        theMonth = theDate.getMonth()+1;
        $scope.groupRange['STARTDAY'] = yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate();
        $scope.groupRange['ENDDAY'] = yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate();
        showChartOnOrder();
    }
    //上月的数据
    $scope.getGroupByYesterMonth = function () {
        clearOrderTable();
        theMonth = theDate.getMonth();
        if(theMonth==0){
            theMonth=12;
            theYear=theYear-1;
        }
        var firstDay = theYear + "-" + theMonth + "-" + "1";//上个月的第一天
        var myDate = new Date(theYear, theMonth, 0);
        var lastDay = theYear + "-" + theMonth + "-" + myDate.getDate();//上个月的最后一天
        getOrderSource(firstDay,lastDay);
        theMonth = theDate.getMonth()+1;
        $scope.groupRange['STARTDAY'] = firstDay;
        $scope.groupRange['ENDDAY'] = lastDay;
        showChartOnOrder();
    }
    //今天的数据
    $scope.getGroupByNowDay = function () {
        clearOrderTable();
        getOrderSource(theYear+"-"+theMonth+"-"+theDay,theYear+"-"+theMonth+"-"+theDay)
        $scope.groupRange['STARTDAY'] = theYear+"-"+theMonth+"-"+theDay;
        $scope.groupRange['ENDDAY'] = theYear+"-"+theMonth+"-"+theDay;
        showChartOnOrder();
    }
    //昨天的数据
    $scope.getGroupByYesterDay = function () {
        clearOrderTable();
        getOrderSource(getYesterday(),getYesterday());
        $scope.groupRange['STARTDAY'] = getYesterday();
        $scope.groupRange['ENDDAY'] = getYesterday();
        showChartOnOrder();
    }
    //本月的数据
    $scope.getGroupByThisMonth = function () {
        clearOrderTable();
        getOrderSource(getMonthFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        $scope.groupRange['STARTDAY'] = getMonthFirstDay();
        $scope.groupRange['ENDDAY'] = theYear+"-"+theMonth+"-"+theDay;
        showChartOnOrder();
    }
    //本周的数据
    $scope.getGroupByThisWeek = function () {
        clearOrderTable();
        getOrderSource(getWeekFirstDay(),theYear+"-"+theMonth+"-"+theDay);
        $scope.groupRange['STARTDAY'] = getWeekFirstDay();
        $scope.groupRange['ENDDAY'] = theYear+"-"+theMonth+"-"+theDay;
        showChartOnOrder();
    }
    //通过日期查询
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        clearOrderTable();
        getOrderSource(startDay,endDay);
        showChartOnOrder();
    }
    //页面初始化加载
    $scope.initLoad=function () {
        getOrderSource(getYesterMonthBeginDay,theYear+"-"+theMonth+"-"+theDay);
        showChartOnOrder();
        dataStatus($scope);
    }
    //显示图标
    function showChartOnOrder() {
        orderChartArray = turnoverArray;
        chartName = "营业额";
        $timeout(function () {
            chartOrder();
        },1000);
    }
    //修改表格显示样式
    $scope.chargeChartOnOrder = function (chartNum) {
        // var chartNum = $scope.CHART;
        changedChart(chartNum);
    }
    //根据日期范围查询  无论什么情景都用这个
    function getOrderSource(startDay,endDay) {
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
                turnoverSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['TURNOVER']/100);
                turnoverArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['TURNOVER']/100);
                deductionSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DEDUCTION']/100);
                deductionArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['DEDUCTION']/100);
                cancel_moneySum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CANCEL_MONEY']/100);
                cancel_moneyArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['CANCEL_MONEY']/100);
                realincomeSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REAL_INCOME']/100);
                realincomeArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['REAL_INCOME']/100);
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
//改变图表显示样式
function changedChart(chartNum) {
    switch (chartNum){
        case '1':{
            orderChartArray = turnoverArray;
            chartName = "营业额";
            chartOrder();
            break;
        }
        case '2':{
            orderChartArray = deductionArray;
            chartName = "折让金额";
            chartOrder();
            break;
        }
        case '3':{
            orderChartArray = cancel_moneyArray;
            chartName = "退款额";
            chartOrder();
            break;
        }
        case '4':{
            orderChartArray = realincomeArray;
            chartName = "实收合计";
            chartOrder();
            break;
        }
        case '5':{
            orderChartArray = orderquantityArray;
            chartName = "交易数";
            chartOrder();
            break;
        }
        case '6':{
            orderChartArray = deduction_ordersArray;
            chartName = "参与优惠";
            chartOrder();
            break;
        }
        case '7':{
            orderChartArray = cancel_ordersArray;
            chartName = "退单数";
            chartOrder();
            break;
        }
        case '8':{
            orderChartArray = dissuccess_ordersArray;
            chartName = "处理中";
            chartOrder();
            break;
        }
        case '9':{
            orderChartArray = success_ordersArray;
            chartName = "已完成";
            chartOrder();
            break;
        }
    }
}
//清除已经有的数据
function clearOrderTable() {
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
    orderChartArray = new Array();
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
            data: orderChartArray
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
