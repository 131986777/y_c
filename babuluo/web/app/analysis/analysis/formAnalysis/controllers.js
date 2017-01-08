/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_formAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("线上商品销售报表");
    modalFactory.setBottom(false);
    $scope.START = getYesterday();
    $scope.END = getYesterday();
    $scope.initLoad = function () {
        dataStatus($scope);
        getFormSource(getYesterday(),getYesterday());
    }
    $scope.YESTERDAY = getYesterday();
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        $scope.FORMSOURCE = "";
        getFormSource(startDay,endDay);
    }

    function getFormSource(startDay,endDay) {
        analysisFactory.getFormChangeByRange(startDay,endDay).get({},function (response) {
            console.log(response);
            if((response.data).length==0){
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = response.data;
            var temp;
            var array = new Array();
            for(var i=0;i<flag.length;i++){
                temp = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
                for(var j=0;j<temp.length;j++){
                    array.push(temp[j])
                }
            }
            $scope.FORMSOURCE = array;
        },null);
    }
});


// //获取最近一个月的起始时间
// function getYesterMonthBeginDay(day) {
//     var date = new Date(day);
//     date.setMonth(date.getMonth()-1);
//     return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
// }
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
