
angular.module('AndSell.Main').controller('marketing_banner_bannerPosition_Controller', function ($scope, $stateParams, bannerFactory, modalFactory) {

  modalFactory.setTitle('横幅位置列表');

  $scope.bindData = function (response) {
   // console.log(123456);
    //console.log(response);
      $scope.bannerPositionList={};
    $scope.bannerPositionList = response.data;

  };
  $scope.detailClick=function (item) {
    $scope.detail=item;
  }

    $scope.addBannerPosition = function () {
        // console.log($scope.add);
        bannerFactory.addBannerPos($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);

            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add = {};
                $("#addPos").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        });
    };
  $scope.modifyClick = function (item) {

    $scope.mod=clone(item);

  };

  $scope.modBannerPosition = function () {
    bannerFactory.modifyBannerPos($scope.mod).get({}, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#bannerPosMod").modal('hide');
        modalFactory.showShortAlert("修改成功");
          $scope.$broadcast('pageBar.reload');
      }
    });
  };

  /*$scope.stopCoupon = function (item) {

      if(item['COUPON_RULE.STATE']==1){
          modalFactory.showAlert("确认停用吗?", function () {
              item['COUPON_RULE.STATE']=-1;
              bannerFactory.stopSouponById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("停用成功");
                  $scope.$broadcast('pageBar.reload');
              }
          });
      });
      } else{
          item['COUPON_RULE.STATE']=1;
          bannerFactory.stopSouponById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("启用成功");
                  $scope.$broadcast('pageBar.reload');
              }
          });
      }


  } ; */
  $scope.delPosition = function (item) {

    modalFactory.showAlert("确认删除吗?", function () {
      bannerFactory.delBannerPosById(item).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.$broadcast('pageBar.reload');
        }
      });
    });

  }

});
