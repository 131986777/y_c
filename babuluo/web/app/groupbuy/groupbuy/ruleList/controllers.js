angular.module('AndSell.Main').controller('groupbuy_groupbuy_ruleList_Controller', function ($scope, $stateParams, groupBuyGroupFactory, productFactory, modalFactory, groupBuyPlanFactory, $q) {

    modalFactory.setTitle('规则列表');

    //要添加的规则对象
    $scope.groupBuyPlan = {};
    //要修改的规则对象
    $scope.groupBuyPlanToModify = {};
    //要详细显示的规则对象
    $scope.groupBuyPlanToDescribes = {};
    var deferred = $q.defer();
    var getPrdPromise = deferred.promise;
    var addSign = false;

    $scope.reloadPage = function () {
        //要添加的规则对象
        $scope.groupBuyPlanList = '';
        $scope.queryAllGroupBuyPlan();
    };
    /**
     * 绑定angularJs指令返回的sku
     * @param data
     */
    $scope.bindSku = function (data) {
        $scope.sku = {};
        $scope.sku['skuId'] = data['SHOP_PRODUCT_SKU.SKU_ID'];
        $scope.sku['prdName'] = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
    };

    /**
     * 根据skuIds获取prd对象
     * @param skuIds
     */
    $scope.prdMap = {};
    $scope.getPrd = function (skuIds) {
        productFactory.getBySkuIdWithAllInfo({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            response.data.forEach(function (ele) {
                $scope.prdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
                if (addSign) {
                    deferred.resolve("success");
                }
            });
        });
    }

    /**
     * 添加团购
     */
    $scope.addGroupBuyPlan = function () {
        var form = $scope.groupBuyPlan;
        form['GROUP_BUY_PLAN.BEGIN_DATETIME'] = $scope.groupBuyPlan['GROUP_BUY_PLAN.BEGIN_DATETIME'] + ":00";
        form['GROUP_BUY_PLAN.END_DATETIME'] = $scope.groupBuyPlan['GROUP_BUY_PLAN.END_DATETIME'] + ":00";
        //表单验证
        if (form['GROUP_BUY_PLAN.GROUP_BUY_NAME'] == undefined || form['GROUP_BUY_PLAN.GROUP_BUY_INFO'] == undefined || form['GROUP_BUY_PLAN.TYPE'] == undefined || form['GROUP_BUY_PLAN.BEGIN_DATETIME'] == undefined || form['GROUP_BUY_PLAN.END_DATETIME'] == undefined || form['GROUP_BUY_PLAN.SUM_COUNT'] == undefined || form['GROUP_BUY_PLAN.GROUP_PRICE'] == undefined || $scope.sku == undefined) {
            modalFactory.showShortAlert("请填写完整表单信息");
            return;
        }
        //初始化数据
        addSign = true;
        $scope.getPrd($scope.sku['skuId']);
        getPrdPromise.then(function () {
            form['GROUP_BUY_PLAN.PRD_ID'] = $scope.prdMap[$scope.sku['skuId']]['SHOP_PRODUCT.PRD_ID'];
            form['GROUP_BUY_PLAN.BAR_CODE'] = $scope.prdMap[$scope.sku['skuId']]['SHOP_PRODUCT_SKU.BAR_CODE'];
            form['GROUP_BUY_PLAN.SKU_ID'] = $scope.sku['skuId'];
            form['GROUP_BUY_PLAN.STATE'] = 'NOT_SALE';
            $("#add").modal('hide');
            //请求接口
            groupBuyPlanFactory.addGroupBuyPlan(form, function (response) {
                modalFactory.showShortAlert("添加成功");
                $scope.reloadPage();
                //表单置空
                $scope.groupBuyPlan = {};
                addSign = false;
                deferred = $q.defer();
                getPrdPromise = deferred.promise;
                modalFactory.reload();
            }, function (response) {
                modalFactory.showShortAlert("添加失败");
                //表单置空
                $scope.groupBuyPlan = {};
                addSign = false;
                getPrdPromise = deferred.promise;
                modalFactory.reload();
            })
        })
    };


    /**
     * 请求所有的团购数据
     */
    $scope.queryAllGroupBuyPlan = function () {
        groupBuyPlanFactory.queryAllGroupBuyPlan({}, function (response) {
            $scope.groupBuyPlanList = response['data'];
            //取得所有skuid并请求接口
            var skuIds = '';
            $scope.groupBuyPlanList.forEach(function (ele) {
                if (skuIds != '') {
                    skuIds += ',';
                }
                skuIds += ele['GROUP_BUY_PLAN.SKU_ID'];
            })
            $scope.getPrd(skuIds);
        }, function (response) {
            modalFactory.showShortAlert("请求数据失败");
        })
    }

    /**
     * 初始化要修改的团购
     * @param groupBuyPlan
     */
    $scope.initModify = function (groupBuyPlan) {
        $scope.groupBuyPlanToModify = groupBuyPlan;
        $scope.sku = {};
        $scope.sku['skuId'] = groupBuyPlan['GROUP_BUY_PLAN.SKU_ID'];
        $scope.sku['prdName'] = $scope.prdMap[groupBuyPlan['GROUP_BUY_PLAN.SKU_ID']]['SHOP_PRODUCT.PRD_NAME'];
    }

    /**
     * 修改
     */
    $scope.modifyGroupBuyPlan = function () {
        var form = $scope.groupBuyPlanToModify;
        if ($scope.groupBuyPlanToModify['GROUP_BUY_PLAN.BEGIN_DATETIME'].length == 16) {
            form['GROUP_BUY_PLAN.BEGIN_DATETIME'] = $scope.groupBuyPlanToModify['GROUP_BUY_PLAN.BEGIN_DATETIME'] + ":00";
        } else {
            form['GROUP_BUY_PLAN.BEGIN_DATETIME'] = $scope.groupBuyPlanToModify['GROUP_BUY_PLAN.BEGIN_DATETIME'].split('.')[0];
        }
        if ($scope.groupBuyPlanToModify['GROUP_BUY_PLAN.END_DATETIME'].length == 16) {
            form['GROUP_BUY_PLAN.END_DATETIME'] = $scope.groupBuyPlanToModify['GROUP_BUY_PLAN.END_DATETIME'] + ":00";
        } else {
            form['GROUP_BUY_PLAN.END_DATETIME'] = $scope.groupBuyPlanToModify['GROUP_BUY_PLAN.END_DATETIME'].split('.')[0];
        }
        //表单验证
        if (form['GROUP_BUY_PLAN.GROUP_BUY_NAME'] == undefined || form['GROUP_BUY_PLAN.GROUP_BUY_INFO'] == undefined || form['GROUP_BUY_PLAN.TYPE'] == undefined || form['GROUP_BUY_PLAN.BEGIN_DATETIME'] == undefined || form['GROUP_BUY_PLAN.END_DATETIME'] == undefined || form['GROUP_BUY_PLAN.SUM_COUNT'] == undefined || form['GROUP_BUY_PLAN.GROUP_PRICE'] == undefined || $scope.sku == undefined) {
            modalFactory.showShortAlert("请填写完整表单信息");
            return
        }
        //初始化数据
        addSign = true;
        $scope.getPrd($scope.sku['skuId']);
        getPrdPromise.then(function () {
            form['GROUP_BUY_PLAN.SKU_ID'] = $scope.sku['skuId'];
            form['GROUP_BUY_PLAN.PRD_ID'] = $scope.prdMap[$scope.sku['skuId']]['SHOP_PRODUCT.PRD_ID'];
            form['GROUP_BUY_PLAN.BAR_CODE'] = $scope.prdMap[$scope.sku['skuId']]['SHOP_PRODUCT_SKU.BAR_CODE'];
            //请求接口
            $("#modify").modal('hide');
            $scope.reloadPage();
            groupBuyPlanFactory.modifyById(form, function (response) {
                modalFactory.showShortAlert("修改成功");
                $scope.reloadPage();
                //表单置空
                $scope.groupBuyPlanToModify = {};
                addSign = false;
                deferred = $q.defer();
                getPrdPromise = deferred.promise;
                modalFactory.reload();
            }, function (response) {
                modalFactory.showShortAlert("修改失败");
                //表单置空
                $scope.groupBuyPlanToModify = {};
                addSign = false;
                deferred = $q.defer();
                getPrdPromise = deferred.promise;
                modalFactory.reload();
            })
        });

    };

    /**
     * 修改状态
     * @param groupBuyPlan
     * @param type
     */
    $scope.changeState = function (groupBuyPlan, type) {
        var param = {};
        param['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'] = groupBuyPlan['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'];
        param['GROUP_BUY_PLAN.STATE'] = type;
        groupBuyPlanFactory.modifyById(param, function (response) {
            modalFactory.showShortAlert("改变状态成功");
            $scope.reloadPage();
        }, function (response) {
            modalFactory.showShortAlert("改变状态失败");
        })
    }


    /**
     * 逻辑删除
     * @param groupBuyPlan
     */
    $scope.deleteGroupBuyPlan = function (groupBuyPlan) {
        var param = {};
        param['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'] = groupBuyPlan['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'];
        param['GROUP_BUY_PLAN.IS_DEL'] = 1;
        groupBuyPlanFactory.modifyById(param, function (response) {
            modalFactory.showShortAlert("删除成功");
            $scope.reloadPage();
        }, function (response) {
            modalFactory.showShortAlert("删除失败");
        })
    }

    /**
     * 时间选择器
     */
    $('#start_hour_group').datetimepicker({
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

    /**
     * 时间选择器
     */
    $('#end_hour_group').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy-mm-dd hh:ii:00',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });


    /**
     * 时间选择器
     */
    $('#start_hour_group_modify').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy-mm-dd hh:ii:00',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    /**
     * 时间选择器
     */
    $('#end_hour_group_modify').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy-mm-dd hh:ii:00',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });


})
;