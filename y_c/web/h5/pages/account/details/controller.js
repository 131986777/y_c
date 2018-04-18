angular.module('AndSell.H5.Main').controller('pages_account_details_Controller', function($scope, $state, $stateParams, modalFactory, eventFactory, weUI) {

	modalFactory.setTitle("详情");
	modalFactory.setBottom(false);
	console.log($stateParams.SHOP_ID)

	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

	eventFactory.getCoupond({
			'POINT_COUPON.ID': $stateParams.SHOP_ID
		}, function(response) {
			$scope.data = response.data[0];
			console.log($scope.data)
		})
		//this.getCoupond

	$scope.exchange = function() {

		//		 console.log('22')
		var id = getCookie('ANDSELLID')
		var form = {};
		form['OFFLINE_COUPON.USER_ID'] = id;
		form['OFFLINE_COUPON.COUPON_ID'] = $scope.data['POINT_COUPON.ID'];
		var r = confirm('确定兑换？')

		if(r == true) {
			eventFactory.exchange(form, function(res) {

				console.log(res.msg)
				console.log(res)
				if(res.code == 0) {
					alert('兑换成功')
					setTimeout(function() {
						$state.go('pages/account/integral', {
							'shop': 'ss'
						})
					}, 1000)
				}

			}, function(res) {
				alert(res.msg);
			})
		} else {

		}

	}

});