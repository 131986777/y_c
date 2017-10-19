angular.module('AndSell.Main').controller('point_coupon_couponlist_Controller', function ($scope, $stateParams, pointFactory, modalFactory) {

    modalFactory.setTitle('积分优惠券管理');

    $scope.TITLE = ['优惠券','简介','面值','总数','剩余','积分值','截止时间','有效期','状态','操作'];
    
    $scope.initLoad = function () {
    	pointFactory.getPointCouponList({}, function (repsonce) {
            console.log(repsonce.data);
            $scope.PointCouponList = repsonce.data;
        }, null);
    };
    $scope.initLoad();
    
    $('.finishDate').datetimepicker({
    	language:  'zh-CN',
    	//minView: "month",
    	format: 'yyyy-mm-dd hh:ii:ss',
    	autoclose: true,
    	todayBtn:'linked'
    });
    $('.startDate').datetimepicker({
    	language:  'zh-CN',
        minView: "month",
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn:'linked',
        pickerPosition:'top-left'
    });
    $('.endDate').datetimepicker({
    	language:  'zh-CN',
        minView: "month",
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn:'linked',
        pickerPosition:'top-left'
    });
    
    $scope.addCouponClick = function () {
        console.log($scope.add);
        if(isNull($scope.add['POINT_COUPON.COUPON_NAME'])){
        	modalFactory.showShortAlert('优惠券名不能为空!');
        	return false;
        }
        if(isNull($scope.add['POINT_COUPON.VALUE'])){
        	modalFactory.showShortAlert('面值不能为空!');
        	return false;
        }
        if(isNull($scope.add['POINT_COUPON.NUM_LIMIT'])){
        	modalFactory.showShortAlert('总量不能为空!');
        	return false;
        }
        if(isNull($scope.add['POINT_COUPON.POINT_NEED'])){
        	modalFactory.showShortAlert('积分不能为空!');
        	return false;
        }
        if(isNull($scope.add['POINT_COUPON.FINISH_DATETIME'])){
        	modalFactory.showShortAlert('截止时间不能为空!');
        	return false;
        }
        if(isNull($scope.add['POINT_COUPON.BEGIN_DATETIME']) || isNull($scope.add['POINT_COUPON.END_DATETIME'])){
        	modalFactory.showShortAlert('有效期时间不能为空!');
        	return false;
        }
        $scope.add['POINT_COUPON.NUM'] =$scope.add['POINT_COUPON.NUM_LIMIT'];
        pointFactory.addCoupon($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = '';
            $("#addCoupon").modal('hide');
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyCouponClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyCoupon = function () {
    	if(isNull($scope.modify['POINT_COUPON.NAME'])){
        	modalFactory.showShortAlert('优惠券名不能为空');
        	return false;
        }
        if(isNull($scope.modify['POINT_COUPON.VALUE'])){
        	modalFactory.showShortAlert('面值不能为空');
        	return false;
        }
        if(isNull($scope.modify['POINT_COUPON.NUM_LIMIT'])){
        	modalFactory.showShortAlert('总量不能为空');
        	return false;
        }
        if(isNull($scope.modify['POINT_COUPON.POINT_NEED'])){
        	modalFactory.showShortAlert('积分不能为空');
        	return false;
        }
        if(isNull($scope.modify['POINT_COUPON.FINISH_DATETIME'])){
        	modalFactory.showShortAlert('截止时间不能为空');
        	return false;
        }
        if(isNull($scope.modify['POINT_COUPON.BEGIN_DATETIME']) || isNull($scope.modify['POINT_COUPON.END_DATETIME'])){
        	modalFactory.showShortAlert('有效期时间不能为空');
        	return false;
        }
    	pointFactory.modifyById($scope.modify, function (response) {
            $("#modifyCoupon").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };
    
    $scope.modifyState = function(id,state){
    	if(state == 0){
    		state=-1;
    	}else{
    		state = 0;
    	}
    	pointFactory.modifyById({'POINT_COUPON.ID': id,'POINT_COUPON.STATE':state}, function (response) {
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.deleteCouponClick = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
        	pointFactory.modifyById({'POINT_COUPON.ID': id,'POINT_COUPON.IS_DEL':1}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });

    }

});
