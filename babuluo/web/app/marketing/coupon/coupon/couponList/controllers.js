angular.module('AndSell.Main').controller('marketing_coupon_coupon_couponList_Controller', function ($scope, $stateParams, couponFactory, modalFactory) {

    modalFactory.setTitle('优惠券管理');

    $scope.bindData = function (response) {
        $scope.couponList = {};
        $scope.couponList = response.data;
        $scope.ruleList = response.extraData.ruleList;
        $scope.ruleMap = response.extraData.ruleMap;
    };

    $scope.parseArray = function (data) {
        var array = data.split(',');

        return array;
    }
    var targetObjArray = new Array();
    //方法名可以随便写 参数必须为data
    $scope.classSwitch = function (data) {
        targetObjArray = new Array();
        data.forEach(function (ele) {
            targetObjArray.push(ele['SHOP_PRODUCT_CLASS.CLASS_ID']);
        });
    }

    $scope.tagSwitch = function (data) {
        targetObjArray = new Array();
        data.forEach(function (ele) {
            targetObjArray.push(ele['SHOP_TAG.TAG_ID']);
        });
    }

    $scope.prdSwitch = function (data) {
        targetObjArray = new Array();
        data.forEach(function (ele) {
            targetObjArray.push(ele['SHOP_PRODUCT_SKU.SKU_ID']);
        });
    }

    $scope.detailClick = function (item) {
        $scope.detailArray = item.split("<br>");
    }

    $scope.addCoupon = function () {

        if ($scope.add['COUPON.NAME'] == "") {
            modalFactory.showShortAlert("请填写优惠券名称");
            return;
        }

        if ($scope.add['COUPON.RULE_ID'] == "") {
            modalFactory.showShortAlert("请选择优惠券规则");
            return;
        }

        $scope.add['COUPON.BEGIN_DATETIME'] = $scope.from;
        $scope.add['COUPON.END_DATETIME'] = $scope.to;
        $scope.add['COUPON.USE_TIME_CYCLE'] = $scope.Monday
            + ','
            + $scope.Tuesday
            + ','
            + $scope.Wednesday
            + ','
            + $scope.Thursday
            + ','
            + $scope.Friday
            + ','
            + $scope.Saturday
            + ','
            + $scope.Sunday;

        $scope.add['COUPON.TARGET_OBJ_ID'] = targetObjArray;   //数据库中会以逗号隔开

        couponFactory.addCouponInfo($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = {};
            $scope.Monday = 0;
            $scope.Tuesday = 0;
            $scope.Wednesday = 0;
            $scope.Thursday = 0;
            $scope.Friday = 0;
            $scope.Saturday = 0;
            $scope.Sunday = 0;
            $scope.from = "";
            $scope.to = "";
            $("#addCoupon").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.mod = {};
    $scope.modCouponClick = function (item) {

        $scope.mod = clone(item);
        var time = $scope.parseArray($scope.mod['COUPON.USE_TIME_CYCLE']);
        $scope.mMonday = time[0];
        $scope.mTuesday = time[1];
        $scope.mWednesday = time[2];
        $scope.mThursday = time[3];
        $scope.mFriday = time[4];
        $scope.mSaturday = time[5];
        $scope.mSunday = time[6];

        $scope.mBeginTime = (item['COUPON.BEGIN_DATETIME']).split('.')[0];  //2016-11-10 15:30:00.0
        $scope.mEndTime = item['COUPON.END_DATETIME'].split('.')[0];

    };

    $scope.modCoupon = function () {
        $scope.mod['COUPON.BEGIN_DATETIME'] = $scope.mBeginTime;
        $scope.mod['COUPON.END_DATETIME'] = $scope.mEndTime;
        $scope.mod['COUPON.USE_TIME_CYCLE'] = $scope.mMonday
            + ','
            + $scope.mTuesday
            + ','
            + $scope.mWednesday
            + ','
            + $scope.mThursday
            + ','
            + $scope.mFriday
            + ','
            + $scope.mSaturday
            + ','
            + $scope.mSunday;
        $scope.mod['COUPON.TARGET_OBJ_ID'] = targetObjArray;   //数据库中会以逗号隔开
        couponFactory.modifyCoupon($scope.mod, function (response) {
            $("#couponMod").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $("#modCoupon").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.stopCoupon = function (item) {

        if (item['COUPON.STATE'] == 1) {
            modalFactory.showAlert("确认停用吗?", function () {
                item['COUPON.STATE'] = -1;
                couponFactory.stopCouponById(item, function (res) {
                    modalFactory.showShortAlert("停用成功");
                    $scope.$broadcast('pageBar.reload');
                });
            });
        } else {
            modalFactory.showAlert("确认启用吗?", function () {
                item['COUPON.STATE'] = 1;
                couponFactory.stopCouponById(item, function (res) {
                    modalFactory.showShortAlert("启用成功");
                    $scope.$broadcast('pageBar.reload');
                });
            });
        }

    };

    //delCoupon
    $scope.delCoupon = function (item) {

        modalFactory.showAlert("确认删除该优惠券吗?", function () {
            couponFactory.deleteCoupon(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });

    }

    $scope.mouseIsEnter = new Array();
    $scope.mouseEnter = function (key) {

        $scope.mouseIsEnter[key] = true;

    }
    $scope.mouseleave = function (key) {

        $scope.mouseIsEnter[key] = false;
    }

    $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy-mm-dd hh:ii',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $('#end_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy-mm-dd hh:ii',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $('#mstart_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy-mm-d hh:ii',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $('#mend_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy-mm-dd hh:ii',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

});
