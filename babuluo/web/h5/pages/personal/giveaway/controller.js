angular.module('AndSell.H5.Main').controller('pages_personal_giveaway_Controller', function ($scope, $state, personalFactory, weUI, modalFactory) {

    modalFactory.setTitle("我的赠品");
    modalFactory.setBottom(false);
    $scope.getCookie = function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if(arr = document.cookie.match(reg))

			return unescape(arr[2]);
		else
			return null;
	}
    $scope.UIDcookies=  $scope.getCookie('ANDSELLID')
//获得充值赠品
    $scope.initData = function () {
        personalFactory.getGift({'USER_ID':$scope.UIDcookies}, function (response) {
            if (response.code == 0 && response.msg == "ok"){
                $scope.giftList = response.data;
                console.log(response.data);
            }
        });
    }
   
});




