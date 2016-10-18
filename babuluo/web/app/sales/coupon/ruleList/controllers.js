
AndSellMainModule.controller('ruleListController', function ($scope, $stateParams, couponFactory, modalFactory) {

  modalFactory.setTitle('优惠券规则列表');

  $scope.bindData = function (response) {
    console.log(123456);
    console.log(response);
      $scope.couponList={};
    $scope.couponList = response.data;

  };
  $scope.detailClick=function (item) {
    $scope.detail=item;
  }

    $scope.addRule = function () {
        console.log($scope.add);
        couponFactory.addCouponRule($scope.add).get({}, function (response) {

      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);

      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.add='';
          $("#addRule").modal('hide');

      }
    });
  };

  /*$scope.modifyStoreClick = function (item) {

    $scope.modify=clone(item);
    $scope.modifyId=item['STORE.ID'];
    //console.log('删除ID为'+modifyId);

  };

  $scope.modifyStore = function () {
    $scope.modify['STORE.ID'] =  $scope.modifyId;

    if ($scope.modifyIsDef){
      $scope.modify['STORE.IS_DEF']=1;
    }else{
      $scope.modify['STORE.IS_DEF']=-1;
    }

    storeFactory.modifyStore ($scope.modify).get({}, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#modifyStore").modal('hide');
        modalFactory.showShortAlert("修改成功");
        $scope.initLoad();
      }
    });
  };

  $scope.deleteStore = function (id) {

    modalFactory.showAlert("确认删除吗?", function () {
      storeFactory.delStoreById(id).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");

          $scope.initLoad();
        }
      });
    });

  }*/

});
