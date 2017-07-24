/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_offlineProductAnalysis_Controller', function ($scope,http, $stateParams, analysisFactory, modalFactory) {
	
    modalFactory.setTitle("线下商品报表");
    modalFactory.setBottom(false);
    $scope.filter = {};
    
    //初始化
    $scope.initLoad = function () {
    	var title=['商品名称','订单数量','商品销售量','销售额','操作'];
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
    	var url = "../../queryOrder";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        $scope.orderList = {};
        $scope.orderList['type'] = "productOrder";
        $scope.orderList['param'] = JSON.stringify($scope.filter);
        http.post_ori(url, $scope.orderList, function (response) {
        	$scope.OLDLIST = response;
        	var sum = 0;
        	angular.forEach($scope.OLDLIST,function(data){
        		sum += parseFloat(data['PRICE_SUM']);
            });
            $scope.all=sum.toFixed(2)+"元";
        });
    }
    
    $scope.outPutQuery = function(){

    	$('#ouputBtn').attr("disabled","disabled");
        var url = "../../outputQuery";
        $scope.filter['SHEET_NAME'] = "商品订单";
        $scope.filter['SHOP_ID'] = $('#shop').val();
        //$scope.filter['TITLE'] = ['商品名称','订单数量','商品销售量','规格','销售额'];
        $scope.filter['COLUMN_WIDTH'] = [6000,4000,4000,2500,4000];
        $scope.outputList = {};
        $scope.outputList['type'] = "offlineProduct";
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

