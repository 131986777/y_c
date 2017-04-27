angular.module('AndSell.Main').controller('product_product_appointment_Controller', function ($scope, $stateParams, productFactory, modalFactory) {

    modalFactory.setTitle('预约商品');

    $scope.initLoad = function () {
        productFactory.getAppointmentProduct({}, function (repsonse) {
            $scope.appointmentList = repsonse.data;
            var prdList = new Array;
            $scope.appointmentList.forEach(function (ele) {
                prdList.push(ele['APPOINTMENT_PRODUCT.SKU_ID']);
            });
            $scope.getPrd(prdList.toString());
        });
    };
    $scope.initLoad();

    $scope.getPrd = function (skuIds) {
        $scope.prdMap = {};
        productFactory.getBySkuIdWithAllInfo({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            response.data.forEach(function (ele) {
                $scope.prdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
            });
        });
    }

    $scope.addAppointment = function () {
        if ($scope.add['APPOINTMENT_PRODUCT.NAME'].trim()
            == ''
            || $scope.add['APPOINTMENT_PRODUCT.NAME']
            == undefined) {
            modalFactory.showShortAlert("请填写名称");
            return;
        }

        if ($scope.add['APPOINTMENT_PRODUCT.SKU_ID'] == undefined) {
            modalFactory.showShortAlert("请选择商品");
            return;
        }

        var on = true;
        $scope.appointmentList.forEach(function (ele) {
            if (ele['APPOINTMENT_PRODUCT.SKU_ID'].trim()
                == $scope.add['APPOINTMENT_PRODUCT.SKU_ID'].trim()) {
                modalFactory.showShortAlert("该商品已经存在预约配置！");
                on = false;
            }
        });
        if (on) {
            productFactory.addAppointmentProduct($scope.add, function (response) {
                $("#add").modal('hide');
                modalFactory.showShortAlert('新增成功');
                $scope.initLoad();
                $scope.add = {};
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    };

    $scope.showUrl= function (skuId) {
        modalFactory.showAlert("#/pages/product/detail/"+skuId);
    }

    $scope.prdSwitch = function (data) {
        $scope.currPrd = data;
        console.log($scope.currPrd);
        $scope.add['APPOINTMENT_PRODUCT.SKU_ID'] = $scope.currPrd['SHOP_PRODUCT_SKU.SKU_ID'];
        $scope.add['APPOINTMENT_PRODUCT.PRICE'] = $scope.currPrd['SHOP_PRODUCT_SKU.REAL_PRICES'];
        $scope.add['APPOINTMENT_PRODUCT.NAME'] = $scope.currPrd['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
    };

    $scope.modifyAppointmentClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyAppointment = function () {
        productFactory.modAppointmentProduct($scope.modify, function (response) {
            $("#modify").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyAppointmentState = function (item, state) {
        modalFactory.showAlert("确定" + (state == -1 ? "停用" : "启用") + "该事件?", function () {
            item['APPOINTMENT_PRODUCT.STATE'] = state;
            productFactory.modAppointmentProduct(item, function (response) {
                modalFactory.showShortAlert((state == -1 ? "停用" : "启用") + "成功");
                $scope.initLoad();
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });
    };

    $scope.delAppointment = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            productFactory.delAppointmentProduct(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });

    }

    $('#startDay1').datetimepicker({
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

});