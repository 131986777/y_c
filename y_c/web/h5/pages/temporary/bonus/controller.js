




angular.module('AndSell.H5.Main').controller('pages_temporary_bonus_Controller', function ($scope, $state, $stateParams,modalFactory, eventFactory,weUI) {
	  modalFactory.setTitle('积分兑换优惠卷');
	  modalFactory.setBottom(true);
	  eventFactory.getjifen({}, function (response) {
	  	$scope.jifen=response.data[0]['MEMBER_ACCOUNT.POINT']
	  })
	  $scope.exchange=function(id){
		function getCookie(name)
		{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
		}
	  weUI.dialog.confirm("提示", "是否确认兑换", function () {
		  eventFactory.exchanges({'MEMBER_COUPON.USER_ID':getCookie('ANDSELLID'),'MEMBER_COUPON.COUPON_ID':id}, function (response) {
              weUI.dialog.alert('兑换成功');
              eventFactory.getjifen({}, function (response) {
          	  	$scope.jifen=response.data[0]['MEMBER_ACCOUNT.POINT']
          	  });
            },function(response){
            	 weUI.dialog.alert(response.msg);
            });
        });
	}

});




