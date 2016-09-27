AndSellMainModule.controller('unitListController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('商品分类管理');

  $scope.initLoad = function () {
    unitFactory.getPrdUnitList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productUnitList = repsonce.data;
    }, null);
  }
  $scope.initLoad();

  $scope.addProductUnit = function () {
    console.log($scope.add);
    $scope.add['shop_unit.SERVICE_ID'] = 1;
    unitFactory.addPrdUnit($scope.add).get({}, function (response) {
      $("#addUnit").modal('hide');
      console.log(response);
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.initLoad();
        $scope.add['shop_unit.UNIT_NAME'] = "";
      }

    });
  };

  $scope.modifyUnitNameClick = function (item) {
    $scope.modify = clone(item);
  }

  $scope.modifyProductUnit = function () {
    $scope.modify['shop_unit.SERVICE_ID'] = 1;
    unitFactory.modifyPrdUnit().get($scope.modify, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.state == 'true') {
        $("#modifyUnit").modal('hide');
        modalFactory.showShortAlert("修改成功");
        $scope.initLoad();
      }
    });
  }

  $scope.delProductUnit = function (id) {
    console.log(id);
    modalFactory.showAlert("确认删除吗?", function () {
      unitFactory.delPrdUnit(id).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.initLoad();
        }
      });
    });

  }

})
