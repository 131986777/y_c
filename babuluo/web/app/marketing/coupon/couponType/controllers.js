
AndSellMainModule.controller('couponTypeController', function ($scope, $stateParams, couponFactory, modalFactory) {

  modalFactory.setTitle('促销管理');

  $scope.bindData = function (response) {
   // console.log(123456);
    //console.log(response);
      $scope.couponList={};
    $scope.couponList = response.data;

  };
  $scope.detailClick=function (item) {
    $scope.detail=item;
  }

    $scope.addRule = function () {
       // console.log($scope.add);
        couponFactory.addCouponRule($scope.add).get({}, function (response) {

      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);

      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.add={};
        $scope.add['COUPON_RULE.TYPE']='1';
          $("#addRule").modal('hide');
          $scope.$broadcast('pageBar.reload');
      }
    });
  };
  $scope.modifyClick = function (item) {

    $scope.mod=clone(item);
    $scope.mod['COUPON_RULE.ID']=item['COUPON_RULE.ID'];
    if (item['COUPON_RULE.TYPE']==1){
      $scope.mod['COUPON_RULE.FACE_VALUE']=(item['COUPON_RULE.FACE_VALUE']/100).toFixed(2);
    }else{
      $scope.mod['COUPON_RULE.FACE_VALUE']=(item['COUPON_RULE.FACE_VALUE']/10).toFixed(1);
    }


    $scope.mod['COUPON_RULE.CONDITION_PRICE']=(item['COUPON_RULE.CONDITION_PRICE']/100).toFixed(2);
    $scope.mod['COUPON_RULE.MAX_PRICE_LIMIT']=(item['COUPON_RULE.MAX_PRICE_LIMIT']/100).toFixed(2);

  };

  $scope.modRule = function () {
    couponFactory.modifyCoupon($scope.mod).get({}, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#couponMod").modal('hide');
        modalFactory.showShortAlert("修改成功");
          $scope.$broadcast('pageBar.reload');
      }
    });
  };

  $scope.stopCoupon = function (item) {

      if(item['COUPON_RULE.STATE']==1){
          modalFactory.showAlert("确认停用吗?", function () {
              item['COUPON_RULE.STATE']=-1;
              couponFactory.stopSouponById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("停用成功");
                  $scope.$broadcast('pageBar.reload');
              }
          });
      });
      } else{
          item['COUPON_RULE.STATE']=1;
          couponFactory.stopSouponById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("启用成功");
                  $scope.$broadcast('pageBar.reload');
              }
          });
      }


  } ; //delCoupon
  $scope.delCoupon = function (item) {

    modalFactory.showAlert("确认删除吗?", function () {
      couponFactory.delSouponById(item).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.$broadcast('pageBar.reload');
        }
      });
    });

  }

});
