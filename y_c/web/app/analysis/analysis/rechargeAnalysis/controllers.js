/**
 * Created by remix on 2016/12/8.
 */

angular.module('AndSell.Main').controller('analysis_analysis_rechargeAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
	
	analysisFactory.getList().get({},function (response) {
        
        $scope.list=response.data;
    },null);
    modalFactory.setTitle("充值经营报表");
    modalFactory.setBottom(false);
    console.log(CurentTime(0))
    //日期初始化
    $scope.initLoad = function () {
        getOfflineFormSource(CurentToTime(0),CurentTime(0));
        dataStatus($scope); 
        $scope.STARTDAY=CurentToTime(0)
        $scope.ENDDAY=CurentTime(0)
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
    }
    //查询事件
    $scope.getGroupByRange = function () {
       
        var startDay = $scope.STARTDAY
        var endDay = $scope.ENDDAY
        getOfflineFormSource(startDay, endDay);

    }  
    function getOfflineFormSource(startDay, endDay) {	
	 $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy-mm-dd hh:ii',
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
        format: 'yyyy-mm-dd hh:ii',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });
    console.log($('select').eq(1).val())
    analysisFactory.getOrderAnalysisByRechange(startDay, endDay,$('select').eq(1).val()).get({}, function (response) {
    	console.log(response)
    	
	 var obj=[]
    	var all=0
	 if(response.data.length==0){
	 	modalFactory.showShortAlert("所选日期无数据！")
	 	title=null
	 	obj=null
	 	total=null
	 }
	 else{
    obj=response.data
  
   
    var total=[]

    var title=['门店ID','门店名称','充值金额','操作']
    var all=0
   		 for(var k=0; k<obj.length ;k++){
	    	all+=Number(obj[k]['SHOP_RECHARGE'])
   		 }
    	
    
	
     }
	$scope.TITLE=title
    $scope.OLDLIST=obj
   
    $scope.all=all.toFixed(2)
 
     }) 
}
 
    }); 
//获取昨天
function CurentTime(addtime)   //当前时间
    {   
        var now = new Date();    
        var year = now.getFullYear();       //年   
        var month = now.getMonth() + 1;     //月   
        var day = now.getDate();            //日

        var hh = now.getHours(); //时
        var mm = (now.getMinutes() + addtime) % 60;  //分
        if ((now.getMinutes() + addtime) / 60 > 1) {
            hh += Math.floor((now.getMinutes() + addtime) / 60);
        }
         
        var clock = year + "-";   
         
        if(month < 10)   
            clock += "0";   
         
        clock += month + "-";   
         
        if(day < 10)   
            clock += "0";   
             
        clock += day + " ";   
         
        if(hh < 10)   
            clock += "0";   
             
        clock += hh + ":";   
        if (mm < 10) clock += '0';   
        clock += mm;   
        return(clock);
    }

    function CurentToTime(addtime)   //当前时间
    {   
        var now = new Date();    
        var year = now.getFullYear();       //年   
        var month = now.getMonth() + 1;     //月   
        var day = now.getDate();            //日

        var hh = 0 //时
        var mm = 0
         
        var clock = year + "-";   
         
        if(month < 10)   
            clock += "0";   
         
        clock += month + "-";   
         
        if(day < 10)   
            clock += "0";   
             
        clock += day + " ";   
         
        if(hh < 10)   
            clock += "0";   
             
        clock += hh + ":";   
        if (mm < 10) clock += '0';   
        clock += mm;   
        return(clock);
    } 
    
    
    
function dataStatus($scope) {
  $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy-mm-dd hh:ii',
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
        format: 'yyyy-mm-dd hh:ii',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });
 $(document).ready(function () {
      $('#birthday').daterangepicker({singleDatePicker: true}, function (start, end, label) {
          console.log(start.toISOString(), end.toISOString(), label);
      });
  });

  $(document).ready(function () {
      $('#birthdayDate').daterangepicker({singleDatePicker: true}, function (start, end, label) {
          console.log(start.toISOString(), end.toISOString(), label);
      });
  }); 
}
