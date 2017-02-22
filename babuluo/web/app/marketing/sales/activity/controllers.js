angular.module('AndSell.Main').controller('marketing_sales_activity_Controller', function ($scope, $stateParams, activityFactory, modalFactory) {

    modalFactory.setTitle('充值活动');

    $scope.initLoad = function () {
        activityFactory.getTopUps({}, function (repsonce) {
            $scope.topUpList = repsonce.data;
        });
    };
    $scope.initLoad();

    $scope.gainsTypeOptions = ['满减', '满送', '慢加'];

    $scope.addActivity = function () {
        if ($scope.add['ACTIVITY.NAME'] == '') {
            modalFactory.showShortAlert("请填写活动名称");
            return;
        }
        if ($scope.add['ACTIVITY.ACTIVIVTY_TYPE'] == '') {
            modalFactory.showShortAlert("请填写活动类型");
            return;
        }
        if ($scope.add['ACTIVITY.LIMIT_VALUE'] == '') {
            modalFactory.showShortAlert("请填写活动限制值");
            return;
        }
        if ($scope.add['ACTIVITY.GAINS_TYPE'] == '') {
            modalFactory.showShortAlert("请填写活动收益类型");
            return;
        }
        if ($scope.add['ACTIVITY.GAINS_VALUE'] == '') {
            modalFactory.showShortAlert("请填写活动收益值");
            return;
        }
        if ($scope.add['ACTIVITY.REPEATED_GAINS'] == '') {
            modalFactory.showShortAlert("请填写充值活动满额重复收益");
            return;
        }
        var on = true;
        $scope.add['ACTIVITY.SHOP_ID_LIST'] = $scope.choicedShopID;
        $scope.topUpList.forEach(function (ele) {
            if (ele['ACTIVITY.NAME'].trim() == $scope.add['ACTIVITY.NAME'].trim()) {
                modalFactory.showShortAlert("已存在相同事件！");
                on = false;
            }
        });
        if (on) {
            activityFactory.addTopUp($scope.add, function (response) {
                alert($scope.add['ACTICITY.NAME']);
                $("#add").modal('hide');
                modalFactory.showShortAlert('新增成功');
                $scope.initLoad();
                $scope.add = {};
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    };

    $scope.modifyActivityClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyActivity = function () {
        $scope.modify['ACTIVITY.SHOP_ID_LIST'] = $scope.choicedShopID;
        $scope.modify['ACTIVITY.SHOP_ID_LIST']= setNullValue($scope.modify['ACTIVITY.SHOP_ID_LIST']);
        activityFactory.modTopUp($scope.modify, function (response) {
            $("#modify").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyActivityClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyActivityState = function (item, state) {
        modalFactory.showAlert("确定" + (state == -1 ? "停用" : "启用") + "该事件?", function () {
            item['ACTIVITY.ACTIVITY_STATE'] = state;
            activityFactory.modTopUp(item, function (response) {
                modalFactory.showShortAlert((state == -1 ? "停用" : "启用") + "成功");
                $scope.initLoad();
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });
    };

    $scope.delActivity = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            activityFactory.delTopUp(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });

    }

    $scope.choicedShopID = '';

    $scope.shopSwitch = function (data) {
        $scope.choicedShopID = '';
        data.forEach(function (ele) {
            $scope.choicedShopID = $scope.choicedShopID + "," + ele['SHOP.SHOP_ID'];
        });
        if ($scope.choicedShopID.length > 0) {
            $scope.choicedShopID = $scope.choicedShopID.substring(1);
        }
        modalFactory.showShortAlert("参与门店配置成功");
    }

    $('.start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $('.end_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
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
        $('#birthdayDate').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

});