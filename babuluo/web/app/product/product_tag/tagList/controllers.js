AndSellMainModule.controller('tagListController', function ($scope, $stateParams, tagFactory, modalFactory) {

  modalFactory.setTitle('商品标签管理');

  $scope.initLoad = function () {
    tagFactory.getPrdTagList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productTagList = repsonce.data;
    }, null);
  };
  $scope.initLoad();

  $scope.addProductTag = function () {
    console.log($scope.add);
    $scope.add['SHOP_TAG.SERVICE_ID'] = 1;
    tagFactory.addPrdTag($scope.add).get({}, function (response) {
      $("#addTag").modal('hide');
      if ( response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.initLoad();
        $scope.add['SHOP_TAG.TAG'] = "";
      }

    });
  };

  $scope.modifyTagNameClick = function (item) {

    $scope.modify = clone(item);
    console.log('in');
  };

  $scope.modifyProductTag = function () {
    $scope.modify['SHOP_TAG.SERVICE_ID'] = 1;
    tagFactory.modifyPrdTag().get($scope.modify, function (response) {
      if ( response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#modifyTag").modal('hide');
        modalFactory.showShortAlert("修改成功");
        $scope.initLoad();
      }
    });
  };

  $scope.delProductTag = function (id) {

    modalFactory.showAlert("确认删除吗?", function () {
      tagFactory.delPrdTag(id).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.initLoad();
        }
      });
    });

  }

});
