/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_guestAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("来客分析");
    modalFactory.setBottom(false);
    $scope.initLoad = function () {
        getDailySource(getYesterday(), getYesterday());
        dataStatus($scope);
    }
    $scope.YESTERDAY = getYesterday();
    $scope.getGroupByRange = function () {
        var day = $scope.groupRange['DAY'];
        clearTable();
        getDailySource(day, day);
    }
    function getDailySource(startDay, endDay) {
        analysisFactory.getIntervalGuestByRange(startDay, endDay).get({}, function (response) {
            console.log(response);
            if ((response.data).length == 0) {
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = JSON.parse((response.data)[0]['MANAGE_DATA_ANALYSIS.SOURCE'])

            var sum_guest_7_9 = 0;
            var sum_guest_9_11 = 0;
            var sum_guest_11_13 = 0;
            var sum_guest_13_15 = 0;
            var sum_guest_15_17 = 0;
            var sum_guest_17_20 = 0;
            var sum_guest_other = 0;

            for (var i = 0; i < flag.length; i++) {
                sum_guest_7_9 += parseInt(flag[i]['GUEST_7_9']);
                sum_guest_9_11 += parseInt(flag[i]['GUEST_9_11']);
                sum_guest_11_13 += parseInt(flag[i]['GUEST_11_13']);
                sum_guest_13_15 += parseInt(flag[i]['GUEST_13_15']);
                sum_guest_15_17 += parseInt(flag[i]['GUEST_15_17']);
                sum_guest_17_20 += parseInt(flag[i]['GUEST_17_20']);
                sum_guest_other += parseInt(flag[i]['GUEST_OTHER']);
            }

            $scope.SUM_GUEST_7_9 = sum_guest_7_9;
            $scope.SUM_GUEST_9_11 = sum_guest_9_11;
            $scope.SUM_GUEST_11_13 = sum_guest_11_13;
            $scope.SUM_GUEST_13_15 = sum_guest_13_15;
            $scope.SUM_GUEST_15_17 = sum_guest_15_17;
            $scope.SUM_GUEST_17_20 = sum_guest_17_20;
            $scope.SUM_GUEST_OTHER = sum_guest_other;
            $scope.GUEST_SOURCE = flag;

        }, null);
    }

    function clearTable() {
        $scope.SUM_GUEST_7_9 = 0;
        $scope.SUM_GUEST_9_11 = 0;
        $scope.SUM_GUEST_11_13 = 0;
        $scope.SUM_GUEST_13_15 = 0;
        $scope.SUM_GUEST_15_17 = 0;
        $scope.SUM_GUEST_17_20 = 0;
        $scope.SUM_GUEST_OTHER = 0;
        $scope.GUEST_SOURCE = null;
    }
});

//获取昨天
function getYesterday() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate()
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
    $(document).ready(function () {
        $('#birthday').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

    $(document).ready(function () {
        $('#birthdayDate').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });
}
