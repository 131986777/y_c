
AndSellMainModule.controller('bannerController', function ($scope, $stateParams, bannerFactory, modalFactory) {

  modalFactory.setTitle('横幅列表');

  $scope.bindData = function (response) {
   // console.log(123456);
      console.log(response);
      $scope.bannerList={};
      $scope.bannerList = response.data;
      $scope.positionList= response.extraData.positionList;
      $scope.positionMap = response.extraData.positionMap;
      console.log(response.extraData.positionMap);
      console.log($scope.positionList);

  };
  /*$scope.detailClick=function (item) {
    $scope.detail=item;
  }
*/
    $scope.addBannerInfo = function () {
        // console.log($scope.add);
        bannerFactory.addBanner($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);

            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add = {};
                $("#addBanner").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        });
    };
  $scope.modifyClick = function (item) {

    $scope.mod=clone(item);

  };

  $scope.modBannerInfo = function () {
    bannerFactory.modifyBanner($scope.mod).get({}, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#modBanner").modal('hide');
        modalFactory.showShortAlert("修改成功");
          $scope.$broadcast('pageBar.reload');
      }
    });
  };

    $scope.stopBanner= function (item) {

        if (item['BANNER.STATE'] == 1) {
            modalFactory.showAlert("确认停用吗?", function () {
                item['BANNER.STATE'] = -1;
                bannerFactory.stopBannerById (item).get({}, function (res) {
                    if (res.extraData.state = 'true') {
                        modalFactory.showShortAlert("停用成功");
                        $scope.$broadcast('pageBar.reload');
                    }
                });
            });
        } else {
            item['BANNER.STATE'] = 1;
            bannerFactory.stopBannerById (item).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("启用成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        }


    };
  $scope.delBanner = function (item) {

    modalFactory.showAlert("确认删除吗?", function () {
      bannerFactory.delBannerById(item).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.$broadcast('pageBar.reload');
        }
      });
    });

  }

});

