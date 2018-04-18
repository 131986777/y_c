angular.module('AndSell.H5.Main').controller('pages_temporary_years_Controller', function($scope, $state, $stateParams, modalFactory, balanceFactory, eventFactory, weUI) {
	modalFactory.setTitle('积分兑换优惠卷');
	modalFactory.setBottom(true);

	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

	var form = {};
	$scope.cook=getCookie('ANDSELLID')
	form['FINANCE_LIST.USER_ID'] = $scope.cook
	
	balanceFactory.queryAccountByUid(form, function(response) {
		$scope.jifen = response.data[0]['MEMBER_ACCOUNT.POINT']
	})
	$scope.exchange = function(id) {

		weUI.dialog.confirm("提示", "是否确认兑换", function() {
			balanceFactory.exchanges({
				'MEMBER_COUPON.USER_ID': $scope.cook,
				'MEMBER_COUPON.COUPON_ID': id
			}, function(response) {
				weUI.dialog.alert('兑换成功');
				eventFactory.getjifen({}, function(response) {
					$scope.jifen = response.data[0]['MEMBER_ACCOUNT.POINT']
				});
			}, function(response) {
				weUI.dialog.alert(response.msg);
			});
		});
	}

});