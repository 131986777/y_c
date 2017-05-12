angular.module('AndSell.Main').controller('product_product_appointment_Controller', function ($scope, $stateParams, productFactory, modalFactory) {
	$('.multiselect').multiselect({setMaxOptionNum:4,selectedHtmlValue:'多选',setmax:3,setWidth:'100%'});
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
    // 初始化多选ADD
   $('.table-toolbar>button').click(function(){
	   $('.newSelectTitle>span').html('多选')
	   $('.newOptions>li[data-select=true]>i').remove()
	   $('.newOptions>li[data-select=true]').removeAttr('data-select')
	   $('.multiselect>option[data-select=true]').removeAttr('data-select')
    })
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
        	if($scope.add['APPOINTMENT_PRODUCT.TIME_TYPE']=='WEEK_COMB'){//tianjia自定义
        		var t=$('#add .newSelectTitle span').html()//获得选中多个星期的值
            	t=t.substring(0,(t.length-1));
        		var weekdays='';
            	var strs=t.split(","); //字符分割
            	 for (var i = 0; i < strs.length; i++) {
            		 weekdays=weekdays+($scope.moth(strs[i]))+","
        		}
            	 
            	 weekdays=weekdays.substring(0,(weekdays.length-1));
            	 $scope.add['APPOINTMENT_PRODUCT.START_TIME']=weekdays;
        	}
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
    	//初始化
    	$('.newSelectTitle>span').html('多选')
		$('.newOptions>li[data-select=true]>i').remove()
		$('.newOptions>li[data-select=true]').removeAttr('data-select')
		$('.multiselect>option[data-select=true]').removeAttr('data-select')
		
		//赋值
        $scope.modify = clone(item);
    	console.log($scope.modify)
    	var weekday='';//转化汉子
            	var strss=$scope.modify['APPOINTMENT_PRODUCT.START_TIME'].split(","); //字符分割
            	 for (var i = 0; i < strss.length; i++) {
            		 weekday=weekday+($scope.remoth(strss[i]))+","
        		}
    	$('#modify .newSelectTitle span').html(weekday)
    	//$('.newOptions>li[data-select=true]>i').remove()
    	for(var i=0; i<strss.length; i++){
    		$('#modify .newOptions li').eq(strss[i]-1).attr('data-select','true')
    		$('#modify .newOptions li').eq(strss[i]-1).append('<i class="fa fa-check arrow"></i>')
    		$('#modify .multiselect option').eq(strss[i]-1).attr('data-select','true')
    	}
    	
    	

    };

    $scope.modifyAppointment = function () {
    	if($scope.modify['APPOINTMENT_PRODUCT.TIME_TYPE']=='WEEK_COMB'){// 
    		var t=$('#modify .newSelectTitle span').html()//获得选中多个星期的值
        	t=t.substring(0,(t.length-1));
    		var weekdays='';
        	var strs=t.split(","); //字符分割
        	 for (var i = 0; i < strs.length; i++) {
        		 weekdays=weekdays+($scope.moth(strs[i]))+","
    		}
        	 weekdays= weekdays.substring(0,(weekdays.length-1));
        	 $scope.modify['APPOINTMENT_PRODUCT.START_TIME']=weekdays;
    	}
        productFactory.modAppointmentProduct($scope.modify, function (response) {
        	console.log($scope.modify);
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
    
    $scope.moth=function(ms)  { //日期转换
    	ms
		var sy
		var m = [1, 2, 3, 4, 5, 6, 7]
		var M = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
		for(var i = 0; i < M.length; i++) {
			if(M[i] == ms) {
				sy = i
				break 
			}

		}  
		return m[sy] 
	} 
    $scope.remoth=function(ms)  { //日期转换
    	ms
		var sy
		var M = [1, 2, 3, 4, 5, 6, 7]
		var m= ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
		for(var i = 0; i < M.length; i++) {
			if(M[i] == ms) {
				sy = i
				break 
			}

		}  
		return m[sy] 
	}    	

});