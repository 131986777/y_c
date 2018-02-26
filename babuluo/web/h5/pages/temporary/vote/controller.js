angular.module('AndSell.H5.Main').controller('pages_temporary_vote_Controller',function($scope,$state,modalFactory) {
//
//	 modalFactory.setBottom(false);
//	 $scope.navShow=false
	 modalFactory.setTitle("舌尖上的云厨");

	 $scope.ajaxPost=function (url, data, fnSucceed, fnFail, fnLoading) {
				$.ajax({
					url: url,
					datatype: 'json',
					type: 'get',
					async: false,
					data: data,
					success: function(result) {
						fnSucceed(result);
					}
				});

			}
	 $scope.luck=function(){
	 	function getCookie(name) {
				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
				return(arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
			}
	 	
	 	
			if($('.shop').find('.checks').length==0){
				alert('请选择一个喜欢的菜品')
				return
			}
			var obj
			obj={}
			obj['VOTE_PRODUCT.user_id']=getCookie('ANDSELLID');
			obj['VOTE_PRODUCT.DISH_NAME']=shops
			obj['VOTE_PRODUCT.PRODUCT_ID']='1'
			console.log('222')   
			
			$scope.ajaxPost('http://app.bblycyz.com/AndSell/bubu/vote/product/add',obj,function(res){
				console.log(res.code)
				if(res.code==0){
					alert('提交成功')
					$state.go('pages/temporary/luck');  
				}
				else{
					alert('你已经参与过此次活动')
				}
			})
	
	 }
});