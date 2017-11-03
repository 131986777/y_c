angular.module('AndSell.H5.Main').controller('pages_account_integral_Controller', function ($scope, $state, $stateParams, modalFactory, eventFactory,weUI) {

	   modalFactory.setTitle("积分兑换");
	    modalFactory.setBottom(false);
	    console.log('1')
		$scope.duihuan=function(A){
			  $state.go('pages/account/details', {
                    'SHOP_ID': A
                });
   
		}
		eventFactory.getjifen({}, function (response) {
		  	$scope.jifen=response.data[0]['MEMBER_ACCOUNT.POINT']
		  })
		  eventFactory.getCoupon({}, function (response) {
		  $scope.data=response.data
		  })
		
	  
});




