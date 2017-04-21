/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_formAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("线上商品销售报表");
    modalFactory.setBottom(false);
    $scope.START = getYesterday();
    $scope.END = getYesterday();
    $scope.initLoad = function () {
        dataStatus($scope);
        getFormSource(getYesterday(),getYesterday());
    }
    $scope.YESTERDAY = getYesterday();
    $scope.getGroupByRange = function () {
        var startDay = $scope.groupRange['STARTDAY'];
        var endDay = $scope.groupRange['ENDDAY'];
        var shopid=$scope.groupRange['SHOPID'];
        var productname=$scope.groupRange['PRODUCTNAME']
        var rank=$scope.groupRange['rank']
        $scope.FORMSOURCE = "";
        getFormSource(startDay,endDay,shopid,productname,rank);
    };
    //获得门店
    $scope.bindData = function (response) {
        $scope.memberList = response.data;
        $scope.shopList = response.extraData.shopList;
    };

    function getFormSource(startDay,endDay,shopid,productname,rank) {
        analysisFactory.getFormChangeByRange(startDay,endDay).get({},function (response) {
            if((response.data).length==0){
                modalFactory.showShortAlert("所选日期无数据！")
                return;
            }
            var flag = response.data;
            var temp;
            var array = new Array();
            var shop;
            for(var i=0;i<flag.length;i++){
                temp = JSON.parse(flag[i]['MANAGE_DATA_ANALYSIS.SOURCE']);
                if(shopid=='null'&&(productname==undefined||productname=='')){
                	for(var j=0;j<temp.length;j++){
                    		array.push(temp[j])
                    }
                }
                //只找该商品的
                if(shopid=='null'&& productname!=undefined){
                	for(var j=0;j<temp.length;j++){
                		if(temp[j].PRODUCT_NAME==productname ||temp[j].PRODUCT_SKU==productname){
                		array.push(temp[j])
                		}
                	}
                }
                //只找该门店
                if(shopid!=='null' && (productname==undefined||productname=='')){
               		for(var j=0;j<temp.length;j++){
                		if(temp[j].SHOP_ID==shopid){
                    		array.push(temp[j])
                    	}
               		}	
                }
                //只找该门店的某种商品
                if(shopid!=='null' && productname!=undefined){
               		for(var j=0;j<temp.length;j++){
                		if(temp[j].SHOP_ID==shopid &&(temp[j].PRODUCT_NAME==productname||temp[j].PRODUCT_SKU==productname)){
                    		array.push(temp[j])
                    	}
               		}	
                }
            }
            if(rank=='SHOPID_ASC'){
            	array.sort(function(a,b){
                    return a.SHOP_ID - b.SHOP_ID;
                });
            }else{
            	array.sort(function(a,b){
                    return Date.parse(b.ORDER_DATETIME) - Date.parse(a.ORDER_DATETIME);
                });
            }
            console.log(array);
            $scope.FORMSOURCE = array;
        },null);
    }
});


// //获取最近一个月的起始时间
// function getYesterMonthBeginDay(day) {
//     var date = new Date(day);
//     date.setMonth(date.getMonth()-1);
//     return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
// }
//获取昨天
function getYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+yesterday.getDate()
}
function dataStatus($scope) {
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
    $('#endDay').datetimepicker({
        minView: "month",
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy-mm-dd ',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });
    $(document).ready(function() {
        $('#birthday').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

    $(document).ready(function() {
        $('#birthdayDate').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });
}
