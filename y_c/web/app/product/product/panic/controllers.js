angular.module('AndSell.Main').controller('product_product_panic_Controller', function ($scope, $stateParams, productFactory, modalFactory ,seckillFactory) {

    modalFactory.setTitle('抢购商品');

    //要添加的抢购对象
    $scope.seckill = {};

    //要修改的抢购对象
    $scope.seckillToModify = {};

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
     * 添加抢购计划
     */
    $scope.addSeckill = function(){
        var form = $scope.seckill;
        //数据非空验证
        if (form['SECKILL.NAME'] == undefined||form['SECKILL.DESCRIBES'] == undefined||form['SECKILL.TYPE'] == undefined||form['SECKILL.LIMIT_NUM'] == undefined||form['SECKILL.BEGIN_DATETIME'] == undefined||$scope.sku['skuId'] == undefined||form['priceShow'] == undefined){
      
             modalFactory.showShortAlert("请填写完整表单信息") ;
            return
        }
        if(form['SECKILL.END_DATETIME'] == undefined&&form['SECKILL.TYPE'] != 'num'||form['SECKILL.SUM_NUM'] == undefined&&form['SECKILL.TYPE'] != 'time'){
            alert("请填写完整表单信息") ;
            return
        }
        //组装数据
        form['SECKILL.SKU_ID'] = $scope.sku['skuId'] ;
        form['SECKILL.UNIT_PRICE'] = form['priceShow']*100;
        //请求接口
        seckillFactory.addSeckill(form , function (response) {
            $scope.queryAllSeckill();
             modalFactory.showShortAlert("添加成功")
        },function(response){
             modalFactory.showShortAlert("添加失败")
        })
    }

    /**
     * 请求所有的秒杀计划
     */
    $scope.queryAllSeckill = function(){
        seckillFactory.queryAllSeckill({}, function (response) {
            $scope.seckillList = response['data'] ;
            //初始化skuIds，并且格式化价格
            var skuIds = '' ;
            $scope.seckillList.forEach(function (ele) {
                if (skuIds.length != 0){
                    skuIds += "," ;
                }
                skuIds += ele['SECKILL.SKU_ID'] ;
                ele['priceShow'] = ele['SECKILL.UNIT_PRICE']/100;
            });
            //根据skuIds拿到prd对象
            $scope.getPrd(skuIds) ;
        },function(response){
             modalFactory.showShortAlert("请求数据失败");
        })
    }

    /**
     * 绑定要修改的秒杀
     * @param seckill
     */
    $scope.bindToModify= function (seckill) {
        seckill['SECKILL.UNIT_PRICE'] = seckill['SECKILL.UNIT_PRICE'];
        $scope.seckillToModify = seckill ;
        $scope.sku = {};
        $scope.sku['skuId'] = seckill['SECKILL.SKU_ID'];
        $scope.sku['prdName'] = $scope.prdMap[seckill['SECKILL.SKU_ID']]['SHOP_PRODUCT.PRD_NAME'];
    }

    /**
     * 修改秒杀计划
     */
    $scope.modifySeckill = function(){
        var form = $scope.seckillToModify;
        //数据非空验证
        if (form['SECKILL.BEGIN_DATETIME'] == undefined ){
             modalFactory.showShortAlert("请填写完整表单信息") ;
            return
        }
        //组装数据
        form['SECKILL.SKU_ID'] = $scope.sku['skuId'] ;
        form['SECKILL.UNIT_PRICE'] = form['priceShow']*100;
        //请求接口
        seckillFactory.modifySeckill(form , function (response) {
            $scope.queryAllSeckill();
            $scope.flushDB();
            modalFactory.showShortAlert("修改成功")
        },function(response){
            modalFactory.showShortAlert("修改失败")
        })
    }
    
    $scope.flushDB = function(){
    	$.ajax({
	    	type:"get",
	    	url:"http://yx.bblycyz.com/seckill/rest/seckill/flushDB",//url写异域的请求地址
	    	dataType:"jsonp",//加上datatype
	    	//jsonpCallback:"callback",//设置一个回调函数，名字随便取，和的函下面数里的名字相同就行
	    	success:function(response){
	    		console.log(response);
	    	}
    	})
    };

    /**
     * 禁用或启用秒杀计划
     */
    $scope.changeState = function( seckill,  type){
        seckill['SECKILL.STATE']=type ;
        seckillFactory.modifySeckill(seckill , function(response){
            $scope.queryAllSeckill();
            modalFactory.showShortAlert('修改成功') ;
        },function(response){
            modalFactory.showShortAlert('修改失败') ;
        })
    }

    /**
     * 逻辑删除秒杀计划
     * @param seckill
     */
    $scope.deleteSeckill = function(seckill){
        seckill['SECKILL.IS_DEL'] = 1 ;
        seckillFactory.modifySeckill(seckill , function(response){
            $scope.queryAllSeckill();
            modalFactory.showShortAlert('删除成功') ;
        },function(response){
             modalFactory.showShortAlert('删除失败') ;
        })
    }
    /**
     * 时间选择器
     */
    $('#start_hour_panic').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        pickerPosition:'top-left'
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
    $('#end_hour_panic').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        pickerPosition:'top-left'
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
    $('#pickup_hour_panic').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        pickerPosition:'top-left'
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
    $('#start_hour_panic_modify').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        pickerPosition:'top-left'
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
    $('#end_hour_panic_modify').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        pickerPosition:'top-left'
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
    $('#pickup_hour_panic_modify').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        pickerPosition:'top-left'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });
});