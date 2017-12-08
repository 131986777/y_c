/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_appointmentOrder_Controller', function ($scope,http, $stateParams, analysisFactory, modalFactory) {
	
    modalFactory.setTitle("线上预约单统计");
    modalFactory.setBottom(false);
    $scope.filter = {};
    
    //初始化
    $scope.initLoad = function () {
    	var title=['商品名称','订单数量','商品编码','商品货号','商品销售量','规格','销售额','操作'];
    	$scope.TITLE=title;
    	
    	analysisFactory.getList().get({},function (response) {
            $scope.list=response.data;
            angular.forEach($scope.list,function(data){
            	$("#shop").append("<option value='"+data['SHOP.SHOP_ID']+"'>"+data['SHOP.SHOP_NAME']+"</option>"); 
            });
            $('.selectpicker').selectpicker({  
                'selectedText': 'cat'  
            });
            $('.selectpicker').selectpicker('refresh');
            
        },null);
    	 	$scope.prdMap = {};
    	$scope.getPrd = function (SKU_ID) {
	        console.log(SKU_ID);
	        var aDataSet=null;
	        $.ajax({  
	               type : "post",  
	                url : "http://localhost:8080/AndSell/bubu/shop/product/getBySkuIdWithAllInfo",  
	                data : "SHOP_PRODUCT_SKU.SKU_IDS=" + SKU_ID,  
	                async : false,  
	                success : function(data){  
	                  aDataSet = data; 
	                  console.log(aDataSet);
	                }  
	           });  
	        	aDataSet.data.forEach(function (ele) {
	                $scope.prdMap[ele['SHOP_PRODUCT.PRD_ID']] = ele;
	            });
	  console.log($scope.prdMap);      
	  }
    	//加载预约商品
    	analysisFactory.getAppointmentProduct().get({},function (response) {
            $scope.list=response.data;
            //获得sku_id以及 用它来找商品名称
            var prdList = new Array;
            $scope.list.forEach(function (ele) {
                prdList.push(ele['APPOINTMENT_PRODUCT.SKU_ID']);
            });
            $scope.getPrd(prdList.toString());
            console.log($scope.prdMap);
            angular.forEach($scope.prdMap,function(data){
            	$("#product").append("<option value='"+data['SHOP_PRODUCT.PRD_ID']+"'>"+data['SHOP_PRODUCT.PRD_NAME']+"</option>"); 
            });
            $('.selectpicker').selectpicker({  
                'selectedText': 'cat'  
            });
            $('.selectpicker').selectpicker('refresh');
            
        },null);
    	 
    	 
    	var today = getCurrentTime();
    	var date = new Date();
    	$('#start_hour').datetimepicker({
   		 	minView: "month",
           language: 'zh-CN',
           autoclose: true,
           todayHighlight: true,
           weekStart: 1,
           startView: 2,
           format: 'yyyy-mm-dd',
           initialDate:date,
           todayBtn: 'linked'
       }).on('changeDate',function(e){
       	var startTime = e.date;
       	$('#end_hour').datetimepicker('setStartDate',startTime);
       	var endTime = getLastDayOdMonth(e.date.getFullYear(),e.date.getMonth()+1);
       	$('#end_hour').datetimepicker('setEndDate',endTime); 
       }).on('show',function(){
       });

       $('#end_hour').datetimepicker({ 
           language: 'zh-CN',
           minView: "month",
           autoclose: true,
           todayHighlight: true,
           weekStart: 1,
           initialDate:today,
           format: 'yyyy-mm-dd',
           todayBtn: 'linked',
       });
    	$scope.filter['GET_PRD_DATETIME'] = getCurrentTime();
    	$scope.getProdutOrderList();
    }
    
    //查询事件
    $scope.getProdutOrderList = function(){
    	if(isNull($scope.filter['GET_PRD_DATETIME']) ){
    		 modalFactory.showShortAlert("提货时间不能为空！");
             return;
    	}
    	var url = "../../queryOrder";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        $scope.orderList = {};
        $scope.orderList['type'] = "onlineProductOrder";
        $scope.orderList['param'] = JSON.stringify($scope.filter);
        console.log($scope.orderList);
        http.post_ori(url, $scope.orderList, function (response) {
        	$scope.OLDLIST = response;
        	var sum = 0;
        	angular.forEach($scope.OLDLIST,function(data){
        		console.log(data['PRICE_SUM']);
        		sum += data['PRICE_SUM'];
            });
        	console.log(sum);
            $scope.all=sum.toFixed(2)+"元";
        });
    }
    
    $scope.outPutQuery = function(){

    	$('#ouputBtn').attr("disabled","disabled");
        var url = "../../outputQuery";
        $scope.filter['SHEET_NAME'] = "线上预约商品订单";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        $scope.filter['COLUMN_WIDTH'] = [6000,4000,4000,2500,4000];
        $scope.outputList = {};
        $scope.outputList['type'] = "onlineProductOrder";
        $scope.outputList['param'] = JSON.stringify($scope.filter);
        modalFactory.showReturnAlert("正在导出 请稍等",function(scope){
        	http.post_ori(url, $scope.outputList, function (response) {
        		scope.ifShow = false;
        		$('#ouputBtn').removeAttr("disabled");
                if (response != "failure") {
                    location.href = "/AndSell" + response;
                } else {
                    modalFactory.showShortAlert("导出失败");
                }
            });
			
		});
    }
    
 
    }); 

//获取当前时间
function getCurrentTime(){
	var now = new Date();    
    var year = now.getFullYear();       //年   
    var month = now.getMonth() + 1;     //月   
    var day = now.getDate();            //日
    return year+"-"+p(month)+"-"+p(day);
}
function p(s) {
    return s < 10 ? '0' + s: s;
}

function getLastDayOdMonth(year,month){
	var  day = new Date(year,month,0);   
    var lastdate = year + '-' + p(month) + '-' + day.getDate();//获取当月最后一天日期   
    return lastdate;
}

