angular.module('AndSell.H5.Main').controller('pages_personal_card_Controller', function ($scope, $state, modalFactory, personalFactory,weUI) {

    modalFactory.setTitle('我的会员卡');
    modalFactory.setBottom(true);
    $scope.codeShow=false;
	
    $scope.loadMemberCard = function () {
        weUI.toast.showLoading('正在加载');
        personalFactory.getMemberCardByUserId({}, function (response) {
            $scope.cardList = response.data;
            weUI.toast.hideLoading();
        }, function (response) {
            weUI.toast.hideLoading();
            weUI.toast.error(response.msg);
        });
    };
    $scope.loadMemberCard();
   
     var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 200,
	height : 200,

	});
     $scope.showCode=function(code){
    	 console.log(code)
    	 qrcode.makeCode(code)
    	  $scope.codeShow=true;
     };
     $scope.codeHide=function(){
    	
    	   $scope.codeShow=false;
    	
     }
     $('.codeHides').click(function(){
    	
    	  $scope.$apply(function(){  $scope.codeShow=false;})

     })
     
   


});
