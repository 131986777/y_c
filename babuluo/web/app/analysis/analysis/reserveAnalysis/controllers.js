/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_reserveAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
   
    
    modalFactory.setTitle("预订销售报表");
    modalFactory.setBottom(false);
    $scope.START = getYesterday();
    $scope.END = getYesterday();
    //日期初始化
    $scope.initLoad = function () {
        getOfflineFormSource(getYesterday(), getYesterday());
        dataStatus($scope); 
    }
    //查询事件
    $scope.getGroupByRange = function () {
       
        var startDay = $scope.STARTDAY
        var endDay = $scope.ENDDAY
        getOfflineFormSource(startDay, endDay);

    }  
    function getOfflineFormSource(startDay, endDay) {
	 var obj=[]
    obj=[
    	{SHOP_ID:100001,SHOP_NAME:'翠屏国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:1,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100002,SHOP_NAME:'翠EW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100003,SHOP_NAME:'翠QW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:3,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100003,SHOP_NAME:'翠QW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:3,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},	
    	{SHOP_ID:100003,SHOP_NAME:'翠QW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:3,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100003,SHOP_NAME:'翠QW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:3,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100003,SHOP_NAME:'翠QW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:3,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100003,SHOP_NAME:'翠QW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:3,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]},
    	{SHOP_ID:100004,SHOP_NAME:'翠EW国际',SKU_1_VALUE:['龙虾蒜泥','龙虾十三香','龙虾香辣','端午礼盒'],COUNT:[{COUNT1:4,COUNT2:2,COUNT3:3},{COUNT1:2,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3},{COUNT1:5,COUNT2:2,COUNT3:3}]}  	
    ]
  
   
    var total=[]
    var title=['门店ID','门店名称']
    for(var i=0;i<obj[0]['SKU_1_VALUE'].length;i++){
    	var objs={}
    	var state1=0  //状态1  
	    var state2=0  //状态2
	    var state3=0  //状态3
    	title.push(obj[0]['SKU_1_VALUE'][i])
   		 for(var k=0; k<obj.length ;k++){
	    	state1+=obj[k]['COUNT'][i]['COUNT1']
			state2+=obj[k]['COUNT'][i]['COUNT2']
			state3+=obj[k]['COUNT'][i]['COUNT3']
	    }
    	objs['state1']=state1
    	objs['state2']=state2
    	objs['state3']=state3
    	total.push(objs)
    }
   console.log(total)
    
//  console.log(state1)
//  console.log(state2)
//  console.log(state3)
	$scope.TITLE=title
    $scope.OLDLIST=obj
    $scope.TOTAL=total
    console.log($scope.TITLE)
    console.log( $scope.OLDLIST)
}
    }); 
//获取昨天
function getYesterday() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate()
}
function dataStatus($scope) {
//  $('#startDay').datetimepicker({
//      minView: "month",
//      language: 'zh-CN',
//      autoclose: true,
//      todayHighlight: true,
//      weekStart: 1,
//      startView: 2,
//      format: 'yyyy-mm-dd',
//      todayBtn: 'linked'
//  }).on("hide", function () {
//      var $this = $(this);
//      var _this = this;
//      $scope.$apply(function () {
//          $scope[$this.attr('ng-model')] = _this.value;
//      });
//  });

  $('#start_hour').datetimepicker({
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

    $('#end_hour').datetimepicker({
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
//  $('#endDay').datetimepicker({
//      minView: "month",
//      language: 'zh-CN',
//      autoclose: true,
//      todayHighlight: true,
//      weekStart: 1,
//      format: 'yyyy-mm-dd ',
//      todayBtn: 'linked',
//  }).on("hide", function () {
//      var $this = $(this);
//      var _this = this;
//      $scope.$apply(function () {
//          $scope[$this.attr('ng-model')] = _this.value;
//      });
//  });
// $(document).ready(function () {
//      $('#birthday').daterangepicker({singleDatePicker: true}, function (start, end, label) {
//          console.log(start.toISOString(), end.toISOString(), label);
//      });
//  });
//
//  $(document).ready(function () {
//      $('#birthdayDate').daterangepicker({singleDatePicker: true}, function (start, end, label) {
//          console.log(start.toISOString(), end.toISOString(), label);
//      });
//  }); 
}
