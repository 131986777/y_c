AndSellMainModule.controller('classListController', function ($scope, $stateParams, classFactory, modalFactory) {

  modalFactory.setTitle('商品分类管理');

  $scope.initLoad = function () {
    classFactory.getPrdClassList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productClassList = repsonce.data;
    }, null);
  }
  $scope.initLoad();

  $scope.addProductClass = function () {
    console.log($scope.add);
    $scope.add['shop_product_class.SERVICE_ID'] = 1;
    classFactory.addPrdClass($scope.add).get({}, function (response) {
      $("#addClass").modal('hide');
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.initLoad();
        $scope.add.key = 0;
        $scope.add['shop_product_class.PARENT_CLASS_ID'] = 'BASIC';
        $scope.add['shop_product_class.CLASS_NAME'] = "";
      }

    });
  };

  $scope.modifyClssNameClick = function (item) {
    $scope.modify = clone(item);
  }

  $scope.modifyProductClass = function () {
    $scope.modify['shop_product_class.SERVICE_ID'] = 1;
    classFactory.modifyPrdClass().get($scope.modify, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#modifyClass").modal('hide');
        modalFactory.showShortAlert("修改成功");
        $scope.initLoad();
      }
    });
  }

  $scope.delProductClass = function (id) {

    modalFactory.showAlert("确认删除吗?", function () {
      classFactory.delPrdClass(id).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.initLoad();
        }
      });
    });

  }

})
