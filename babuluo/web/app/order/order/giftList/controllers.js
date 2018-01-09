angular.module('AndSell.Main').controller('order_order_giftList_Controller', function ($scope,modalFactory,orderFactory) {
	//设置页面Title
    modalFactory.setTitle('充值赠品兑换');

    modalFactory.setBottom(false);
    
    $scope.TITLE = ['赠品名称','姓名','电话','充值时间','领取时间','兑换状态','门店','操作'];
    
    $('#startDate').datetimepicker({
    	language:  'zh-CN',
        //minView: "month",
        format: 'yyyy-mm-dd hh:ii:ss',
        autoclose: true,
        todayBtn:'linked'
    }).on('changeDate',function(){
    	
    });
    
    $('#endDate').datetimepicker({
    	language:  'zh-CN',
        //minView: "month",
        format: 'yyyy-mm-dd hh:ii:ss',
        autoclose: true,
        todayBtn:'linked'
    });
   
    
    $scope.coupon = {};

    $scope.bindData = function (response) {
        $scope.giftList = response.data;
        $scope.querySize = response.extraData.page.querySize;
        console.log(response);
    };

    $scope.search = function () {
        $scope.filter['GIFT_ACTITY.REC_CHECKCODE'] = $scope.queryContent;
    };
    //预约商品提货玛验证
    $scope.veritycode=function(){
    	var checkcode=$scope.gift['GIFT_ACTITY.REC_CHECKCODE1'];
    	var code= REC_CHECKCODE;
    	var  ff=GIFT_ACTITY_GIFT;
    	if(code==checkcode){
    		$scope.changeState(GIFT_ACTITY_ID,GIFT_ACTITY_GIFT);//确认提货
    	}else{
    		 modalFactory.showShortAlert("兑换码不正确，请重新输入兑换码！");
           //  return;
    	}
    }
	   var  REC_CHECKCODE='';
	   var GIFT_ACTITY_ID=null;
	   var GIFT_ACTITY_GIFT=null;
   $scope.saveCheckCode=function(gift_id,gift_name,code){

    REC_CHECKCODE =code;
    GIFT_ACTITY_ID=gift_id;
    GIFT_ACTITY_GIFT=gift_name;
   }
   $scope.changeState = function(id,name){
	   modalFactory.showAlert(name+",确认兑换吗?", function () {
		   var date = new Date();
		   var year = date.getFullYear();
		   var month = date.getMonth()+1;
		   var day = date.getDate();
		   var hour = date.getHours();
		   var minute = date.getMinutes();
		   var second = date.getSeconds();
           var shop = getCookie('SHOP_ID');
           var form = {};
         // form['MEMBER_COUPON.ORDER_NO'] = shop +':'+ year + "-" + month + "-" + day + " " +hour+":"+minute+":"+second;
          form['GIFT_ACTITY.ID'] = id;
          form['GIFT_ACTITY.STATE'] = -1;
          orderFactory.getOffGift(form, function (res) {
		           modalFactory.showShortAlert("兑换成功");
		           location.reload();
		       }, function (response) {
		           modalFactory.showShortAlert(response.msg);
	       });
       });
	  
   }
    
    
    $scope.outPutQuery = function(){
    	var url = "../../outputQuery";
        $scope.outputList = {};
        $scope.outputList['type'] = "orderlist";
        $scope.outputList['param'] = JSON.stringify($scope.filter);
        modalFactory.showShortAlert("正在导出 请稍等");
        http.post(url, $scope.outputList, function (response) {
            if(response != "failure"){
            	 location.href = "/ticket" + response;
            }
        },function(response){
        	modalFactory.showShortAlert("导出失败!");
        });
    }

});


