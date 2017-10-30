angular.module('AndSell.H5.Main').controller('pages_temporary_bonus_Controller', function ($scope, $state, $stateParams, eventFactory,weUI) {

	eventFactory.getjifen({}, function (response) {
	  	$scope.jifen=response.data[0]['MEMBER_ACCOUNT.POINT']
	  })
});




