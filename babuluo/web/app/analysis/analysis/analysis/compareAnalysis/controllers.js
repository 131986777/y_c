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
        $scope.FLAG=3;

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
    $scope.outExcel = function (state) {
        outPutMethod("compareTable"+state)
    }
    /**
     * 获取比对数据 如果不是获取一天的话 js二次处理 。。
     * @param startDay
     * @param endDay
     */
    function getCompareSource(startDay,endDay) {
        $scope.jsonObj = null;
        analysisFactory.getCompareChangeByRange(startDay,endDay).get({},function(response){
            console.log(response);
            if((response.data).length==0){
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = response.data;
            var jsonObj = JSON.parse(flag[0]['MANAGE_DATA_ANALYSIS.SOURCE']);
            var tempJSON = null;
            for(var i = 1;i<flag.length;i++){
                tempJSON = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
                for(var j=0;j<jsonObj[0]['VALUE'].length;j++){
                    for(var k=0;k<tempJSON[0]['VALUE'].length;k++){
                        if(tempJSON[0]['VALUE'][k]['COMPARE_VALUE']['SHOP_ID']==jsonObj[0]['VALUE'][j]['COMPARE_VALUE']['SHOP_ID']){
                            jsonObj[0]['VALUE'][j]['COMPARE_VALUE']['MONEY_COUNT'] = parseFloat(jsonObj[0]['VALUE'][j]['COMPARE_VALUE']['MONEY_COUNT'])+parseFloat(tempJSON[0]['VALUE'][k]['COMPARE_VALUE']['MONEY_COUNT'])
                            jsonObj[1]['VALUE'][j]['COMPARE_VALUE']['CARD_MONEY_COUNT'] = parseFloat(jsonObj[1]['VALUE'][j]['COMPARE_VALUE']['CARD_MONEY_COUNT'])+parseFloat(tempJSON[1]['VALUE'][k]['COMPARE_VALUE']['CARD_MONEY_COUNT'])
                            jsonObj[2]['VALUE'][j]['COMPARE_VALUE']['ADD_NUMBER'] = parseFloat(jsonObj[2]['VALUE'][j]['COMPARE_VALUE']['ADD_NUMBER'])+parseFloat(tempJSON[2]['VALUE'][k]['COMPARE_VALUE']['ADD_NUMBER']);
                            break;
                        }
                    }
                }
            }
            if(startDay==endDay){
                $scope.jsonObj = jsonObj;
                console.log(jsonObj);
            }else{
                var jsonArray = new Array();
                jsonArray[0] = {'STATUE':'MONEY','VALUE':getCompareMonthAndWeekSource(jsonObj,0,'MONEY_COUNT')};
                jsonArray[1] = {'STATUE':'CARD_MONEY','VALUE':getCompareMonthAndWeekSource(jsonObj,1,'CARD_MONEY_COUNT')};
                jsonArray[2] = {'STATUE':'CARD','VALUE':getCompareMonthAndWeekSource(jsonObj,2,'ADD_NUMBER')};
                $scope.jsonObj = jsonArray;
            }
        });
    }
});
//构造json并排序
function getCompareMonthAndWeekSource(jsonObj,number,other) {
    var dataArray = new Array();
    var array = new Array();
    //获取要排序的非重复数据
    for(var i=0;i<jsonObj[number]['VALUE'].length;i++){
        if(parseInt(jsonObj[number]['VALUE'][i]['COMPARE_VALUE'][other])!=0){
            for(var j=0;j<dataArray.length;j++){
                var flag = false
                if(parseInt(jsonObj[number]['VALUE'][i]['COMPARE_VALUE'][other])==dataArray[j]){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                dataArray[dataArray.length] =  parseInt(jsonObj[number]['VALUE'][i]['COMPARE_VALUE'][other]);
            }
        }
    }
    dataArray = quickSort(dataArray);
    //将有值的数据按照排序次序加入到临时数组中
    for(var j=dataArray.length-1;j>=0;j--){
        for(var i=0;i<jsonObj[number]['VALUE'].length;i++){
            if(parseInt(jsonObj[number]['VALUE'][i]['COMPARE_VALUE'][other]) == parseInt(dataArray[j])){
                jsonObj[number]['VALUE'][i]['COMPARE_VALUE']['SHOP_SORT'] = array.length+1;
                array.push(jsonObj[number]['VALUE'][i]);
            }
        }
    }
    //将没有参加排序的记录放入临时数组  主要是值为0
    for(var i=0;i<jsonObj[number]['VALUE'].length;i++){
        var flag = false;
        for(var j=dataArray.length-1;j>=0;j--){
            if(parseInt(jsonObj[number]['VALUE'][i]['COMPARE_VALUE'][other]) == dataArray[j]){
                flag = true;
                break;
            }
        }
        if(!flag){
            jsonObj[number]['VALUE'][i]['COMPARE_VALUE']['SHOP_SORT'] = array.length+1;
            array.push(jsonObj[number]['VALUE'][i]);
        }
    }
    /**
     * 计算DIFF赋值给相应的记录
     * 这样做的原因是防止数据重复
      */
    for(var i=0;i<array.length-1;i++){
        if(parseFloat(array[i]['COMPARE_VALUE'][other]) ==0){
            break;
        }
        var diff = parseFloat(array[i]['COMPARE_VALUE'][other])-parseFloat(array[i+1]['COMPARE_VALUE'][other]);
        array[i]['COMPARE_VALUE']['COMPARE_DIFF'] = diff;
    }
    return array;
}
//js 快速排序
function quickSort(arr){
    //如果数组<=1,则直接返回
    if(arr.length<=1){return arr;}
    var pivotIndex=Math.floor(arr.length/2);
    //找基准，并把基准从原数组删除
    var pivot=arr.splice(pivotIndex,1)[0];
    //定义左右数组
    var left=[];
    var right=[];

    //比基准小的放在left，比基准大的放在right
    for(var i=0;i<arr.length;i++){
        if(arr[i]<=pivot){
            left.push(arr[i]);
        }
        else{
            right.push(arr[i]);
        }
    }
    //递归
    return quickSort(left).concat([pivot],quickSort(right));
}
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
    var date = new Date(day);
    date.setMonth(date.getMonth()-1);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
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