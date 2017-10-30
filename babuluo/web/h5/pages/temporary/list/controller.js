angular.module('AndSell.H5.Main').controller('pages_temporary_list_Controller', function($scope, $state, $stateParams, modalFactory, eventFactory, weUI) {

	modalFactory.setTitle("兑换记录");
	modalFactory.setBottom(false);

	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
	var id=getCookie('ANDSELLID')
	eventFactory.getList({'OFFLINE_COUPON.USER_ID':id}, function(response) {
		
		console.log($scope.data=response.data)
	})
	
	$scope.details=function(A){
			  $state.go('pages/account/detailReady', {
                    'SHOP_ID': A
                });
   
		}

});