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
            //请求接口
            groupBuyPlanFactory.addGroupBuyPlan(form, function (response) {
                modalFactory.showShortAlert("添加成功");
                //表单置空
                $scope.groupBuyPlan = {};
                addSign = false;
                deferred = $q.defer();
                getPrdPromise = deferred.promise;
            }, function (response) {
                modalFactory.showShortAlert("添加失败");
                //表单置空
                $scope.groupBuyPlan = {};
                addSign = false;
                getPrdPromise = deferred.promise;
            })
        })
    };

    function addGroupBuyGroup(form) {
        groupBuyGroupFactory.addGroupBuyGroup(form, function (response) {

        }, function (response) {

        });
    }

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
     * 初始化详细信息
     * @param groupBuyPlan
     */
    $scope.initDescribes = function (groupBuyPlan) {
        $scope.groupBuyPlanToDescribes = groupBuyPlan;
        var json = groupBuyPlan['GROUP_BUY_PLAN.JSON'];
        if (groupBuyPlan['GROUP_BUY_PLAN.TYPE'] == 'ladderPrd' || groupBuyPlan['GROUP_BUY_PLAN.TYPE'] == 'unLadderPrd') {
            $scope.roleListPrd = JSON.parse(json);
            $scope.initPrice($scope.roleListPrd)
        } else if (groupBuyPlan['GROUP_BUY_PLAN.TYPE'] == 'unLadderMember' || groupBuyPlan['GROUP_BUY_PLAN.TYPE'] == 'ladderMember') {
            $scope.roleListMember = JSON.parse(json);
            $scope.initPrice($scope.roleListMember)
        }
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
            groupBuyPlanFactory.modifyById(form, function (response) {
                modalFactory.showShortAlert("修改成功");
                //表单置空
                $scope.groupBuyPlanToModify = {};
                addSign = false;
                deferred = $q.defer();
                getPrdPromise = deferred.promise;
            }, function (response) {
                modalFactory.showShortAlert("修改失败");
                //表单置空
                $scope.groupBuyPlanToModify = {};
                addSign = false;
                deferred = $q.defer();
                getPrdPromise = deferred.promise;
            })
        });

    };

    /**
     * 修改状态
     * @param groupBuyPlan
     * @param type
     */
    $scope.changeState = function (groupBuyPlan, type) {
        groupBuyPlan['GROUP_BUY_PLAN.STATE'] = type;
        groupBuyPlanFactory.modifyById(groupBuyPlan, function (response) {
            modalFactory.showShortAlert("改变状态成功");
        }, function (response) {
            modalFactory.showShortAlert("改变状态失败");
        })
    }

    /**
     * 逻辑删除
     * @param groupBuyPlan
     */
    $scope.deleteGroupBuyPlan = function (groupBuyPlan) {
        groupBuyPlan['GROUP_BUY_PLAN.IS_DEL'] = 1;
        groupBuyPlanFactory.modifyById(groupBuyPlan, function (response) {
            modalFactory.showShortAlert("删除成功");
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


});