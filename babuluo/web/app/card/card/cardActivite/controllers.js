angular.module('AndSell.Main').controller('card_card_cardActivite_Controller', function ($scope, modalFactory,cardFactory) {

	modalFactory.setTitle('储值卡激活');

    $scope.initLoad = function () {
        
    };
    $scope.initLoad();
    
    $scope.value = {};
    
	
	
	
	var IsCard = function (card){
		var myReg = /^\d{8}$/;
	    if (myReg.test(card)) return true;
	    return false;
	}
	
	
	$scope.commitForm = function(){
		
		if($scope.value['CARD_FROM'] == '' || $scope.value['CARD_FROM'] == undefined || !IsCard($scope.value['CARD_FROM'])){
			modalFactory.showShortAlert("请填写正确的开始卡号");
			return false;
		}
		if($scope.value['CARD_TO'] == '' || $scope.value['CARD_TO'] == undefined || !IsCard($scope.value['CARD_TO'])){
			modalFactory.showShortAlert("请填写正确的结束卡号");
			return false;
		}
		
		
		
		modalFactory.showAlert("请检查卡号,确认激活?", function () {
			var form = {};
			form = $scope.value;
			cardFactory.modifyState(form,function(response){
				if(response.code == 0){
					modalFactory.showShortAlert("激活成功");
				}
			},function (response) {
	            modalFactory.showAlert(response.msg,function(){});
	        });
        });
	 }
	

   
});