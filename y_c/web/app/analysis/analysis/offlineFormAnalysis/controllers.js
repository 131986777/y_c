/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_offlineFormAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("线下销售报表");
    modalFactory.setBottom(false);
    $scope.START = getYesterday();
    $scope.END = getYesterday();
    $scope.initLoad = function () {
        getOfflineFormSource(getYesterday(), getYesterday());
        dataStatus($scope);
    }
    $scope.getGroupByRange = function () {
        clearTable();
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        getOfflineFormSource(startDay, endDay);

    }
    function getOfflineFormSource(startDay, endDay) {
        analysisFactory.getOfflineFormChangeByRange(startDay, endDay).get({}, function (response) {
            console.log(response);
            if ((response.data).length == 0) {
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = JSON.parse((response.data)[0]['MANAGE_DATA_ANALYSIS.SOURCE']);
            var add_card = 0;
            var new_card_vip = 0;
            var new_card_pt = 0;
            var money_count = 0;
            var order_count = 0;
            var guest_count = 0;
            var total_card_money = 0;
            var pt_card_money = 0;
            var vip_card_money = 0;
            var total_unit = 0;
            var money_discount = 0;
            // var hand_discount = 0;
            var auto_discount = 0;
            for (var j = 0; j < (response.data).length; j++) {
                var json = JSON.parse((response.data)[j]['MANAGE_DATA_ANALYSIS.SOURCE']);
                for (var i = 0; i < json.length; i++) {
                    add_card += parseInt(json[i]['SHOP_VALUE']['ADD_CARD'])
                    total_card_money += parseInt(json[i]['SHOP_VALUE']['TOTAL_CARD_MONEY']) / 100;
                    pt_card_money += parseInt(json[i]['SHOP_VALUE']['PT_CARD_MONEY']) / 100;
                    vip_card_money += parseInt(json[i]['SHOP_VALUE']['VIP_CARD_MONEY']) / 100;
                    total_unit += parseFloat(json[i]['SHOP_VALUE']['TOTAL_UNIT']);
                    order_count += parseInt(json[i]['SHOP_VALUE']['ORDER_COUNT']);
                    if (parseInt(json[i]['SHOP_VALUE']['GUEST_COUNT']) >= 0) {
                        guest_count += parseInt(json[i]['SHOP_VALUE']['GUEST_COUNT']);
                    }
                    if (parseInt(json[i]['SHOP_VALUE']['NEW_CARD_VIP']) >= 0) {
                        new_card_vip += parseInt(json[i]['SHOP_VALUE']['NEW_CARD_VIP']);
                    }
                    if (parseInt(json[i]['SHOP_VALUE']['NEW_CARD_PT']) >= 0) {
                        new_card_pt += parseInt(json[i]['SHOP_VALUE']['NEW_CARD_PT']);
                    }
                    money_count += parseInt(json[i]['SHOP_VALUE']['MONEY_COUNT']) / 100;
                    money_discount += parseInt(json[i]['SHOP_VALUE']['MONEY_DISCOUNT']) / 100;
                    // hand_discount += parseInt(json[i]['SHOP_VALUE']['HAND_DISCOUNT']) / 100;
                    auto_discount += parseInt(json[i]['SHOP_VALUE']['AUTO_DISCOUNT']) / 100;
                }
                if (j != 0) {
                    for (var i = 0; i < flag.length; i++) {
                        flag[i]['START_DAY'] = json[i]['START_DAY'];
                        flag[i]['SHOP_VALUE']['ADD_CARD'] = parseInt(flag[i]['SHOP_VALUE']['ADD_CARD']) + parseInt(json[i]['SHOP_VALUE']['ADD_CARD']);
                        flag[i]['SHOP_VALUE']['MONEY_COUNT'] = parseInt(flag[i]['SHOP_VALUE']['MONEY_COUNT']) + parseInt(json[i]['SHOP_VALUE']['MONEY_COUNT']);
                        flag[i]['SHOP_VALUE']['TOTAL_CARD_MONEY'] = parseInt(flag[i]['SHOP_VALUE']['TOTAL_CARD_MONEY']) + parseInt(json[i]['SHOP_VALUE']['TOTAL_CARD_MONEY']);
                        flag[i]['SHOP_VALUE']['PT_CARD_MONEY'] = parseInt(flag[i]['SHOP_VALUE']['PT_CARD_MONEY']) + parseInt(json[i]['SHOP_VALUE']['PT_CARD_MONEY']);
                        flag[i]['SHOP_VALUE']['VIP_CARD_MONEY'] = parseInt(flag[i]['SHOP_VALUE']['VIP_CARD_MONEY']) + parseInt(json[i]['SHOP_VALUE']['VIP_CARD_MONEY']);
                        flag[i]['SHOP_VALUE']['ORDER_COUNT'] = parseInt(flag[i]['SHOP_VALUE']['ORDER_COUNT']) + parseInt(json[i]['SHOP_VALUE']['ORDER_COUNT']);
                        if (parseInt(flag[i]['SHOP_VALUE']['GUEST_COUNT']) >= 0 && parseInt(json[i]['SHOP_VALUE']['GUEST_COUNT']) >= 0) {
                            flag[i]['SHOP_VALUE']['GUEST_COUNT'] = parseInt(flag[i]['SHOP_VALUE']['GUEST_COUNT']) + parseInt(json[i]['SHOP_VALUE']['GUEST_COUNT']);
                        }
                        if (parseInt(flag[i]['SHOP_VALUE']['NEW_CARD_VIP']) >= 0 && parseInt(json[i]['SHOP_VALUE']['NEW_CARD_VIP']) >= 0) {
                            flag[i]['SHOP_VALUE']['NEW_CARD_VIP'] = parseInt(flag[i]['SHOP_VALUE']['NEW_CARD_VIP']) + parseInt(json[i]['SHOP_VALUE']['NEW_CARD_VIP']);
                        }
                        if (parseInt(flag[i]['SHOP_VALUE']['NEW_CARD_PT']) >= 0 && parseInt(json[i]['SHOP_VALUE']['NEW_CARD_PT']) >= 0) {
                            flag[i]['SHOP_VALUE']['NEW_CARD_PT'] = parseInt(flag[i]['SHOP_VALUE']['NEW_CARD_PT']) + parseInt(json[i]['SHOP_VALUE']['NEW_CARD_PT']);
                        }
                        flag[i]['SHOP_VALUE']['TOTAL_UNIT'] = parseFloat(flag[i]['SHOP_VALUE']['TOTAL_UNIT']) + parseFloat(json[i]['SHOP_VALUE']['TOTAL_UNIT']);
                        flag[i]['SHOP_VALUE']['MONEY_DISCOUNT'] = parseInt(flag[i]['SHOP_VALUE']['MONEY_DISCOUNT']) + parseInt(json[i]['SHOP_VALUE']['MONEY_DISCOUNT']);
                        // flag[i]['SHOP_VALUE']['HAND_DISCOUNT'] = parseInt(flag[i]['SHOP_VALUE']['HAND_DISCOUNT']) + parseInt(json[i]['SHOP_VALUE']['HAND_DISCOUNT']);
                        flag[i]['SHOP_VALUE']['AUTO_DISCOUNT'] = parseInt(flag[i]['SHOP_VALUE']['AUTO_DISCOUNT']) + parseInt(json[i]['SHOP_VALUE']['AUTO_DISCOUNT']);


                    }
                }
            }
            for (var i = 0; i < flag.length; i++) {
                flag[i]['SHOP_VALUE']['AVG_MONEY_COUNT'] = parseFloat(flag[i]['SHOP_VALUE']['MONEY_COUNT']) / (response.data).length;
                if (parseFloat(flag[i]['SHOP_VALUE']['TOTAL_UNIT']) != 0) {
                    flag[i]['SHOP_VALUE']['AVG_UNIT_MONEY'] = parseFloat(flag[i]['SHOP_VALUE']['MONEY_COUNT']) / parseFloat(flag[i]['SHOP_VALUE']['TOTAL_UNIT']);
                } else {
                    flag[i]['SHOP_VALUE']['AVG_UNIT_MONEY'] = "";
                }
                flag[i]['SHOP_VALUE']['AVG_ORDER_MONEY'] = parseFloat(flag[i]['SHOP_VALUE']['MONEY_COUNT']) / flag[i]['SHOP_VALUE']['ORDER_COUNT'];
            }
            $scope.ADD_CARD = add_card;
            $scope.NEW_CARD_VIP = new_card_vip;
            $scope.NEW_CARD_PT = new_card_pt;
            $scope.MONEY_DISCOUNT = money_discount
            $scope.TOTAL_CARD_MONEY = total_card_money;
            $scope.PT_CARD_MONEY = pt_card_money;
            $scope.VIP_CARD_MONEY = vip_card_money;
            $scope.TOTAL_UNIT = total_unit;
            // $scope.HAND_DISCOUNT = hand_discount;
            $scope.ORDER_COUNT = order_count;
            $scope.GUEST_COUNT = guest_count;
            $scope.MONEY_COUNT = money_count;
            $scope.AUTO_DISCOUNT = auto_discount;
            $scope.AVG_UNIT_MONEY = (total_unit == 0 ? "" : money_count / total_unit);
            $scope.AVG_ORDER_MONEY = money_count / order_count;
            $scope.AVG_MONEY_COUNT = money_count / (response.data).length;
            $scope.FORMSOURCE = flag;
        }, null);
    }

    function clearTable() {
        $scope.ADD_CARD = 0;
        $scope.NEW_CARD_VIP = 0;
        $scope.NEW_CARD_PT = 0;
        $scope.MONEY_DISCOUNT = 0;
        $scope.AVG_MONEY_COUNT = 0;
        $scope.TOTAL_CARD_MONEY = 0;
        $scope.PT_CARD_MONEY = 0;
        $scope.VIP_CARD_MONEY = 0;
        $scope.AVG_ORDER_MONEY = 0;
        $scope.AVG_UNIT_MONEY = 0;
        $scope.TOTAL_UNIT = 0;
        $scope.MONEY_DISCOUNT = 0;
        // $scope.HAND_DISCOUNT = 0;
        $scope.ORDER_COUNT = 0;
        $scope.GUEST_COUNT = 0;
        $scope.MONEY_COUNT = 0;
        $scope.AUTO_DISCOUNT = 0;
        $scope.FORMSOURCE = null;
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
