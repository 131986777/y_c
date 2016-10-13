
AndSellMainModule.controller('storeListController', function ($scope, $stateParams, storeFactory, modalFactory) {

  modalFactory.setTitle('仓库列表');

  $scope.initLoad = function () {
    storeFactory.getStoreList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.storeList = repsonce.data;
    }, null);
  };

  $scope.initLoad();


    $scope.addStore = function () {
     if ($scope.IS_DEF){
       $scope.add['STORE.IS_DEF']=1;
     }else{
       $scope.add['STORE.IS_DEF']=-1;
     }
      $scope.add['STORE.IS_DEF']=1;
      $scope.add['STORE.ADD_DATETIME']=new Date();  //add['STORE.IS_DEF']
    console.log($scope.add);

    storeFactory.addStore($scope.add).get({}, function (response) {

      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.add='';
        $("#addStore").modal('hide');
        $scope.initLoad();
      }
    });
  };

  $scope.modifyStoreClick = function (item) {

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

  }

});