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
    };
    //上周的数据
    $scope.getGroupByYesterWeek = function () {
        clearTable();
        theMonth = theDate.getMonth();
        var yesterdayWeekFirstDay=new Date(theYear,theMonth,theDay - theDate.getDay() - 6);
        var yesterdayWeekEndDay = new Date(theYear, theMonth, theDay + (6 - theDate.getDay() - 6));
        getSource(yesterdayWeekFirstDay.getFullYear()+"-"+(yesterdayWeekFirstDay.getMonth()+1)+"-"+yesterdayWeekFirstDay.getDate(),yesterdayWeekEndDay.getFullYear()+"-"+(yesterdayWeekEndDay.getMonth()+1)+"-"+yesterdayWeekEndDay.getDate())
        theMonth = theDate.getMonth()+1;
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
    }
    //今天的数据
    $scope.getGroupByNowDay = function () {
        clearTable();
        getSource(theYear+"-"+theMonth+"-"+theDay,theYear+"-"+theMonth+"-"+theDay)
    }
    //昨天的数据
    $scope.getGroupByYesterDay = function () {
        clearTable();
        getSource(getYesterday(),getYesterday());
    }
    //本月的数据
    $scope.getGroupByThisMonth = function () {
        clearTable();
        getSource(getMonthFirstDay(),theYear+"-"+theMonth+"-"+theDay);
    }
    //本周的数据
    $scope.getGroupByThisWeek = function () {
        clearTable();
       getSource(getWeekFirstDay(),theYear+"-"+theMonth+"-"+theDay);
    }
    //通过日期查询
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        clearTable();
        getSource(startDay,endDay);
    }
    //清除已经有的数据
    function clearTable () {
        dateArray = new Array();
        addCardArray = new Array;
        rechargeOnlineArray = new Array();
        consumeArray = new Array();
        revertArray = new Array();
        consumeRedArray = new Array();
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
                addCard += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['addCard']);
                rechargeOnlineSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['rechargeOnline']);
                consumeSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['consume']);
                revertSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['revert']);
                consumeRedSum += parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['consumeRed']);
                dateArray[i] = flag[i]['MANAGE_DATA_ANALYSIS.DAY'];
                addCardArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['addCard']);
                rechargeOnlineArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['rechargeOnline']);
                consumeArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['consume']);
                revertArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['revert']);
                consumeRedArray[i] = parseFloat(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']['consumeRed']);
            }
            $scope.cardMoneyChange = flag;
            $scope.addCard = addCard;
            $scope.rechargeOnlineSum = rechargeOnlineSum;
            $scope.consumeSum = consumeSum;
            $scope.revertSum = revertSum;
            $scope.consumeRedSum = consumeRedSum;
        },null);

        $timeout(function () {
            chart();
        },1000);

    }
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
function chart(){
    console.log(dateArray)
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: '会员分析折线图'
        },
        tooltip: {
            trigger:'axis'
        },
        legend: {
            data:['新增会员','会员充值','会员消费','会员返点','会员红冲']
        },
        grid:{
            show:true,
            left: '3%',
            right: '4%',
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
            name: '新增会员',
            type: 'line',
            data: addCardArray
        },{
            name: '会员充值',
            type: 'line',
            data: rechargeOnlineArray
        },{
            name: '会员消费',
            type: 'line',
            data: consumeArray
        },{
            name: '会员返点',
            type: 'line',
            data: revertArray
        },{
            name: '会员红冲',
            type: 'line',
            data: consumeRedArray
        }]
    };
    myChart.setOption(option);
}