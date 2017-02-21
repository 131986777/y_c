angular.module('AndSell.Main').controller('product_product_groupBuying_Controller', function ($scope, $stateParams, productFactory, modalFactory ,groupBuyingFactory) {

    modalFactory.setTitle('团购商品');

    //要添加的团购对象
    $scope.groupBuying = {};

    //要修改的抢购对象
    $scope.groupBuyingToModify = {};
    //要详细显示的抢购对象
    $scope.groupBuyingToDescribes={};

    //要添加的规则
    $scope.roleListMember=[];
    $scope.roleListMember.push({'memberNum':0,'unitPrice':0});
    $scope.roleListPrd=[];
    $scope.roleListPrd.push({'prdNum':0,'unitPrice':0});

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
    $scope.getPrd = function (skuIds) {
        $scope.prdMap = {};
        productFactory.getBySkuIdWithAllInfo({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            response.data.forEach(function (ele) {
                $scope.prdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
            });
        });
    }


    /**
     * 添加人数成团区间
     */
    $scope.addMemberLadder = function(){
        $scope.roleListMember.push({'memberNum':0,'unitPrice':0});
    }

    /**
     * 添加商品数成团区间
     */
    $scope.addPrdLadder = function(){
        $scope.roleListPrd.push({'prdNum':0,'unitPrice':0});
    }

    /**
     * 删除人数成团的最后一个阶梯
     */
    $scope.delMemberLadder = function(){
        $scope.roleListMember.pop();
    }

    /**
     * 删除商品数成团的最后一个阶梯
     */
    $scope.delPrdLadder = function(){
        $scope.roleListPrd.pop();
    }

    /**
     * 清空阶梯规则的容器
     */
    $scope.cleanRole=function(){
        $scope.roleListMember=[];
        $scope.roleListMember.push({'memberNum':0,'unitPrice':0});
        $scope.roleListPrd=[];
        $scope.roleListPrd.push({'prdNum':0,'unitPrice':0});
    }

    /**
     * 添加团购
     */
    $scope.addGroupBuying = function(){
        var form = $scope.groupBuying;
        //表单验证
        if (form['GROUP_BUYING.NAME'] == undefined||form['GROUP_BUYING.DESCRIBES'] == undefined||form['GROUP_BUYING.TYPE'] == undefined||form['GROUP_BUYING.UNIT_MAX_NUM'] == undefined||form['GROUP_BUYING.BEGIN_DATETIME'] == undefined||form['GROUP_BUYING.END_DATETIME'] == undefined||form['GROUP_BUYING.PICK_UP_GOODS_TIME'] == undefined||form['GROUP_BUYING.SUM_NUM'] == undefined||$scope.sku == undefined){
            alert("请填写完整表单信息") ;
            return
        }
        //初始化数据
        form['GROUP_BUYING.SKU_ID']=$scope.sku['skuId'];
        if (form['GROUP_BUYING.TYPE']=='unLadderPrd'||form['GROUP_BUYING.TYPE']=='ladderPrd'){
            var json = $scope.initJson($scope.roleListPrd);
        }else if(form['GROUP_BUYING.TYPE']=='unLadderMember'||form['GROUP_BUYING.TYPE']=='ladderMember'){
            var json = $scope.initJson($scope.roleListMember);
        }
        form['GROUP_BUYING.JSON']=json;
        //请求接口
        groupBuyingFactory.addGroupBuying(form,function(response){
            alert("添加成功");
            //表单置空
            $scope.groupBuying={};
        },function(response){
            alert("添加失败");
            //表单置空
            $scope.groupBuying={};
        })
    }

    /**
     * 根据阶梯的数组取得其json
     * @param list
     */
    $scope.initJson = function(list){
        //数据验证
        list.forEach(function(ele){
            if (ele['prdNum']!=undefined&&ele['prdNum']==0||ele['memberNum']!=undefined&&ele['memberNum']==0||ele['unitPrice']==0){
                alert("团购规则存在非法数据");
                return;
            }
            ele['unitPrice']=ele['unitPrice']*100;
        })
        var json = JSON.stringify(list);
        return json;
    }

    /**
     * 请求所有的团购数据
     */
    $scope.queryAllGroupBuying = function(){
        groupBuyingFactory.queryAllGroupBuying({},function(response){
            $scope.groupBuyingList=response['data'];
            //取得所有skuid并请求接口
            var skuIds = '';
            $scope.groupBuyingList.forEach(function(ele){
                if (skuIds!=''){
                    skuIds+=',';
                }
                skuIds+=ele['GROUP_BUYING.SKU_ID'];
            })
            $scope.getPrd(skuIds);
        },function(response){
            alert("请求数据失败");
        })
    }

    /**
     * 格式化价格单位
     * @param list
     */
    $scope.initPrice=function(list){
        list.forEach(function (ele) {
            ele['unitPrice']=ele['unitPrice']/100;
        })
    }

    /**
     * 初始化详细信息
     * @param groupBuying
     */
    $scope.initDescribes=function(groupBuying){
        $scope.groupBuyingToDescribes=groupBuying;
        var json = groupBuying['GROUP_BUYING.JSON'];
        if (groupBuying['GROUP_BUYING.TYPE']=='ladderPrd'||groupBuying['GROUP_BUYING.TYPE']=='unLadderPrd'){
            $scope.roleListPrd=JSON.parse(json);
            $scope.initPrice( $scope.roleListPrd)
        }else if (groupBuying['GROUP_BUYING.TYPE']=='unLadderMember'||groupBuying['GROUP_BUYING.TYPE']=='ladderMember'){
            $scope.roleListMember=JSON.parse(json);
            $scope.initPrice( $scope.roleListMember)
        }
    }

    /**
     * 初始化要修改的团购
     * @param groupBuying
     */
    $scope.initModify=function(groupBuying){
        $scope.groupBuyingToModify=groupBuying;
        $scope.sku = {};
        $scope.sku['skuId'] = groupBuying['GROUP_BUYING.SKU_ID'];
        $scope.sku['prdName'] = $scope.prdMap[groupBuying['GROUP_BUYING.SKU_ID']]['SHOP_PRODUCT.PRD_NAME'];
        var json = groupBuying['GROUP_BUYING.JSON'];
        if (groupBuying['GROUP_BUYING.TYPE']=='ladderPrd'||groupBuying['GROUP_BUYING.TYPE']=='unLadderPrd'){
            $scope.roleListPrd=JSON.parse(json);
            $scope.initPrice( $scope.roleListPrd)
        }else if (groupBuying['GROUP_BUYING.TYPE']=='unLadderMember'||groupBuying['GROUP_BUYING.TYPE']=='ladderMember'){
            $scope.roleListMember=JSON.parse(json);
            $scope.initPrice( $scope.roleListMember)
        }
    }

    /**
     * 修改
     */
    $scope.modifyGroupBuying = function(){
        var form = $scope.groupBuyingToModify;
        //表单验证
        if (form['GROUP_BUYING.NAME'] == undefined||form['GROUP_BUYING.DESCRIBES'] == undefined||form['GROUP_BUYING.TYPE'] == undefined||form['GROUP_BUYING.UNIT_MAX_NUM'] == undefined||form['GROUP_BUYING.BEGIN_DATETIME'] == undefined||form['GROUP_BUYING.END_DATETIME'] == undefined||form['GROUP_BUYING.PICK_UP_GOODS_TIME'] == undefined||form['GROUP_BUYING.SUM_NUM'] == undefined||$scope.sku == undefined){
            alert("请填写完整表单信息") ;
            return
        }
        //初始化数据
        form['GROUP_BUYING.SKU_ID']=$scope.sku['skuId'];
        if (form['GROUP_BUYING.TYPE']=='unLadderPrd'||form['GROUP_BUYING.TYPE']=='ladderPrd'){
            var json = $scope.initJson($scope.roleListPrd);
        }else if(form['GROUP_BUYING.TYPE']=='unLadderMember'||form['GROUP_BUYING.TYPE']=='ladderMember'){
            var json = $scope.initJson($scope.roleListMember);
        }
        form['GROUP_BUYING.JSON']=json;
        //请求接口
        groupBuyingFactory.modifyById(form,function(response){
            alert("修改成功");
            //表单置空
            $scope.groupBuyingToModify={};
        },function(response){
            alert("修改失败");
            //表单置空
            $scope.groupBuyingToModify={};
        })
    }

    /**
     * 修改状态
     * @param groupBuying
     * @param type
     */
    $scope.changeState=function(groupBuying,type){
        groupBuying['GROUP_BUYING.STATE']=type;
        groupBuyingFactory.modifyById(groupBuying,function(response){
            alert("修改成功");
        },function(response){
            alert("修改失败");
        })
    }

    /**
     * 逻辑删除
     * @param groupBuying
     */
    $scope.deleteGroupBuying=function(groupBuying){
        groupBuying['GROUP_BUYING.IS_DEL']=1;
        groupBuyingFactory.modifyById(groupBuying,function(response){
            alert("修改成功");
        },function(response){
            alert("修改失败");
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
        format: 'yyyy/mm/dd hh:ii',
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
        format: 'yyyy/mm/dd hh:ii',
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
    $('#pick_hour_group').datetimepicker({
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

    /**
     * 时间选择器
     */
    $('#start_hour_group_modify').datetimepicker({
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

    /**
     * 时间选择器
     */
    $('#end_hour_group_modify').datetimepicker({
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

    /**
     * 时间选择器
     */
    $('#pick_hour_group_modify').datetimepicker({
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

});