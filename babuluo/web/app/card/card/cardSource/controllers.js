AndSellMainModule.controller('cardSourceController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('会员卡发布渠道');

  $scope.initLoad = function () {
    unitFactory.getCardSourceList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.cardSourceList = repsonce.data;
    }, null);
  };

  $scope.initLoad();


  $scope.addCardSource = function () {
    console.log($scope.add);

    unitFactory.addCardSource($scope.add).get({}, function (response) {

      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.add='';
        $("#addSource").modal('hide');
        $scope.initLoad();

      }

    });
  };

  $scope.modifyCardSourceClick = function (item) {

    $scope.modify=clone(item);
    $scope.modifyId=item['MEMBER_CARD_SOURCE.ID'];
    //console.log('删除ID为'+modifyId);

  };

  $scope.modifyCardSource = function () {
    $scope.modify['MEMBER_CARD_SOURCE.ID'] =  $scope.modifyId;

    unitFactory.modifyCardSourceById ().get($scope.modify, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#modifySource").modal('hide');
        modalFactory.showShortAlert("修改成功");
        $scope.initLoad();
      }
    });
  };

  $scope.deleteCardSource = function (id) {

    modalFactory.showAlert("确认删除吗?", function () {
      unitFactory.delCardSource(id).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");

          $scope.initLoad();
        }
      });
    });

  }

});
