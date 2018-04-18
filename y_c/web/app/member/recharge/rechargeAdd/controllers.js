angular.module('AndSell.Main').controller('member_recharge_rechargeAdd_Controller', function ($scope, $interval,$stateParams, modalFactory,memberRechargeFactory) {

	modalFactory.setTitle('储值卡绑定激活');

    $scope.initLoad = function () {
        
    };
    $scope.initLoad();
    
    $scope.value = {};
    
	$scope.verification=function(){
		$('.bths').attr('disabled','true')
		$('.bths').html('30'+"s")
		time();
		function time(){
		var t=30
		$scope.timer=$interval(function(){
				if(t!=1){
					 t --;
					$('.bths').html(t+"s")
				}
				else{
					$interval.cancel($scope.timer)
					$('.bths').removeAttr("disabled");
					$('.bths').html("获取验证码")
				}
				
			},1000)
			
		}
	}
	
	$scope.sendSms = function(){
		if($scope.value['PHONE'] == '' || $scope.value['PHONE']==undefined || !isPhone($scope.value['PHONE'])){
			modalFactory.showShortAlert("请填写正确的手机号");
			return false;
		}
		var form = {};
		form['PHONE'] = $scope.value['PHONE'];
		memberRechargeFactory.phoneSms(form,function(){
			$scope.verification();
		});
	}
	
	var isPhone = function (phone) {
	    var myReg = /^1\d{10}$/;
	    if (myReg.test(phone)) return true;
	    return false;
	}
	
	var IsIdCard = function (idCard) {
	    var myReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	    if (myReg.test(idCard)) return true;
	    return false;
	}
	
	var IsCard = function (card){
		var myReg = /^\d{8}$/;
	    if (myReg.test(card)) return true;
	    return false;
	}
	
	var IsRechargeCard = function (card){
		var myReg = /^\d{10}$/;
	    if (myReg.test(card)) return true;
	    return false;
	}
	
	var rechargeRule = {"10000":2000,"5000":800,"3000":400,"1000":100}
	
	var cardRule = {"2000":95,"800":94,"400":93,"100":92}
	
	$scope.commitForm = function(){
		
		if($scope.value['CARD_RECGARGE'] == '' || $scope.value['CARD_RECGARGE'] == undefined || !IsCard($scope.value['CARD_RECGARGE'])){
			modalFactory.showShortAlert("请填写正确的黄卡卡号");
			return false;
		}
		if($scope.value['TOTAL_RECHARGE'] == '' || $scope.value['TOTAL_RECHARGE'] == undefined){
			modalFactory.showShortAlert("请填写充值总额");
			return false;
		}
		if($scope.value['TOTAL'] == '' || $scope.value['TOTAL'] == undefined){
			modalFactory.showShortAlert("请填写赠送总额");
			return false;
		}
		if(rechargeRule[$scope.value['TOTAL_RECHARGE']] != $scope.value['TOTAL']){
			modalFactory.showShortAlert("充值与赠送金额不匹配!");
			return false;
		}
		
		
		var cardsArray = new Array();
		
		var cards = $('.storecard');
		for(var i=0;i<cards.length;i++){
			var flag = i+1;
			var card = cards.eq(i).val();
			if(card == '' || card == undefined || !IsRechargeCard(card)){
				modalFactory.showShortAlert("第"+flag+"个填写正确的储值卡卡号");
				return false;
			}
			if(cardRule[$scope.value['TOTAL']] != card.substring(0,2)){
				modalFactory.showShortAlert("第"+flag+"个储值卡号段不匹配");
				return false;
			}
			var cardInfo = {};
			cardInfo['CARD_NO'] = card;
			cardsArray.push(cardInfo);
		}
		if($scope.value['PHONE'] == '' || $scope.value['PHONE'] == undefined){
			modalFactory.showShortAlert("请填写手机号");
			return false;
		}
		/*if($scope.value['CODE'] == '' || $scope.value['CODE'] == undefined){
			modalFactory.showShortAlert("请填写验证码");
			return false;
		}*/
		
		if($scope.value['ID_NUMBER'] !='' && $scope.value['ID_NUMBER'] != undefined && !IsIdCard($scope.value['ID_NUMBER'])){
			modalFactory.showShortAlert("请填写合法的身份证号");
			return false;
		}
		
		modalFactory.showAlert("请检查卡号,确认开卡?", function () {
			var form = {};
			form = $scope.value;
			form['CARDLIST'] = angular.toJson(cardsArray);
			memberRechargeFactory.commitCard(form,function(response){
				console.log(response);
				if(response.code == 0){
					modalFactory.showShortAlert("开卡成功");
				}
			},function (response) {
	            modalFactory.showShortAlert(response.msg);
	        });
        });
	 }
	
	$scope.addCard = function (){
		var html ='<div class="form-group" style="margin-bottom: 0px";>'
        +'<span class="icon-required">*&nbsp;<img alt="添加卡号" src="../../pc/public/css/img/jian.png" style="width:30px;height:30px;vertical-align: middle;"  class="jian"></span>'
        +'<label class="control-label col-sm-1 right form-input-title"></label>'
        +'<div class="col-sm-4" id="store">'
        +'<input class="form-control storecard" '
        +' name="number" type="text"'
        +' placeholder="请输入赠送储蓄卡卡号">'
                               
        +'</div>'
        +'</div>'
      
		$('.inputs').append(html);
	}
	$(".inputs").on("click",".jian", function() {
	     $(this).parent().parent().remove();
	 });

   
});