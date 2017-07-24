/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_offlineShopProductAnalysis_Controller', function ($scope,http, $stateParams, analysisFactory, modalFactory) {
	
	var PRD_NAME = $stateParams.PRD_NAME;
    modalFactory.setTitle(PRD_NAME);
    modalFactory.setBottom(false);
    
    
    //初始化
    $scope.initLoad = function () {
    	var title=['门店','订单数量','商品销售量','销售额'];
    	$scope.TITLE=title;
    	$scope.filter = JSON.parse($stateParams.FILTER);
    	$scope.filter['PRD_NAME'] = $stateParams.PRD_NAME;
    	$scope.getProdutOrderList();
    	$scope.initChart();
    }
    
    //查询事件
    $scope.getProdutOrderList = function(){
    	if(isNull($scope.filter['DATETIME_ADD_FROM']) || isNull($scope.filter['DATETIME_ADD_TO'])){
    		 modalFactory.showShortAlert("开始和截止时间不能为空！");
             return;
    	}
    	var url = "../../queryOrder";
        $scope.orderList = {};
        $scope.orderList['type'] = "shopProductOrder";
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
    
    //echarts初始化
    $scope.initChart = function(){
    	var url = "../../queryOrder";
    	$scope.orderList = {};
        $scope.orderList['type'] = "shopProductOrderInDate";
        $scope.orderList['param'] = JSON.stringify($scope.filter);
        var dateArray = new Array();
        var orderChartArray = new Array();
        http.post_ori(url, $scope.orderList, function (response) {
        	$scope.list = response;
        	console.log($scope.list);
        	angular.forEach($scope.list,function(data){
        		dateArray.push(data['ADDTIME']);
        		orderChartArray.push(data['PRICE_SUM']);
        	});
        	$scope.chartOrder('销售额',dateArray,orderChartArray);
        });
    }
    
    //导出列表
    $scope.outPutQuery = function(){

    	$('#ouputBtn').attr("disabled","disabled");
        var url = "../../outputQuery";
        $scope.filter['SHEET_NAME'] = "门店商品订单";
        $scope.filter['COLUMN_WIDTH'] = [6000,4000,4000,2500,4000];
        console.log($scope.filter);
        $scope.outputList = {};
        $scope.outputList['type'] = "offlineShopProduct";
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
    
    $scope.goBack = function (){
    	history.back();
    }
    
  //引入chart
    $scope.chartOrder = function (chartName,dateArray,orderChartArray){
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            tooltip: {
                trigger:'axis'
            },
            legend: {
                data:[chartName]
            },
            grid:{
                show:true,
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateArray,
            },
            yAxis: {},
            series: [{
                name:chartName,
                type: 'line',
                data: orderChartArray
            }]
        };
        myChart.setOption(option);
    }
    
 
    }); 



