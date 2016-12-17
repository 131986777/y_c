/**
 * Created by remix on 2016/12/12.
 */
angular.module('AndSell.Main').controller('analysis_analysis_compareAnalysis_Controller', function ($scope, $stateParams,$timeout, analysisFactory, modalFactory) {
    modalFactory.setTitle("作站室");
    $scope.initLoad=function () {
        getCompareSource(getYesterday(),getYesterday());
        dataStatus($scope);
        $scope.YESTERDAY = getYesterday();

    };
    $scope.getGroupByRange = function () {
        var day = $scope.groupRange['DAY'];
        getCompareSource(day,day);
    }
    function getCompareSource(startDay,endDay) {
        analysisFactory.getCompareChangeByRange(startDay,endDay).get({},function(response){
            console.log(response);
            if((response.data).length==0){
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = response.data;
            var jsonObj = null;
            for(var i = 0;i<flag.length;i++){
                jsonObj = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
            }
            $scope.jsonObj = jsonObj;
        });
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

}