/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_orderInfoAnalysis_Controller', function ($scope,http, $stateParams, analysisFactory, modalFactory) {
	
    modalFactory.setTitle("订单报表");
    modalFactory.setBottom(false);
    $scope.filter = {};
    
    //初始化
    $scope.initLoad = function () {
    	var title=['门店','订单号','购买人','手机号','货号','商品编码','商品','数量','金额','时间','提货时间','提货状态'];
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
           //onSelect:function(){$scope.filter['DATETIME_ADD_TO']=''},
           initialDate:date,
           todayBtn: 'linked'
       }).on('changeDate',function(e){
       	$scope.filter['DATETIME_ADD_TO'] = '';
       	var startTime = e.date;
       	$('#end_hour').datetimepicker('setStartDate',startTime);
       	var endTime = getLastDayOdMonth(e.date.getFullYear(),e.date.getMonth()+1);
       	$('#end_hour').datetimepicker('setEndDate',endTime); 
       }).on('show',function(){
    	   $scope.filter['DATETIME_ADD_TO']=''
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
       $('#get_hour').datetimepicker({ 
           language: 'zh-CN',
           minView: "month",
           autoclose: true,
           todayHighlight: true,
           weekStart: 1,
           initialDate:today,
           format: 'yyyy-mm-dd',
           todayBtn: 'linked',
       });
      //  $scope.filter['DATETIME_GET_FROM'] = getCurrentTime();
    	$scope.filter['DATETIME_ADD_FROM'] = getCurrentTime();
    	$scope.filter['DATETIME_ADD_TO'] = getCurrentTime();
    	$scope.getProdutOrderList();
    }
    
    //查询事件
    $scope.getProdutOrderList = function(){
    	if(isNull($scope.filter['DATETIME_ADD_FROM']) || isNull($scope.filter['DATETIME_ADD_TO'])){
    		 modalFactory.showShortAlert("开始和截止时间不能为空！");
             return;
    	}
    	delete $scope.filter['GET_PRD_DATETIME'];
    	var url = "../../queryOrder";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        $scope.orderList = {};
        $scope.orderList['type'] = "orderInfo";
        $scope.orderList['param'] = JSON.stringify($scope.filter);
        http.post_ori(url, $scope.orderList, function (response) {
        	$scope.OLDLIST = response;
        	var sum = 0;
        	angular.forEach($scope.OLDLIST,function(data){
        		sum += parseFloat(data['PRICE_SUM']);
            });
        	console.log(sum);
            $scope.all=sum.toFixed(2)+"元";
        });
    }
  //查询昨日未提货订单
    $scope.getYesterdayProdutOrderList = function(){
    	delete $scope.filter['DATETIME_ADD_FROM']; 
    	//$scope.filter['DATETIME_ADD_FROM']='';
    	delete $scope.filter['DATETIME_ADD_TO'];
    	$scope.filter['GET_PRD_DATETIME']=getYesterdayTime();
    	var url = "../../queryOrder";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        $scope.orderList = {};
        $scope.orderList['type'] = "orderInfo";
        $scope.orderList['param'] = JSON.stringify($scope.filter);
        http.post_ori(url, $scope.orderList, function (response) {
        	$scope.OLDLIST = response;
        	var sum = 0;
        	angular.forEach($scope.OLDLIST,function(data){
        		sum += parseFloat(data['PRICE_SUM']);
            });
        	console.log(sum);
            $scope.all=sum.toFixed(2)+"元";
        });
    }
    
    $scope.outPutQuery = function(){

    	$('#ouputBtn').attr("disabled","disabled");
        var url = "../../outputQuery";
        $scope.filter['SHEET_NAME'] = "线上商品订单";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        $scope.filter['COLUMN_WIDTH'] = [6000,6000,4000,4000,4000,2500,2500,4000,4000,4000,4000];
        $scope.outputList = {};
        $scope.outputList['type'] = "orderInfo";
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
//获取昨天时间
function getYesterdayTime(){
     var day1 = new Date();
     day1.setTime(day1.getTime()-24*60*60*1000);
     return day1.getFullYear()+"-" + p(day1.getMonth()+1) + "-" + p(day1.getDate());
}

function p(s) {
    return s < 10 ? '0' + s: s;
}

function getLastDayOdMonth(year,month){
	var  day = new Date(year,month,0);   
    var lastdate = year + '-' + p(month) + '-' + day.getDate();//获取当月最后一天日期   
    return lastdate;
}

